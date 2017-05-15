'use strict';
var OrdersModule = require('./orders-module/orders.module');

var NavPanel = function () {
    var menu = element.all(by.repeater('menuItem in value | filter: CanView'));
    var logoutBtn = element(by.css('.icon-signout'));

    this.logout = function () {
        logoutBtn.click();
    };

    this.goToOrders = function () {
        menu.get(1).click();
        return new OrdersModule();
    };
};

module.exports = NavPanel;