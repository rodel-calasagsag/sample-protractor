"use strict";

/**
 * Page object for the Order Search tab
 * @constructor
 */
var OrderSearchTab = function () {
    var newQuoteBtn = element(by.buttonText('New Quote'));

    this.clickNewQuote = function () {
        newQuoteBtn.click();
    };

};

module.exports = OrderSearchTab;