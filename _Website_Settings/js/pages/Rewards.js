import AbstractView from './AbstractView.js';

class Rewards extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Rewards');
        this.setMeta('description', 'Rewards page loaded');
    }

    async getHtml() {
        await this.loadCSS('/z_modules/_Website_settings/css/modules/rewards.css');

        return `
            <div class="container">
                <h2>Rewards</h2>
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

export default Rewards;