'use strict';

var OrderTab = function () {
    // elements
    var orderName = $(".tab-title > span:nth-child(2)");
    var orderStatus = $("a.dropdown-toggle span.ng-binding");
    var reqInHandsDate = $('.nav.nav-pills + div .ng-binding');
    var firmInHandsDate = $('.nav.nav-pills + div + div .ng-binding');
    var avatars = $$(".pull-right .media-wrapper");
    var accountExecutive = avatars.get(0);
    var salesCoordinator = avatars.get(1);
    var orderNumber = $(".closeable .active span.ng-binding");

    this.getOrderName = function () {
        return orderName.getText();
    };

    this.getOrderStatus = function () {
        return orderStatus.getText();
    };

    this.getReqInHands = function () {
        return reqInHandsDate.getText().then(function (strDate) {
            return new Date(strDate);
        });
    };

    this.getFirmInHands = function () {
        return firmInHandsDate.getText().then(function (strDate) {
            return new Date(strDate);
        });
    };

    this.getAE = function () {
        return accountExecutive.getAttribute('title');
    };

    this.getSC = function () {
        return salesCoordinator.getAttribute('title');
    };

    this.getOrderNumber = function () {
        return orderNumber.getText().then(function (orderNum) {
            return orderNum;
        });
    };

};

module.exports = OrderTab;