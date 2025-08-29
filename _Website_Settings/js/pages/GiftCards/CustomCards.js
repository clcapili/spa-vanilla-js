import AbstractView from '../AbstractView.js';

class CustomCards extends AbstractView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        const skin = await this.getSkinConfig();
        const pageData = skin.classes.GiftCards.CustomCards;

        // set title and meta
        this.setTitle(pageData.documentTitle);
        this.setMeta('description', pageData.documentMeta);

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

                        <section id="cardHold" class="clearfix">
                            <section id="cardTemplates">
                                <h2 id="templateHeading" class="customHeading">Select a Card Template</h2>
                                <div id="loadingTemplates"></div>
                                <form class="template" id="customTemplates"></form>
                                <div id="moreCards"></div>
                                <button id="seeMore" class="btn" type="button">Load More Options</button>
                                <div class="field">
                                    <span id="cws_val_templates" class="val" aria-live="polite"></span>
                                </div>
                            </section>
                            <section class="customizeLeft">
                                <h2 id="customizeHeading" class="customHeading">Customize Gift Card</h2>
                                <div id="customizeLeftInside" class="clearfix">
                                    <div class="customCardHold">
                                        <div class="fileUpload">
                                            <input id="files" class="offscreen" name="files[]" type="file" accept="image/gif, image/jpeg, image/png" />
                                            <label id="cws_lbl_files" for="files" class="uploadTitle btn">
                                                <i class="material-icons" style="vertical-align:middle">file_upload</i><!--
                                                -->Upload Image
                                            </label>
                                            <div id="fileText">No image selected</div>
                                            <p id="maxFileSize">Maximum File Size: 4Mb</p>
                                            <span class="val" aria-live="polite" id="cws_val_files"></span>
                                        </div>
                                        <div id="customCard">
                                            <div class="drsElement drsMoveHandle" id="messageHold">
                                                <label for="msgTextArea" id="cws_lbl_msgTextArea">Automatic text field for card</label>
                                                <textarea wrap="on" id="msgTextArea"></textarea>
                                            </div>
                                            <div id="overLayDrag" class="dragThis" draggable="true"></div>
                                            <img id="overlayTemplate" src="/cws4.0/global-unix/images/_blank.png" alt="card template" loading="lazy">
                                            <img id="holderImg" src="/cws4.0/global-unix/images/_blank.png" class="" style="transform:scale(1)" alt="card image" loading="lazy">
                                        </div>
                                        <div class="resizePic clearfix">
                                            <div id="imageScaling">
                                                <label id="cws_lbl_scale" for="scale">Resize Image</label>
                                                <button id="resizeSmaller" aria-label="Scale image down"></button>
                                                <button id="resizeBigger" aria-label="Scale image up"></button>
                                                <input id="scale" type="range" value="0">
                                            </div>
                                            <div id="mobileControls">
                                                <div id="cws_lbl_moveImg">Move Image</div>
                                                <button id="mobMoveUp" class="mobileArrows" aria-label="Move image up"></button>
                                                <button id="mobMoveLeft" class="mobileArrows" aria-label="Move image left"></button>
                                                <button id="mobMoveRight" class="mobileArrows" aria-label="Move image right"></button>
                                                <button id="mobMoveDown" class="mobileArrows" aria-label="Move image down"></button>
                                            </div>
                                        </div>
                                    </div>
                                    <section class="customizeControls">
                                        <div class="customText">
                                            <label for="cws_txt_cardPrintedText" id="cws_lbl_cardPrintedText">Add Text to Your Card</label>
                                            <textarea name="cws_txt_cardPrintedText" id="cws_txt_cardPrintedText" placeholder="Enter your text"></textarea>
                                            <span id="cws_val_cardPrintedText" class="val" aria-live="polite"></span>
                                        </div>
                                        <div class="textControls">  
                                            <div class="topRow">
                                                <div class="fontHold">
                                                <div class="customFont">
                                                    <label id="cws_label_fontfamily" for="cws_list_fontfamily" class="offscreen">Select a font</label>
                                                    <select id="cws_list_fontfamily" name="cws_list_fontfamily"></select>
                                                </div>
                                                <div class="customSize" id="customSize">
                                                    <label id="cws_label_fontsize" for="cws_list_fontsize" class="offscreen">Select text size</label>
                                                    <select id="cws_list_fontsize" name="cws_list_fontsize"></select>
                                                </div>
                                                </div>
                                                <!-- Font Styles -->
                                                <div class="fontStyleHold">
                                                <div class="customTextStyle">
                                                    <div class="field" id="bld">
                                                        <input type="checkbox" id="cws_chk_txtBold" name="cws_chk_txtBold">
                                                        <label id="cws_lbl_txtBold" for="cws_chk_txtBold">Bold</label>
                                                    </div>
                                                    <div class="field" id="ita">
                                                        <input type="checkbox" id="cws_chk_txtItalic" name="cws_chk_txtItalic">
                                                        <label id="cws_lbl_txtItalic" for="cws_chk_txtItalic">Italic</label>
                                                    </div>
                                                    <div class="field" id="under">
                                                        <input type="checkbox" id="cws_chk_txtUnderline" name="cws_chk_txtUnderline">
                                                        <label id="cws_lbl_txtUnderline" for="cws_chk_txtUnderline">Underline</label>
                                                    </div>
                                                </div>
                                                <form class="customTextAlign">
                                                    <fieldset>
                                                        <legend class="offscreen">Choose text alignment</legend>
                                                        <input id="cws_rad_txtLeft" name="cws_rad_txtAlign" type="radio" value="left">
                                                        <label id="cws_label_txtLeft" for="cws_rad_txtLeft">Align Left</label>
                                                        <input id="cws_rad_txtCenter" name="cws_rad_txtAlign" type="radio" value="center">
                                                        <label id="cws_label_txtCenter" for="cws_rad_txtCenter">Align Center</label>
                                                        <input id="cws_rad_txtRight" name="cws_rad_txtAlign" type="radio" value="right">
                                                        <label id="cws_label_txtRight" for="cws_rad_txtRight">Align Right</label>
                                                    </fieldset>
                                                </form>
                                                </div>
                                            </div>
                                            <div class="bottomRow clearfix">
                                                <!-- COLORS -->
                                                <div class="customColor">
                                                    <label id="cws_label_color" for="cws_txt_colorEntry">Text Color:</label> 
                                                    <input class="colorEntry" type="text" id="cws_txt_colorEntry" name="cws_txt_colorEntry" maxlength="50">&nbsp;
                                                    <div id="openTextColor">
                                                        <div id="textColorTile"></div>
                                                        <div class="textArrow"></div>
                                                        <div id="cws_list_colors" class="colorBox clearfix">
                                                            <div class="colorsLeft">
                                                                <div class="colorItem" id="white">
                                                                    <span class="colorPreview white"></span>
                                                                    <span class="colorLabel">White</span>
                                                                </div>
                                                                <div class="colorItem" id="black">
                                                                    <span class="colorPreview black"></span>
                                                                    <span class="colorLabel">Black</span>
                                                                </div>
                                                                <div class="colorItem" id="red">
                                                                    <span class="colorPreview red"></span>
                                                                    <span class="colorLabel">Red</span>
                                                                </div>
                                                                <div class="colorItem" id="orange">
                                                                    <span class="colorPreview orange"></span>
                                                                    <span class="colorLabel">Orange</span>
                                                                </div>
                                                            </div>
                                                            <div class="colorsRight">
                                                                <div class="colorItem" id="green">
                                                                    <span class="colorPreview green"></span>
                                                                    <span class="colorLabel">Green</span>
                                                                </div>
                                                                <div class="colorItem" id="blue">
                                                                    <span class="colorPreview blue"></span>
                                                                    <span class="colorLabel">Blue</span>
                                                                </div>
                                                                <div class="colorItem" id="purple">
                                                                    <span class="colorPreview purple"></span>
                                                                    <span class="colorLabel">Purple</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="customBgColor">
                                                    <label id="cws_label_bgcolor" for="cws_txt_bgColorEntry">Background:</label> 
                                                    <input class="colorEntry" type="text" id="cws_txt_bgColorEntry" name="cws_txt_bgColorEntry" maxlength="50">
                                                    <div id="openTextBgColor">
                                                        <div id="textBgColorTile"></div>
                                                        <div class="textArrow"></div>
                                                        <div id="cws_list_bgcolors" class="colorBox clearfix">
                                                            <div class="colorsLeft">
                                                                <div class="colorItem" id="bgtrans">
                                                                    <span class="colorPreview trans"></span>
                                                                    <span class="colorLabel">None</span>
                                                                </div>
                                                                <div class="colorItem" id="bgwhite">
                                                                    <span class="colorPreview white"></span>
                                                                    <span class="colorLabel">White</span>
                                                                </div>
                                                                <div class="colorItem" id="bgblack">
                                                                    <span class="colorPreview black"></span>
                                                                    <span class="colorLabel">Black</span>
                                                                </div>
                                                                <div class="colorItem" id="bgred">
                                                                    <span class="colorPreview red"></span>
                                                                    <span class="colorLabel">Red</span>
                                                                </div>
                                                                <div class="colorItem" id="bgorange">
                                                                    <span class="colorPreview orange"></span>
                                                                    <span class="colorLabel">Orange</span>
                                                                </div>
                                                            </div>
                                                            <div class="colorsRight">
                                                                <div class="colorItem" id="bggreen">
                                                                    <span class="colorPreview green"></span>
                                                                    <span class="colorLabel">Green</span>
                                                                </div>
                                                                <div class="colorItem" id="bgblue">
                                                                    <span class="colorPreview blue"></span>
                                                                    <span class="colorLabel">Blue</span>
                                                                </div>
                                                                <div class="colorItem" id="bgpurple">
                                                                    <span class="colorPreview purple"></span>
                                                                    <span class="colorLabel">Purple</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section id="toFrom" class="clearfix">
                                        <div class="field to">
                                            <label id="cws_lbl_to" for="cws_txt_to">To</label>
                                            <input type="text" id="cws_txt_to" name="cws_txt_to" maxlength="50">
                                            <span id="cws_val_to" class="val" aria-live="polite"></span>
                                        </div>
                                        <div class="field from">
                                            <label id="cws_lbl_from" for="cws_txt_from">From</label>
                                            <input type="text" id="cws_txt_from" name="cws_txt_from" maxlength="50">
                                            <span id="cws_val_from" class="val" aria-live="polite"></span>
                                        </div>
                                        <div class="field msg">
                                            <label id="cws_lbl_message" for="cws_txt_message">Message</label>
                                            <textarea type="text" id="cws_txt_message" name="cws_txt_message" maxlength="200"></textarea>
                                            <span id="cws_val_message" class="val" aria-live="polite"></span>
                                        </div>
                                    </section>
                                    <div class="borderBox" id="editCardInfo">
                                        <form id="cws_form_custCard" class="hldButtons clearfix" onsubmit="return false;">
                                            <div class="form">
                                                <div id="amtField" class="field">
                                                <label id="cws_lbl_gcBuyAmt" for="cws_list_gcBuyAmt">*Amount</label>
                                                <div id="amtLoading"></div>
                                                <!-- Amount Dropdown -->
                                                <select id="cws_list_gcBuyAmt" name="cws_list_gcBuyAmt" aria-required="true"></select>
                                                <!-- Amount Text Field -->
                                                <label id="cws_lbl_gcBuyAmtTxt" for="cws_txt_gcBuyAmt">*Amount</label>
                                                <input id="cws_txt_gcBuyAmt" name="cws_txt_gcBuyAmt" type="text" maxlength="6" aria-required="true">
                                                <span class="val" aria-live="polite" id="cws_val_gcBuyAmt"></span>
                                                <!-- Amount Fixed -->
                                                <div id="cws_lbl_gcBuyAmtFixed">Amount</div>
                                                <div id="amtDenom"></div>
                                                <div id="amtOther">
                                                    <!-- Amount Other Textbox -->
                                                    <label id="cws_lbl_gcBuyAmt2" for="cws_txt_gcBuyAmt2">*Amount</label>
                                                    <input id="cws_txt_gcBuyAmt2" name="cws_txt_gcBuyAmt2" type="text" maxlength="6" aria-required="true">
                                                    <span class="val" aria-live="polite" id="cws_val_gcBuyAmt2"></span>
                                                    <span id="amtHint2" class="fieldHint"><!--
                                                    -->Between <span id="minAmount2"></span> and <!--
                                                    --><span id="maxAmount2"></span> <span class="siteCurrency"></span>
                                                    </span>
                                                </div>
                                                <div class="clear"></div>
                                                <span id="amtHint" class="fieldHint"><!--
                                                    -->Between <span id="minAmount"></span> and <!--
                                                    --><span id="maxAmount"></span> <span class="siteCurrency"></span>
                                                </span>
                                                </div>
                                                <div id="qtyField" class="field clearfix">
                                                <!-- Quantity Dropdown -->
                                                <label id="cws_lbl_gcBuyQty" for="cws_list_gcBuyQty">*Quantity</label>
                                                <div id="qtyDropdown">
                                                    <div id="qtyLoading"></div>
                                                    <select id="cws_list_gcBuyQty" name="cws_list_gcBuyQty" aria-required="true">
                                                    <option value="none" selected="selected">Select One</option>
                                                    </select>
                                                    <span class="val" aria-live="polite" id="cws_val_gcBuyQty"></span>
                                                </div>
                                                <!-- Other Quantity Textbox -->
                                                <div id="qtyOther">
                                                    <label id="cws_lbl_gcBuyQtyTxt" for="cws_txt_gcBuyQtyTxt">*Quantity</label>
                                                    <input id="cws_txt_gcBuyQtyTxt" name="cws_txt_gcBuyQtyTxt" type="text" maxlength="4" aria-required="true">
                                                    <span class="val" aria-live="polite" id="cws_val_gcBuyQtyTxt"></span>
                                                    <span id="qtyHint" class="fieldHint" style="display:inline-block"><!--
                                                    -->Between <span id="minQty">1</span> and <span id="maxQty">20</span>
                                                    </span>
                                                </div>
                                                </div>
                                            </div>
                                            <div id="btnField">
                                                <small id="customCardDisclaimer">'Design Your Own' cards are subject to a $3.99 design fee per card plus applicable taxes.</small>
                                                <div class="field disclaimField">
                                                    <input type="checkbox" name="cws_chk_cardDisclaim" id="cws_chk_cardDisclaim" aria-required="true">
                                                    <label for="cws_chk_cardDisclaim" id="cws_label_cardDisclaim">* This card design is my final product</label>
                                                    <span class="val" aria-live="polite" id="cws_val_cardDisclaim"></span>
                                                </div>
                                                <div id="itemAddPopup">
                                                    <a id="itemPopupClose"></a>
                                                    <img id="popupImg" src="/cws4.0/global-unix/images/_blank.png" alt="card popup image" loading="lazy">
                                                    <strong id="popupQty"></strong><span> item(s) added to cart.</span>
                                                    <a id="toCart" class="btn second" tabindex="0">Checkout</a>
                                                </div>
                                                <button type="submit" form="cws_form_custCard" class="btn second" id="cws_btn_gcBuyAdd">Add to Cart</button>
                                                <button class="btn" id="cws_btn_gcBuyCheckout">Proceed to Checkout</button>
                                                <a id="goToCart" href="https://alpha-wwws.givex.com/cws4.0/training-cc/shopping-cart.html">
                                                    <span id="itemsInCart"></span> Item(s) in your cart
                                                </a>
                                                <div class="clear"></div>
                                                <span class="val" aria-live="polite" id="cws_val_gcBuyAdd"></span>
                                                <span class="val" aria-live="polite" id="cws_val_fileUpload"></span>
                                                <span class="val" aria-live="polite" id="cws_val_customApiError"></span>
                                                <span class="val" aria-live="polite" id="cws_val_cartSize"></span>
                                            </div>
                                        </form>
                                        <!-- INCLUDE:payment-disclaimer -->
                                    </div>
                                </div>
                            </section>
                        </section>

                        <div class="createdImages">
                            <h2>User Uploaded Image</h2>

                            <section id="userImageUpload">
                                <img id="userImg" src="/cws4.0/global-unix/images/_blank.png" alt="user uploaded image" loading="lazy" />
                            </section>

                            <section id="canvasHoldPreview">
                                <canvas id="bakedImagePreview"></canvas>
                            </section>

                            <br><br>

                            <section id="canvasHold">
                                <canvas id="bakedImage"></canvas>
                            </section>

                            <img id="realPrevBake" src="/cws4.0/global-unix/images/_blank.png" alt="print image preview" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>
        `;

        html = await this.fetchAllIncludes(html) || html;
        
        // load page-specific CSS
        this.loadMultipleCSS([
            '/z_spa_modules/_Website_Settings/css/modules/gift-cards-custom-card.css'
        ]);

        return html;
    }

    async onMount() {
        // load page-specific JS
        await this.loadMultipleJS([
            '/z_spa_modules/_Website_Settings/js/modules/gift-cards-custom-card.js'
        ]);
    }

    destroy() {
        super.destroy();
    }
}

export default CustomCards;