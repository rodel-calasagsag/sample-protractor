"use strict";
var WaitTime = require('../../../helpers/wait.times');
var OrderTab = require('../tab-level/order.tab');

/**
 * Page object for the Order Search tab
 * @constructor
 */
var OrderSearchTab = function () {
    // elements
    var tab = element(by.className('searchtab'));
    var newQuoteBtn = element(by.buttonText('New Quote'));
    var searchField = element(by.id('searchTicketsTerm'));
    var searchBtn = $('.input-group-btn .btn-default');
    var searchResults = element.all(by.repeater('order in orders'));
    var aeAvatar = $('td:first-child .media-wrapper');
    var scAvatar = $('td:nth-child(2) .media-wrapper');
    var orderNumAndTitleSpan = $('a[title="SoFlo Order ID & Name"]');
    var customerNameSpan = $('a[title="take me to the customer page"]');
    var customerNameAndStoreSpan = element(by.className('details'));
    var inHandsDateSpan = $('[title="In Hands-Date"]');
    var firmInHandsDateSpan = $('[title="Firm In Hands-Date"]');
    var orderStatusSpan = element(by.className('label-default'));
    var createDateTime = $('td:nth-last-child(3) div.ng-binding');
    var multiFlag = $('[title="This order has multiple shipping addresses!"]');
    var rushFlag = $('[title="This is a RUSH order!"]');

    // fields
    var rowElement;

    // other vars
    var EC = protractor.ExpectedConditions;

    this.clickNewQuote = function () {
        newQuoteBtn.click();
    };

    this.searchFor = function (query) {
        browser.wait(EC.presenceOf(searchField), WaitTime.fiveSec);
        searchField.clear();
        searchField.sendKeys(query);
        searchBtn.click();
        this.click();
        browser.wait(untilResultsAreLoaded(), WaitTime.halfMin, "No results were loaded");
    };

    this.click = function () {
        tab.click();
        browser.wait(EC.visibilityOf(searchField), WaitTime.fiveSec);
    };

    this.findRowWithOrderNumber = function (orderNumber) {
        rowElement = searchResults.filter(function (row) {
            return row.element(orderNumAndTitleSpan.locator()).getText().then(function (spanText) {
                if (spanText.startsWith(orderNumber)) {
                    return row;
                }
            });
        }).first();
    };

    this.getRowOrderNumberAndTitle = function () {
        return rowElement.element(orderNumAndTitleSpan.locator()).getText();
    };

    this.getRowCustomerName = function () {
        return rowElement.element(customerNameSpan.locator()).getText();
    };

    this.getRowStoreCode = function () {
        return rowElement.element(customerNameAndStoreSpan.locator()).getText().then(function (nameAndStore) {
            var storeLength = 3;
            var startIndex = nameAndStore.length - storeLength;

            return nameAndStore.substr(startIndex, storeLength);
        });
    };

    this.getRowInHands = function () {
        return rowElement.element(inHandsDateSpan.locator()).getText().then(function (strDate) {
            return new Date(strDate);
        });
    };

    this.getRowFirmInHands = function () {
        return rowElement.element(firmInHandsDateSpan.locator()).getText().then(function (strDate) {
            return new Date(strDate);
        });
    };

    this.getRowStatus = function () {
        return rowElement.element(orderStatusSpan.locator()).getText();
    };

    this.getRowAE = function () {
        return rowElement.element(aeAvatar.locator()).getAttribute('title');
    };

    this.getRowSC = function () {
        return rowElement.element(scAvatar.locator()).getAttribute('title');
    };

    this.getRowCreateDateTime = function () {
        return rowElement.element(createDateTime.locator()).getText().then(function (strDateTime) {
            var dt = new Date(strDateTime);
            return dt.toString();
        });
    };

    this.rowShowsMultiFlag = function () {
        return rowElement.element(multiFlag.locator()).isPresent();
    };

    this.rowShowsRushFlag = function () {
        return rowElement.element(rushFlag.locator()).isPresent();
    };

    this.clickRowWithOrderNumber = function (orderNum) {
        searchResults.count().then(function (count) {
            console.log("Number of matches returned = " + count);
        });

        searchResults.reduce(function (acc, row) {
            if (acc) {
                return acc;
            }

            return row.element(orderNumAndTitleSpan.locator()).getText().then(function (text) {
                if (text.startsWith(orderNum)) {
                    return row;
                }
            });
        }).then(function (row) {
            row.element(orderNumAndTitleSpan.locator()).click();
        });
    };

    // methods
    var untilResultsAreLoaded = function () {
        return searchResults.count().then(function (count) {
            return count > 0;
        });
    };
};

module.exports = OrderSearchTab;