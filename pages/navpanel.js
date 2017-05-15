'use strict';
var OrdersModule = require('./orders-module/orders.module');

var NavPanel = function () {
    var ordersModule = element.all(by.repeater('menuItem in value | filter: CanView')).get(1);
    var logoutBtn = element(by.css('.icon-signout'));

    this.logout = function () {
        logoutBtn.click();
    };

    this.goToOrders = function () {
        ordersModule.click();
        return new OrdersModule();
    };
};

module.exports = NavPanel;