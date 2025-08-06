import AbstractView from './AbstractView.js';

class EGifts extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('E-Gifts');
        this.setMeta('description', 'Send an e-gift card instantly via email.');
    }

    async getHtml() {
        await this.loadCSS('/css/modules/e-gifts.css');

        return `
            <div class="container">
                <h2>Send E-Gift Card</h2>
                <p>This section was loaded dynamically as a class module.</p>
                <button class="buy">Buy Now</button>
            </div>
        `;
    }

    async onMount() {
        const buyBtn = document.querySelector('.buy');
        if (buyBtn) {
            buyBtn.addEventListener('click', this.handleBuyClick);
        }
    }

    handleBuyClick() {
        console.log('Buy clicked in EGifts');
    }

    destroy() {
        const buyBtn = document.querySelector('.buy');
        if (buyBtn) {
            buyBtn.removeEventListener('click', this.handleBuyClick);
        }
        
        super.destroy();
    }
}

export default EGifts;