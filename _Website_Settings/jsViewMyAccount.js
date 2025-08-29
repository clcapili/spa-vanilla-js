import AbstractView from './jsViewAbstractView.js';

class MyAccount extends AbstractView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        const skin = await this.getSkinConfig();
        const basePath = skin.basePath || '';
        const pageData = skin.classes.MyAccount;

        // set title and meta
        this.setTitle(pageData.documentTitle);
        this.setMeta('description', pageData.documentMeta);
        
        let html = `
            <div class="container">
                <h2>My Account</h2>
                <p>This section was loaded dynamically as a class module.</p>
            </div>
        `;

        return html;
    }

    async onMount() {

    }

    destroy() {
        super.destroy();
    }
}

export default MyAccount;