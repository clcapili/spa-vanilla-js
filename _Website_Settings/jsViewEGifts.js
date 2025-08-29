import AbstractView from './jsViewAbstractView.js';

class EGifts extends AbstractView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        const skin = await this.getSkinConfig();
        const basePath = skin.basePath || '';
        const pageData = skin.classes.EGifts;

        // set title and meta
        this.setTitle(pageData.documentTitle);
        this.setMeta('description', pageData.documentMeta);
        
        let html = `
            <div class="container">
                <h2>Send E-Gift Card</h2>
                <p>This section was loaded dynamically as a class module.</p>
                <button class="buy">Buy Now</button>
            </div>
        `;

        return html;
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