import AbstractView from './AbstractView.js';
import { lazyLoadMedia } from '../utils/lazyLoadMedia.js';

class Landing extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Brandx');
        this.setMeta('description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    }

    async getHtml() {
        return `
            <div class="container">
                <h1>Welcome!</h1>
                <p>Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do.</p>
            </div>

            <div class="container">
                <img data-src="/images/z_modules/placeholder_720w.jpg" alt="gray placeholder image" class="lazy" />
            </div>
        `;
    }

    async onMount() {
        lazyLoadMedia();
    }
}

export default Landing;