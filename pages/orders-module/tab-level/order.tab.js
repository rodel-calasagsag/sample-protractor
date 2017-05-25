'use strict';
var WaitTime = require('../../../helpers/wait.times');

var OrderTab = function () {
    // elements
    var activeTab = $('.parent-tabs > .active');
    var activeTabPane = $('.parent-tabs-content > .tab-pane.active');
    var orderName = $(".tab-title > span:nth-child(2)");
    var orderStatus = $("a.dropdown-toggle span.ng-binding");
    var reqInHandsDate = $('.nav.nav-pills + div .ng-binding');
    var firmInHandsDate = $('.nav.nav-pills + div + div .ng-binding');
    var accountExecutive = $(".pull-right .media-wrapper:nth-last-child(2)");
    var salesCoordinator = $(".pull-right .media-wrapper:last-child");
    var orderNumber = $(".closeable .active span.ng-binding");
    var storeCode = $('.closeable .active span.ng-binding + .quiet');
    var customerName = $('.fa + .text-sm.text-small.ng-binding');
    var multiIcon = $('img[title="This order has multiple drop ships"]');
    var rushIcon = $('img[title="Hurry up! This is a Rush order!"]');
    var cogIcon = $('.nav-pills .fa-cog');
    var createQuoteBtn = element(by.buttonText('Create Quote'));
    var createOrderBtn = element(by.buttonText('Create Order'));


    // other vars
    var EC = protractor.ExpectedConditions;

    this.getOrderName = function () {
        return activeTabPane.element(orderName.locator()).getText();
    };

    this.getOrderStatus = function () {
        return activeTabPane.element(orderStatus.locator()).getText();
    };

    this.getReqInHands = function () {
        return activeTabPane.element(reqInHandsDate.locator()).getText().then(function (strDate) {
            return new Date(strDate);
        });
    };

    this.getFirmInHands = function () {
        return activeTabPane.element(firmInHandsDate.locator()).getText().then(function (strDate) {
            return new Date(strDate);
        });
    };

    this.getAE = function () {
        return activeTabPane.element(accountExecutive.locator()).getAttribute('title');
    };

    this.getSC = function () {
        return activeTabPane.element(salesCoordinator.locator()).getAttribute('title');
    };

    this.getOrderNumber = function () {
        return activeTab.element(orderNumber.locator()).getText();
    };

    this.getStoreCode = function () {
        return activeTab.element(storeCode.locator()).getText().then(function (text) {
            return text.toUpperCase();
        });
    };

    this.getCustomerName = function () {
        return activeTabPane.element(customerName.locator()).getText();
    };

    this.showsMultiIcon = function () {
        return activeTabPane.element(multiIcon.locator()).isPresent();
    };

    this.showsRushIcon = function () {
        return activeTabPane.element(rushIcon.locator()).isPresent();
    };

    this.cloneAsQuote = function () {
        activeTabPane.element(cogIcon.locator()).click();
        browser.wait(EC.visibilityOf(activeTabPane.element(createQuoteBtn.locator())), WaitTime.fiveSec);
        createQuoteBtn.isDisplayed().then(function (isTrue) {
            if (isTrue) {
                console.log("Create Quote button is displayed");
            }
        });
        // createQuoteBtn.click();
    };
};

module.exports = OrderTab;