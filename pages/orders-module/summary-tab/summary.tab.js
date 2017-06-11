"use strict";
var WaitTime = require('../../../helpers/wait.times');

var SummaryTab = function () {
    // elements
    this.tab = $('li[heading="Summary"]');
    this.zFeeLine = element(by.cssContainingText('.text-sm', 'Note: A $10 order fee'));
    this.convertToOrderBtn = $('[ng-click="convertQuoteToOrder()"]');

    // other fields
    var EC = protractor.ExpectedConditions;

    this.click = function () {
        this.tab.click();
    };
};

module.exports = SummaryTab;