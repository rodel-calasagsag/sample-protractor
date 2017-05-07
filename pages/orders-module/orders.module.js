"use strict";
var OrderSearchTab = require('./order.search.tab');

var OrdersModule = function () {
    var searchTab = element(by.css('li.searchtab'));

    this.goToSearchTab = function () {
        searchTab.click();
        return new OrderSearchTab();
    };
};

module.exports = OrdersModule;