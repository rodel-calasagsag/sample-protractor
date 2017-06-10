'use strict';
var WaitTime = require('../../../helpers/wait.times');

var OrderTab = function () {
    // parent elements
    var activeTab = $('.parent-tabs > .active');
    var activeTabPane = $('.parent-tabs-content > .tab-pane.active');

    // parent tab child elements
    var orderNumber = element(activeTab.locator()).$("span.ng-binding");
    var storeCode = element(activeTab.locator()).$('span.ng-binding + .quiet');

    // tab details
    var orderName = element(activeTabPane.locator()).$(".tab-title > span:nth-child(2)");
    var orderStatus = element(activeTabPane.locator()).$("a.dropdown-toggle span.ng-binding");
    var reqInHandsDate = element(activeTabPane.locator()).$('.nav.nav-pills + div .ng-binding');
    var firmInHandsDate = element(activeTabPane.locator()).$('.nav.nav-pills + div + div .ng-binding');
    var accountExecutive = element(activeTabPane.locator()).$(".pull-right .media-wrapper:nth-last-child(2)");
    var salesCoordinator = element(activeTabPane.locator()).$(".pull-right .media-wrapper:last-child");
    var customerName = element(activeTabPane.locator()).$('.fa + .text-sm.text-small.ng-binding');
    var multiIcon = element(activeTabPane.locator()).$('img[title="This order has multiple drop ships"]');
    var rushIcon = element(activeTabPane.locator()).$('img[title="Hurry up! This is a Rush order!"]');
    var cogIcon = element(activeTabPane.locator()).$('.nav-pills .fa-cog');
    var createQuoteBtn = element(by.buttonText('Create Quote'));
    var createOrderBtn = element(by.buttonText('Create Order'));

    // other vars
    var EC = protractor.ExpectedConditions;

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
        return orderNumber.getText();
    };

    this.getStoreCode = function () {
        return storeCode.getText().then(function (text) {
            return text.toUpperCase();
        });
    };

    this.getCustomerName = function () {
        return customerName.getText();
    };

    this.showsMultiIcon = function () {
        return multiIcon.isPresent();
    };

    this.showsRushIcon = function () {
        return rushIcon.isPresent();
    };

    this.clickCogIcon = function () {
        cogIcon.click().then(function () {
            browser.wait(EC.visibilityOf(createQuoteBtn), WaitTime.fiveSec);
        });
    };

    this.cloneAsQuote = function () {
        this.clickCogIcon();
        createQuoteBtn.click();
    };

    this.cloneAsOrder = function () {
        this.clickCogIcon();
        createOrderBtn.click();
    };
};

module.exports = OrderTab;