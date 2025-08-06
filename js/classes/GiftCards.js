import AbstractView from './AbstractView.js';

class GiftCards extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Gift Cards');
        this.setMeta('description', 'Purchase a physical gift card.');
    }

    async getHtml() {
        await this.loadCSS('/css/modules/gift-cards.css');

        return `
            <div class="container">
                <h2>Buy Gift Cards</h2>
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
        console.log('Buy clicked in GiftCards');
    }

    destroy() {
        const buyBtn = document.querySelector('.buy');
        if (buyBtn) {
            buyBtn.removeEventListener('click', this.handleBuyClick);
        }
        
        super.destroy();
    }
}

export default GiftCards;