"use strict";
var WaitTime = require('../../../helpers/wait.times');

/**
 * Page object for the Order Search tab
 * @constructor
 */
var OrderSearchTab = function () {
    // elements
    var tab = element(by.className('searchtab '));
    var newQuoteBtn = element(by.buttonText('New Quote'));
    var searchField = element(by.id('searchTicketsTerm'));
    var searchBtn = $('.input-group-btn .btn-default');
    var searchResults = element.all(by.repeater('order in orders'));
    var orderNumAndTitleSpan = $('a[title="SoFlo Order ID & Name"]');
    var customerNameSpan = $('a[title="take me to the customer page"]');
    var customerNameAndStoreSpan = element(by.className('details'));
    var inHandsDateSpan = $('[title="In Hands-Date"]');
    var firmInHandsDateSpan = $('[title="Firm In Hands-Date"]');
    var orderStatusSpan = element(by.className('label-default'));

    // fields
    var rowElement;

    // other vars
    var EC = protractor.ExpectedConditions;

    this.clickNewQuote = function () {
        newQuoteBtn.click();
    };

    this.searchFor = function (query) {
        searchField.clear();
        searchField.sendKeys(query);
        searchBtn.click();
        this.click();
        return this;
    };

    this.click = function () {
        tab.click();
        browser.wait(EC.visibilityOf(searchField), WaitTime.fiveSec);
        return this;
    };

    this.findRowWithOrderNumber = function (targetOrderNumber) {
        rowElement = searchResults.filter(function (row) {
            return row.element(orderNumAndTitleSpan.locator()).getText().then(function (spanText) {
                if (spanText.startsWith(targetOrderNumber)) {
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

};

module.exports = OrderSearchTab;