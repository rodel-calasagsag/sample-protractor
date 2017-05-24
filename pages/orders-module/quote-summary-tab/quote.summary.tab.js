"use strict";

var QuoteSummaryTab = function () {
    // elements
    var tab = $('[heading="Quote Summary"]');

    this.isDisplayed = function () {
        return tab.isDisplayed();
    };

};

module.exports = QuoteSummaryTab;