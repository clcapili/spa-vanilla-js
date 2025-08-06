class AbstractView {
    constructor(params) {
        this.params = params;
        this.cssHref = null;
    }

    setTitle(title) {
        document.title = title;
        this.setMeta('title', title);
    }

    setMeta(name, content) {
        let tag = document.querySelector(`meta[name='${name}']`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('name', name);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    }

    async getHtml() {
        return '';
    }

    async onMount() {
        // override in subclasses to attach events
    }

    async loadCSS(href) {
        if (document.querySelector(`link[href='${href}']`)) {
            return;
        }
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
        this.cssHref = href;
    }

    unloadCSS() {
        if (!this.cssHref) {
            return;
        }
        
        const link = document.querySelector(`link[href='${this.cssHref}']`);
        if (link) {
            link.remove();
        }

        this.cssHref = null;
    }

    destroy() {
        this.unloadCSS();
    }
}

export default AbstractView;