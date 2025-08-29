class AbstractView {
    constructor(params = {}) {
        this.params = params;
        this.cssHrefs = []; // page-specific CSS
        this.jsSrcs = [];   // page-specific JS
        this.skinConfig = null;
    }

    // meta
    setTitle(title) {
        document.title = title;
        this.setMeta("title", title);
    }

    setMeta(name, content) {
        let tag = document.querySelector(`meta[name='${name}']`);
        if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute("name", name);
            document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
    }

    // asset loading
    async _loadAsset(type, url) {
        const list = type === "css" ? this.cssHrefs : this.jsSrcs;
        if (!url || list.includes(url)) return type === "css" ? undefined : Promise.resolve();
        list.push(url);

        return new Promise((resolve, reject) => {
            let el;
            if (type === "css") {
                el = document.createElement("link");
                el.rel = "stylesheet";
                el.href = url;
                el.dataset.spaPage = "true";
                document.head.appendChild(el);
                resolve(el); // CSS loads instantly
            } else {
                el = document.createElement("script");
                el.src = url;
                el.async = true;
                el.dataset.spaPage = "true";
                el.onload = () => resolve(el);
                el.onerror = () => reject(new Error(`Failed to load JS: ${url}`));
                document.body.appendChild(el);
            }
        });
    }

    loadAssets(type, urls = []) {
        return Promise.all(urls.map(url => this._loadAsset(type, url)));
    }

    // inside AbstractView
    async loadPageAssets(pageKey) {
        const skinFolder = document.body.dataset.skin;
        const { pageAssets } = await import(`/${skinFolder}/page-assets.js`);
        const assets = pageAssets[pageKey];
        if (!assets) return;

        // css
        if (assets.css?.length) {
            for (const href of assets.css) {
                if (!this.cssHrefs.includes(href)) {
                    this.cssHrefs.push(href);

                    // preload for Lighthouse performance
                    const preloadLink = document.createElement('link');
                    preloadLink.rel = 'preload';
                    preloadLink.as = 'style';
                    preloadLink.href = href;
                    document.head.appendChild(preloadLink);

                    // load CSS normally
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    link.dataset.spaPage = 'true';
                    document.head.appendChild(link);
                }
            }
        }

        // js
        if (assets.js?.length) {
            for (const src of assets.js) {
                if (!this.jsSrcs.includes(src)) {
                    this.jsSrcs.push(src);

                    // preload JS for faster execution
                    const preloadScript = document.createElement('link');
                    preloadScript.rel = 'preload';
                    preloadScript.as = 'script';
                    preloadScript.href = src;
                    document.head.appendChild(preloadScript);

                    // load script asynchronously
                    await new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = src;
                        script.async = true;
                        script.dataset.spaPage = 'true';
                        script.onload = () => resolve(script);
                        script.onerror = () => reject(new Error(`Failed to load JS: ${src}`));
                        document.body.appendChild(script);
                    });
                }
            }
        }
    }


    // skin config
    async getSkinConfig() {
        if (!this.skinConfig) {
            const skinFolder = document.body.dataset.skin;
            if (!skinFolder) throw new Error("No skin folder specified in body[data-skin]");
            const configModule = await import(`/${skinFolder}/content.js`);
            this.skinConfig = configModule.default;
        }
        return this.skinConfig;
    }

    // includes + lazy load preprocessing
    _preprocessLazyLoad(wrapper) {
        wrapper.querySelectorAll("img, video").forEach(el => {
            const srcAttr = "src";
            if (!el.dataset.src) {
                el.dataset.src = el.getAttribute(srcAttr) || "";
                el.removeAttribute(srcAttr);
                el.classList.add("lazy");
            }

            if (el.tagName === "VIDEO" && el.poster) {
                el.dataset.poster = el.poster;
                el.removeAttribute("poster");
            }
        });
    }

    async fetchAllIncludes(html) {
        const skin = await this.getSkinConfig();
        const includes = skin.includes || {};
        const includeRegex = /<!-- INCLUDE:([\w-]+) -->/g;
        let match;

        while ((match = includeRegex.exec(html)) !== null) {
            const includeName = match[1];
            const filePath = `/z_spa_modules/_includes/${includeName}.html`;
            let includeHtml = '';

            try {
                const response = await fetch(filePath);
                includeHtml = await response.text();

                // placeholder replacement
                const includeData = includes[includeName];
                if (includeData) {
                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = includeHtml;

                    Object.entries(includeData).forEach(([key, value]) => {
                        const el = wrapper.querySelector(`[data-placeholder="${key}"]`);
                        if (el) el.innerHTML = value;
                    });

                    includeHtml = wrapper.innerHTML;
                }

                // lazy-load preprocessing
                const wrapperTemp = document.createElement('div');
                wrapperTemp.innerHTML = includeHtml;
                this._preprocessLazyLoad(wrapperTemp);
                includeHtml = wrapperTemp.innerHTML;

            } catch (e) {
                console.warn(`Include file not found: ${filePath}`, e);
            }

            html = html.replace(match[0], includeHtml);
        }

        return html;
    }

    // view lifecycle
    async getHtml() {
        return '';
    }

    async onMount() {}

    _destroyAssets(type, list) {
        for (const url of list) {
            const selector = type === "css"
                ? `link[href="${url}"][data-spa-page="true"]`
                : `script[src="${url}"][data-spa-page="true"]`;
            const el = document.querySelector(selector);
            if (el) el.remove();
        }
        list.length = 0;
    }

    async destroy() {
        this._destroyAssets("css", this.cssHrefs);
        this._destroyAssets("js", this.jsSrcs);
    }
}

export default AbstractView;