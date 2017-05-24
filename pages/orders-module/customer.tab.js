"use strict";
var WaitTimes = require('../../helpers/wait.times');

var CustomerTab = function () {
    // elements
    var tab = $("li[heading='Customer']");
    var searchField = element(by.model("searchTerm"));
    var searchedTiles = element.all(by.repeater('customer in customerSearch track by customer.CustomerNumber'));
    var saveBtn = $('div:not(.ng-hide) > .btn.btn-primary.bt-large');
    var customerName = element(by.className('media-title'));

    // todo refactor this to depend on the labels
    var details = $$('#orderCustomerForm .property');
    var sapNumber = details.get(0);
    var email = details.get(1);
    var phone = details.get(2);
    var store = details.get(3);
    var company = details.get(4);
    var billingAddress = $('section.ng-binding');

    // others
    var EC = protractor.ExpectedConditions;

    this.click = function () {
        tab.click();
        browser.wait(EC.visibilityOf(searchField), WaitTimes.fiveSec);
        return this;
    };

    this.search = function (query) {
        searchField.clear();
        searchField.sendKeys(query);
        searchField.submit();
        return this;
    };

    this.selectTileByIndex = function (tileIdx) {
        var tile = searchedTiles.get(tileIdx);

        tile.click();

        return this;
    };

    this.selectCustomerBySap = function (sapNumQuery) {
        this.search(sapNumQuery).selectTileByIndex(0);
        browser.wait(EC.textToBePresentInElement(sapNumber, sapNumQuery), WaitTimes.fiveSec);
        saveBtn.click();
        this.click();
        return this;
    };

    this.getName = function () {
        return customerName.getText().then(function (text) {
            return text;
        });
    };

    this.getEmail = function () {
        return email.getText().then(function (text) {
            return text;
        });
    };

    this.getPhone = function () {
        return phone.getText().then(function (text) {
            return text;
        });
    };

    this.getStore = function () {
        return store.getText().then(function (text) {
            return text;
        });
    };

    this.getBillingAddress = function () {
        var heading = "BILLING ADDRESS";
        var nullString = "";

        return billingAddress.getText().then(function (text) {
            return text.toUpperCase().replace(heading, nullString).trim();
        });
    };

    this.getCompany = function () {
        return company.getText().then(function (text) {
            return text;
        });
    };

    this.getSapNumber = function () {
        return sapNumber.getText().then(function (text) {
            return text;
        });
    };
};

module.exports = CustomerTab;