import AbstractView from './jsViewAbstractView.js';

class Landing extends AbstractView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        const skin = await this.getSkinConfig();
        const basePath = skin.basePath || '';
        const pageData = skin.classes.Landing;

        // set title and meta
        this.setTitle(pageData.documentTitle);
        this.setMeta('description', pageData.documentMeta);
        
        // load all page-specific CSS + JS in one go
        await this.loadPageAssets('landing');
        
        let html = `
            <section id="cardBackground" class="${pageData.banner.type}">
                <div id="cardForeground" class="${pageData.banner.type}">
                    <div class="wrapper1240 clearfix">
                        <div class="bannerCard ${pageData.banner.displayBanner} ${pageData.banner.roundedBanner}">
                            <a data-link href="${pageData.cardImg.link}" aria-label="${pageData.cardImg.alt}">
                                <img data-src="/files/Images/${basePath}/banner/foreground/${pageData.cardImg.path}" loading="lazy" />
                            </a>
                        </div>
                        <div class="bannerButtons clearfix">
                            <h1 class="${pageData.banner.displayBannerText}">
                                ${pageData.banner.text}
                            </h1>
                            <div class="bannerBtn btn1 ${pageData.btn1.display}">
                                <a data-link href="${pageData.btn1.url}">
                                    ${pageData.btn1.text} <span class="btnArrow"></span>
                                </a>
                            </div>
                            <div class="bannerBtn btn2 ${pageData.btn2.display}">
                                <a data-link href="${pageData.btn2.url}">
                                    ${pageData.btn2.text} <span class="btnArrow"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="banner-shadow-overlay"></div>
                <div class="banner-overlay"></div>
            </section>

            <section id="customBackground" class="${pageData.banner.type}">
                <div id="customForeground" class="${pageData.banner.type}">
                    <img class="${pageData.banner.type}" data-src="/files/Images/${basePath}/banner/foreground/${pageData.customForeground.img.path}" alt="${pageData.customForeground.img.alt}" loading="lazy" />
                </div>

                <div class="banner-overlay"></div>
            </section>

            <section id="rtb_1-intro">
                <div class="wrapper1240">
                    <div class="wrapper1024">
                        ${pageData.intro}
                    </div>
                </div>
            </section>
        `;

        return html;
    }

    async onMount() {
        // any page-specific logic can go here (scripts already handled by loadPageAssets)
        console.log("Landing page mounted");
    }

    destroy() {
        super.destroy();
    }
}

export default Landing;