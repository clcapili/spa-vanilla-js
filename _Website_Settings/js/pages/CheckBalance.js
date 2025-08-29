import AbstractView from './AbstractView.js';

class CheckBalance extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Check Balance');
        this.setMeta('description', 'Check balance page loaded');
    }

    async getHtml() {
        await this.loadCSS('/z_modules/_Website_settings/css/modules/check-balance.css');

        return `
            <div class="container">
                <h2>Check Balance</h2>
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

export default CheckBalance;