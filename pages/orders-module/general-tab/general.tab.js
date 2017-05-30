"use strict";
var WaitTimes = require('../../../helpers/wait.times');

var GeneralTab = function () {
    // constants
    const DETAILS_LOCATOR = ".section-content > .property";
    const LABEL_ORDER_NAME = "Order Name";
    const LABEL_CUSTOMER_ORDER_NAME = "Customer Order Name";
    const LABEL_DESCRIPTION = "Description";
    const LABEL_SHIP_DATE = "Ship Date";
    const LABEL_REQ_IN_HANDS = "Requested In Hands Date";
    const LABEL_FIRM_IN_HANDS = "Firm In Hands Date";
    const LABEL_ACCOUNT_EXECUTIVE = "Account Executive";
    const LABEL_SALES_COORDINATOR = "Sales Coordinator";
    const LABEL_ORDER_CREATOR = "Order Creator";
    const NULL_STRING = "";

    // elements
    var tab = element(by.css('li[heading="General"]'));
    var tabTitle = element(by.cssContainingText('.legend', 'General Info'));
    var iconedValues = $$('.label.wide + .value.buffer-top');
    var orderName = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_ORDER_NAME));
    var customerOrderName = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_CUSTOMER_ORDER_NAME));
    var description = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_DESCRIPTION));
    var shipDate = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_SHIP_DATE));
    var reqInHandsDate = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_REQ_IN_HANDS));
    var firmInHandsDate = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_FIRM_IN_HANDS));
    var rushValue = iconedValues.first();
    var multiValue = iconedValues.last();
    var accountExecutive = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_ACCOUNT_EXECUTIVE));
    var salesCoordinator = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_SALES_COORDINATOR));
    var orderCreator = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_ORDER_CREATOR));

    // other fields
    var EC = protractor.ExpectedConditions;

    /**
     * Get the value of the ship date
     *
     * @returns {*} Date object representing the ship date
     */
    this.click = function () {
        tab.click();
        browser.wait(EC.visibilityOf(tabTitle), WaitTimes.fiveSec);
        return this;
    };

    /**
     * Get the value of the order name
     *
     * @returns {*} The order name
     */
    this.getOrderName = function () {
        return orderName.getText().then(function (text) {
            var heading = LABEL_ORDER_NAME.toUpperCase();

            return text.replace(heading, NULL_STRING).trim();
        });
    };

    this.getCustomerOrderName = function () {
        return customerOrderName.getText().then(function (text) {
            var heading = LABEL_CUSTOMER_ORDER_NAME.toUpperCase();

            return text.replace(heading, NULL_STRING).trim();
        });
    };

    this.getDescription = function () {
        return description.getText().then(function (strDesc) {
            if (strDesc.length > 0) {
                return strDesc.replace(LABEL_DESCRIPTION.toUpperCase(), NULL_STRING).trim();
            } else {
                return null;
            }
        });
    };

    this.getShipDate = function () {
        return shipDate.getText().then(function (strDate) {
            var extracted = strDate.replace(LABEL_SHIP_DATE.toUpperCase(), NULL_STRING).trim();

            return new Date(extracted);
        });
    };

    this.getReqInHands = function () {
        return reqInHandsDate.getText().then(function (strDate) {
            var extracted = strDate.replace(LABEL_REQ_IN_HANDS.toUpperCase(), NULL_STRING).trim();

            return new Date(extracted);
        });
    };

    this.getFirmInHands = function () {
        return firmInHandsDate.getText().then(function (strDate) {
            if (strDate.length > 0) {
                var extracted = strDate.replace(LABEL_FIRM_IN_HANDS.toUpperCase(), NULL_STRING).trim();

                return new Date(extracted);
            } else {
                return null;
            }
        });
    };

    this.getRushValue = function () {
        return rushValue.getText().then(function (text) {
            return text === 'YES';
        });
    };

    this.getMultiValue = function () {
        return multiValue.getText().then(function (text) {
            return text === 'YES';
        });
    };

    this.getAE = function () {
        return accountExecutive.getText().then(function (text) {
            return text.replace(LABEL_ACCOUNT_EXECUTIVE.toUpperCase(), NULL_STRING).trim();
        });
    };

    this.getSC = function () {
        return salesCoordinator.getText().then(function (text) {
            return text.replace(LABEL_SALES_COORDINATOR.toUpperCase(), NULL_STRING).trim();
        });
    };

    this.getOC = function () {
        return orderCreator.getText().then(function (text) {
            return text.replace(LABEL_ORDER_CREATOR.toUpperCase(), NULL_STRING).trim();
        });
    };
};

module.exports = GeneralTab;