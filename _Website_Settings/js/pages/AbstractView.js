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

    // css loading
    loadCSS(href) {
        if (!href || this.cssHrefs.includes(href)) return;
        this.cssHrefs.push(href);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.dataset.spaPage = "true";
        document.head.appendChild(link);
    }

    loadMultipleCSS(cssArray = []) {
        for (const href of cssArray) this.loadCSS(href);
    }

    // js loading
    loadJS(src) {
        if (!src || this.jsSrcs.includes(src)) return Promise.resolve();
        this.jsSrcs.push(src);

        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.dataset.spaPage = "true";
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Failed to load JS: ${src}`));
            document.body.appendChild(script);
        });
    }

    async loadMultipleJS(jsArray = []) {
        for (const src of jsArray) {
            await this.loadJS(src);
        }
    }

    // page assets
    async loadPageAssetsCSS(pageKey) {
        const skinFolder = document.body.dataset.skin;
        const { pageAssets } = await import(`/${skinFolder}/page-assets.js`);
        const assets = pageAssets[pageKey];
        if (assets?.css?.length) {
            this.loadMultipleCSS(assets.css);
        }
    }

    async loadPageAssetsJS(pageKey) {
        const skinFolder = document.body.dataset.skin;
        const { pageAssets } = await import(`/${skinFolder}/page-assets.js`);
        const assets = pageAssets[pageKey];
        if (assets?.js?.length) {
            await this.loadMultipleJS(assets.js);
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

    // includes with automatic lazy-loading preprocessing
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

                // --- Lazy-load preprocessing ---
                const wrapperTemp = document.createElement('div');
                wrapperTemp.innerHTML = includeHtml;

                // Images
                wrapperTemp.querySelectorAll('img').forEach(img => {
                    if (!img.dataset.src) {
                        img.dataset.src = img.getAttribute('src') || '';
                        img.removeAttribute('src');
                        img.classList.add('lazy');
                    }
                });

                // Videos
                wrapperTemp.querySelectorAll('video').forEach(video => {
                    if (!video.dataset.src) {
                        video.dataset.src = video.getAttribute('src') || '';
                        video.removeAttribute('src');
                        video.classList.add('lazy');
                        // Optional: handle poster attribute if exists
                        if (video.poster) {
                            video.dataset.poster = video.poster;
                            video.removeAttribute('poster');
                        }
                    }
                });

                includeHtml = wrapperTemp.innerHTML;

            } catch (e) {
                console.warn(`Include file not found: ${filePath}`, e);
            }

            html = html.replace(match[0], includeHtml);
        }

        return html;
    }


    async getHtml() { 
        return '';
    }

    async onMount() {}

    async destroy() {
        // remove page-specific CSS
        for (const href of this.cssHrefs) {
            const el = document.querySelector(`link[href="${href}"][data-spa-page="true"]`);
            if (el) el.remove();
        }
        this.cssHrefs = [];

        // remove page-specific JS
        for (const src of this.jsSrcs) {
            const el = document.querySelector(`script[src="${src}"][data-spa-page="true"]`);
            if (el) el.remove();
        }
        this.jsSrcs = [];
    }
}

export default AbstractView;