import AbstractView from "../pages/AbstractView.js";

class Header extends AbstractView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        const skin = await this.getSkinConfig();
        const basePath = skin.basePath || '';
        const header = skin.includes.header;

        return `
            <!-- Skip link for accessibility -->
            <a href="#main-content" class="skip-to-main-link offscreen">Skip to main content</a>

            <header id="header_1-solid-bg">
                <div class="mainHeader">
                    <div id="utilityNavHold">
                        <ul class="utilityNav wrapper1240">
                            <li id="logout">
                                <em aria-hidden="true" class="fontIcon material-icons">person</em>
                                <button class="utility-nav__logout-dropdown-button" aria-haspopup="true" aria-expanded="false">
                                    <span id="greeting"></span>
                                    <em aria-hidden="true" id="langArrow" class="fontIcon material-icons">arrow_drop_down</em>
                                </button>
                                <span id="logoutDrop">
                                    <a id="headerProfile" href="/${basePath}/my-account/profile.html">My Profile</a>
                                    <a href="javascript:void(0);" id="logoutLink">Sign Out</a>
                                </span>
                            </li>

                            <li id="login">
                                <a href="/${basePath}/login/">
                                    <em aria-hidden="true" class="fontIcon material-icons">person</em>
                                    <span class="utilText">${header.login}</span>
                                </a>
                            </li>

                            <li id="registerLink">
                                <a href="/${basePath}/create-account/">
                                    <span class="utilText">${header.createAccount}</span>
                                </a>
                            </li>

                            <li id="mobilePayHdr">
                                <a href="javascript:;" onclick="openPay(this);return false;" aria-label="Open Mobile Pay">
                                    <em aria-hidden="true" class="fontIcon material-icons">phone_android</em>
                                    <span class="mobText">Mobile Pay</span>
                                </a>
                            </li>

                            <li class="${header.displayHeaderCurrency}">
                                <span class="currSymbol">$</span> <span class="siteCurrency"></span>
                            </li>

                            <li class="${header.displayLanguageSelector}">
                                <span class="utilLang">
                                    <span class="utilText">
                                        <em class="fontIcon material-icons iconGlobe">language</em>
                                        <a id="utilCurLang" href="/${basePath}/fr/">French</a>
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div id="logoHold" class="wrapper1240 clearfix">
                        <div class="logo">
                            <a href="/${basePath}/" aria-label="Home">
                                <img data-src="/files/Images/${basePath}/logo/${header.siteLogo.path}" alt="${header.siteLogo.alt}" loading="lazy" />
                            </a>
                        </div>

                        <div id="navCart">
                            <em class="fontIcon material-icons iconCart">${header.cartIcon}</em>

                            <div id="shopCartHold">
                                <a id="navGiftCart" href="/${basePath}/gift-cards/shopping-cart.html" aria-label="Shopping cart for gift cards">
                                    <span class="utilText cartText">${header.giftCardsCartText}</span> 
                                    <span id="cartAmtHeader" aria-live="polite">(0)</span>
                                </a>
                                <a id="navEgiftCart" href="/${basePath}/e-gifts/shopping-cart.html" aria-label="Shopping cart for e-gifts">
                                    <span class="utilText cartText">${header.eGiftsCartText}</span> 
                                    <span id="eGiftCartAmtHeader" aria-live="polite">(0)</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="header_1-solid-bg_2" class="navHold">
                    <div class="wrapper1240 clearfix">
                        <nav class="mainNav">
                            <a href="/${basePath}/gift-cards/" class="nav-link" data-link>Gift Cards</a>
                        </nav>
                    </div>

                    <nav class="mobileNav">
                        <button id="hamburgerBar" aria-expanded="false" aria-haspopup="true" aria-controls="mobTopNav" aria-label="Open mobile navigation" type="button"></button>
                    </nav>
                </div>
            </header>
        `;
    }

    async onMount() {
        // init lazy loading for the logo
        const logoImg = document.querySelector('#logoHold img[data-src]');
        if (logoImg && window.lazyLoadMedia) {
            window.lazyLoadMedia(logoImg.parentElement);
        }

        // header-specific events like mobile menu toggle can go here
    }
}

export default Header;