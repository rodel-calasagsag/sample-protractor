'use strict';
var OrdersModule = require('./orders-module/orders.module');

var NavPanel = function () {
    var navModules = element.all(by.repeater('menuItem in value | filter: CanView'));
    var ordersModule = navModules.get(1);
    var logoutBtn = element(by.className('icon-signout'));

    this.logout = function () {
        logoutBtn.click();
    };

    this.goToOrders = function () {
        ordersModule.click();
        return new OrdersModule();
    };
};

module.exports = NavPanel;