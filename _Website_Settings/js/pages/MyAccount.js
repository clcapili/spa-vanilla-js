import AbstractView from './AbstractView.js';

class MyAccount extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('My Account');
        this.setMeta('description', 'My Account page loaded');
    }

    async getHtml() {
        await this.loadCSS('/z_modules/_Website_settings/css/modules/my-account.css');

        return `
            <div class="container">
                <h2>My Account</h2>
                <p>This section was loaded dynamically as a class module.</p>
            </div>
        `;
    }

    async onMount() {

    }

    destroy() {
        super.destroy();
    }
}

export default MyAccount;