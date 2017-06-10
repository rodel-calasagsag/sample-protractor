"use strict";
var WaitTime = require('../../../helpers/wait.times');

var SummaryTab = function () {
    // elements
    var tab = $('li[heading="Summary"]');
    var zFeeLine = element(by.cssContainingText('.text-sm', 'Note: A $10 order fee'));
    var convertToOrderBtn = $('[ng-click="convertQuoteToOrder()"]');

    // other fields
    var EC = protractor.ExpectedConditions;

    this.click = function () {
        tab.click();
    };

    this.convertToOrderBtnDisplayed = function () {
        return convertToOrderBtn.isDisplayed();
    };
};

module.exports = SummaryTab;