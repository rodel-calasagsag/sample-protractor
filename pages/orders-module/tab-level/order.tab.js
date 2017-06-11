'use strict';
var Wait = require('../../../helpers/wait.times');

var OrderTab = function () {
    // parent elements
    var activeTab = $('.parent-tabs > .active');
    var activeTabPane = $('.parent-tabs-content > .tab-pane.active');

    // tab panel elements
    var orderNumber = element(activeTab.locator()).$("span.ng-binding");
    var storeCode = element(activeTab.locator()).$('span.ng-binding + .quiet');

    // child tabs
    var generalTab = element(activeTabPane.locator()).$('li[heading="General"]');

    // tab details
    var orderName = element(activeTabPane.locator()).$(".tab-title > span:nth-child(2)");
    var orderStatus = element(activeTabPane.locator()).$("a.dropdown-toggle span.ng-binding");
    var reqInHandsDate = element(activeTabPane.locator()).$('.nav.nav-pills + div .ng-binding');
    var firmInHandsDate = element(activeTabPane.locator()).$('.nav.nav-pills + div + div .ng-binding');
    var aeAvatar = element(activeTabPane.locator()).$(".pull-right .media-wrapper:nth-last-child(2)");
    var scAvatar = element(activeTabPane.locator()).$(".pull-right .media-wrapper:last-child");
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
        browser.wait(EC.presenceOf(orderStatus), Wait.fiveSec);
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
        return aeAvatar.getAttribute('title');
    };

    this.getSC = function () {
        return scAvatar.getAttribute('title');
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
        browser.wait(EC.elementToBeClickable(cogIcon), Wait.tenSec);
        cogIcon.click();
    };

    this.cloneAsQuote = function () {
        this.clickCogIcon();
        browser.wait(EC.elementToBeClickable(createQuoteBtn), Wait.fiveSec);
        createQuoteBtn.click();
    };

    this.cloneAsOrder = function () {
        this.clickCogIcon();
        browser.wait(EC.elementToBeClickable(createOrderBtn), Wait.fiveSec);
        createOrderBtn.click();
    };

    this.goToGeneralTab = function () {
        browser.wait(EC.elementToBeClickable(generalTab), Wait.fiveSec);
        generalTab.click();
    };

    // helper methods

    this.waitUntilAeAvatarUpdates = function (expAeName) {
        browser.wait(EC.stalenessOf(aeAvatar), Wait.threeSec).then(function () {
            console.log("AE Avatar has went stale");

            browser.wait(EC.presenceOf(aeAvatar), Wait.threeSec).then(function () {
                console.log("AE Avatar became present again");

                browser.wait(function () {
                    return this.getAE().then(function (actAeName) {
                        return actAeName === expAeName;
                    });
                }, Wait.threeSec);
            });
        }, function (err) {
            console.log("Caught error while waiting for AE avatar to become stale: " + err.toString());
        });
    };

    this.waitUntilScAvatarUpdates = function (expScName) {
        browser.wait(EC.stalenessOf(scAvatar), Wait.threeSec).then(function () {
            // do nothing when sc avatar became stale
        }, function (err) {
            console.log("Caught error while waiting for SC avatar to become stale: " + err.toString());
        });
        browser.wait(EC.presenceOf(scAvatar), Wait.threeSec);
        browser.wait(function () {
            return this.getSC().then(function (actScName) {
                return actScName === expScName;
            });
        }, Wait.threeSec);
    };
};

module.exports = OrderTab;