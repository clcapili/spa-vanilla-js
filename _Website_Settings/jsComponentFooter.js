import AbstractView from "./jsViewAbstractView.js";

class Footer extends AbstractView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        const skin = await this.getSkinConfig();
        const basePath = skin.basePath || '';
        const footer = skin.includes.footer;
        const year = new Date().getFullYear();

        // social icons
        const socialIcons = [
            footer.socialMediaLinks.icon1,
            footer.socialMediaLinks.icon2,
            footer.socialMediaLinks.icon3,
            footer.socialMediaLinks.icon4,
            footer.socialMediaLinks.icon5,
            footer.socialMediaLinks.icon6,
            footer.socialMediaLinks.icon7,
            footer.socialMediaLinks.customIcon1,
            footer.socialMediaLinks.customIcon2,
        ];

        // social links HTML
        const socialLinksHTML = socialIcons.map(icon => {
            if (!icon || !icon.url) return '';
            return `
                <a class="smIcon ${icon.display}" href="${icon.url}" aria-label="${icon.accessibilityLabel}" target="_blank">
                    <img data-src="/files/Images/${basePath}/social/${icon.path}" alt="icon" class="social-media-image" aria-hidden="true" loading="lazy">
                </a>
            `;
        }).join('');

        return `
            <footer id="footer_1-grey-nav">
                <div class="footerHold">
                    <div class="wrapper1240 clearfix">
                        <WXMENUFOOTER></WXMENUFOOTER>

                        <div class="footerContact">
                            <ul>
                                <li>
                                    <a data-link href="/${basePath}${footer.contactPage.url}">${footer.contactPage.text}</a>
                                </li>

                                <li id="footerPhone" class="${footer.phoneNumber.display}">
                                    <a href="tel:${footer.phoneNumber.number}" class="iconPhone" aria-label="Phone number" target="_blank" rel="noopener noreferrer">
                                        <em aria-hidden="true" class="material-icons">phone</em>
                                        <span class="footerPhone">${footer.phoneNumber.number}</span>
                                    </a>
                                </li>

                                <li id="socialLinks">
                                    ${socialLinksHTML}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="disclaimerHold">
                    <div class="wrapper1240 clearfix">
                        <div class="disclaimLeft">
                            <ul>
                                <li>
                                    <span class="copyright">&copy;${year} ${footer.copyright.companyName}</span>
                                </li>

                                <li class="${footer.copyright.privacyPolicy.display}">
                                    <a data-link href="${footer.copyright.privacyPolicy.url}" class="ftrLink" target="${footer.copyright.privacyPolicy.newTab}">Privacy Policy</a>
                                </li>
                            
                                <li class="${footer.copyright.faq.display}">
                                    <a data-link href="${footer.copyright.faq.url}" class="ftrLink" target="${footer.copyright.faq.newTab}">FAQ</a>
                                </li>
                                
                                <li class="${footer.copyright.termsConditions.display}">
                                    <a data-link href="${footer.copyright.termsConditions.url}" class="ftrLink" target="${footer.copyright.termsConditions.newTab}">Terms and Conditions</a>
                                </li>
                            </ul>
                        </div>

                        <div class="disclaimRight">
                            <a data-link href="https://www.givex.com" class="givexLogo" aria-label="Givex Website" target="_blank" rel="noopener noreferrer"></a>
                        </div>
                    </div>
                </div>

                <button id="backToTop" type="button" aria-label="Scroll to top of page"></button>
            </footer>

            <!-- INCLUDE:plugins-scripts -->
        `;
    }

    async onMount() {
        // init lazy loading for social icons
        const socialLinksContainer = document.getElementById('socialLinks');
        if (socialLinksContainer && window.lazyLoadMedia) {
            window.lazyLoadMedia(socialLinksContainer);
        }
    }
}

export default Footer;