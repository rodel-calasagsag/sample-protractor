"use strict";

var OrderSearchTab = function () {
    var newQuoteBtn = element(by.buttonText('New Quote'));

    this.clickNewQuote = function () {
        newQuoteBtn.click();
    };

};

module.exports = OrderSearchTab;