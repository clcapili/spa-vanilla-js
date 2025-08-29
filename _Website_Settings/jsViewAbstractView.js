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
        if (!url) return;

        const list = type === "css" ? this.cssHrefs : this.jsSrcs;
        if (list.includes(url)) return type === "css" ? undefined : Promise.resolve();
        list.push(url);

        if (type === "css") {
            // css: preload + switch to stylesheet
            return new Promise((resolve, reject) => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = url;
                link.dataset.spaPage = 'true';
                link.onload = () => { link.rel = 'stylesheet'; resolve(link); };
                link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
                document.head.appendChild(link);
            });
        } else if (type === "js") {
            // js: async load
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.dataset.spaPage = 'true';
                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`Failed to load JS: ${url}`));
                document.body.appendChild(script);
            });
        }
    }

    loadAssets(type, urls = []) {
        return Promise.all(urls.map(url => this._loadAsset(type, url)));
    }

    async loadPageAssets(pageKey) {
        const skinFolder = document.body.dataset.skin;
        if (!skinFolder) throw new Error("No skin folder specified in body[data-skin]");

        const { pageAssets } = await import(`/${skinFolder}/page-assets.js`);
        const assets = pageAssets[pageKey];
        if (!assets) return;

        if (assets.css?.length) await this.loadAssets("css", assets.css);
        if (assets.js?.length) await this.loadAssets("js", assets.js);
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

    // includes + lazy-load preprocessing
    _preprocessLazyLoad(wrapper) {
        wrapper.querySelectorAll("img, video").forEach(el => {
            if (!el.dataset.src) {
                el.dataset.src = el.getAttribute("src") || "";
                el.removeAttribute("src");
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

    async onMount() {
        
    }

    _destroyAssets(type, list) {
        for (const url of list) {
            const selector = type === "css"
                ? `link[href="${url}"][data-spa-page="true"]`
                : `script[src="${url}"][data-spa-page="true"]`;

            document.querySelectorAll(selector).forEach(el => el.remove());
        }
        list.length = 0;
    }

    async destroy() {
        this._destroyAssets("css", this.cssHrefs);
        this._destroyAssets("js", this.jsSrcs);
    }
}

export default AbstractView;