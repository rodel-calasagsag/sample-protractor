"use strict";

var QuoteSummaryTab = function () {
    // elements
    var tab = $('[heading="Quote Summary"]');

    this.isPresent = function () {
        return tab.isPresent();
    };

};

module.exports = QuoteSummaryTab;