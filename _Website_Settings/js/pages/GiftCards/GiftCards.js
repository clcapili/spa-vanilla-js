import AbstractView from '../AbstractView.js';

class GiftCards extends AbstractView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        const skin = await this.getSkinConfig();
        const basePath = skin.basePath || '';
        const pageData = skin.classes.GiftCards;

        // set title and meta
        this.setTitle(pageData.documentTitle);
        this.setMeta('description', pageData.documentMeta);
        
        // load page-specific CSS
        await this.loadPageAssetsCSS('gift-cards');

        let html = `
            <section id="subpage-banner_1-img-overlay">
                <div class="subBannerHold">
                    <div class="wrapper1240">
                        <div class="wrapper1024">
                            <h1>${pageData.pageTitle}</h1>
                        </div>
                    </div>
                </div>
                <div class="banner-shadow-overlay"></div>
                <div class="subpage-banner-overlay"></div>
            </section>

            <section class="wrapper1240">
                <div class="wrapper1024">
                    <div id="subpageContent">
                        <div class="subContent"></div>

                        <h2 class="buyCardHdr">Select a Card</h2>

                        <span id="customCardsLink" class="customCardsModule">
                            <a data-link href="/${basePath}/gift-cards/custom-cards">Create Custom Card</a>
                        </span>

                        <div class="clear"></div>

                        <section id="leftColumn" class="clearfix">
                            <div id="cardSummary" class="clearfix">
                                <div id="previewBox">
                                    <img id="cardPreview" alt="default card." loading="lazy">
                                    <span id="cardPreviewName"></span>
                                </div>
                            </div>
                            <button id="expandCards" class="btn" type="button" aria-controls="mobAccordion">Browse Cards</button>
                            <div id="mobAccordion" class="mobCollapsed">
                                <div id="cardCategories" class="greyBox borderBox">
                                    <button id="all" class="filter active" data-filter="all" type="button">All</button>
                                </div>
                                <button id="scrollUp" class="scrollBtn btn inactive" aria-label="Scroll up cards container" type="button"></button>
                                <div id="cardsContainer" class="chooseCard clearfix">
                                    <div id="loadingCards"></div>
                                    <form id="form--select-card">
                                        <fieldset>
                                            <legend class="offscreen">Select a gift card</legend>
                                        </fieldset>
                                    </form>
                                    <button id="seeMore" class="btn" type="button">Load More Options</button>
                                </div>
                                <button id="scrollDown" class="scrollBtn btn" aria-label="Scroll down cards container" type="button"></button>
                                <span id="cws_val_cardDesign" class="val" aria-live="polite"></span>
                            </div>
                        </section>

                        <section class="borderBox" id="editCardInfo">
                            <form onsubmit="return false;">
                                <div class="form">
                                    <div id="amtField" class="field clearfix">
                                        <label id="cws_lbl_gcBuyAmt" for="cws_list_gcBuyAmt">*Amount</label>
                                        <div id="amtLoading"></div>
                                        <!-- dropdown amount -->
                                        <select id="cws_list_gcBuyAmt" name="cws_list_gcBuyAmt" aria-required="true"></select>
                                        <!-- text amount -->
                                        <label id="cws_lbl_gcBuyAmtTxt" for="cws_txt_gcBuyAmt">*Amount</label>
                                        <input id="cws_txt_gcBuyAmt" name="cws_txt_gcBuyAmt" type="text" maxlength="15" aria-required="true">
                                        <span id="cws_val_gcBuyAmt" class="val" aria-live="polite"></span>
                                        <!-- fixed amount -->
                                        <div id="cws_lbl_gcBuyAmtFixed">Amount</div>
                                        <span id="singleAmtLine"><span id="singleAmt" aria-live="polite"></span> <span class="siteCurrency"></span></span>
                                        <span id="amtHint" class="fieldHint"><!--
                                            -->Between <span id="minAmount"></span> and <!--
                                            --><span id="maxAmount"></span> <span class="siteCurrency"></span>
                                        </span>
                                    </div>

                                    <div id="qtyField" class="field clearfix">
                                        <label id="cws_lbl_gcBuyQty" for="cws_list_gcBuyQty">*Quantity</label>
                                        <div id="qtyLoading"></div>
                                        <select id="cws_list_gcBuyQty" name="cws_list_gcBuyQty" aria-required="true"></select>
                                        <label for="cws_txt_gcBuyQty" class="offscreen">Quantity</label>
                                        <input id="cws_txt_gcBuyQty" name="cws_txt_gcBuyQty" type="text" maxlength="4">
                                        <span id="cws_val_gcBuyQty" class="val" aria-live="polite"></span>
                                        <span id="qtyHint" class="fieldHint"><!--
                                            -->Max. <span id="maxQty"></span> cards per order
                                        </span>
                                    </div>

                                    <div id="msgContainer">
                                        <div id="msgNewNote">
                                            <span class="msgHighlighted">This message will apply to all <span id="msgQuantity">#</span> cards.</span> If you would like unique messages for each card, you must add each one separately to the shopping cart.
                                        </div>
                                        <div class="field clearfix">
                                            <label id="cws_lbl_gcBuyTo" for="cws_txt_gcBuyTo">To</label>
                                            <input id="cws_txt_gcBuyTo" name="cws_txt_gcBuyTo" type="text" maxlength="30">
                                        </div>
                                        <div class="field clearfix">
                                            <label id="cws_lbl_gcBuyFrom" for="cws_txt_gcBuyFrom">From</label>
                                            <input id="cws_txt_gcBuyFrom" name="cws_txt_gcBuyFrom" type="text" maxlength="30">
                                        </div>
                                        <div class="field clearfix">
                                            <label id="cws_lbl_gcMsg" for="cws_txt_gcMsg">Message</label>
                                            <textarea id="cws_txt_gcMsg" rows="3" maxlength="180"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="field clearfix" id="btnField">
                                    <button type="submit" form="editCardInfo" class="btn second" id="cws_btn_gcBuyAdd">Add to <span class="shopCartWord"></span></button>
                                    <button class="btn" id="cws_btn_gcBuyCheckout" type="button">Proceed to Checkout</button>
                                    <a data-link id="goToCart" href="/${basePath}/gift-cards/shopping-cart.html"><!--
                                        --><span id="itemsInCart" aria-live="polite"></span> <!--
                                        -->Item(s) in your <span class="shopCartWord lowercase"></span>
                                    </a>
                                    <div class="clear"></div>
                                    <span id="cws_val_gcBuyAdd" class="val" aria-live="polite"></span>
                                    <span id="cws_val_cartSize" class="val" aria-live="polite"></span>
                                </div>
                                <div id="itemAddPopup">
                                    <a id="itemPopupClose" aria-label="Close checkout popup"></a>
                                    <img id="popupImg" src="/cws4.0/global-unix/images/_blank.png" alt="card popup image." loading="lazy">
                                    <strong id="popupQty"></strong><span> item(s) added to <span class="shopCartWord lowercase"></span>.</span>
                                    <button id="toCart" class="btn second" type="button">Checkout</button>
                                </div>
                            </form>
                            <!-- INCLUDE:payment-disclaimer -->
                        </section>

                        <div class="clear"></div>
                    </div>
                </div>
            </section>
        `;

        return html;
    }

    async onMount() {
        // load page-specific JS
        await this.loadPageAssetsJS('gift-cards');
    }

    destroy() {
        super.destroy();
    }
}

export default GiftCards;