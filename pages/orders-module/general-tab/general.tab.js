"use strict";
var WaitTimes = require('../../../helpers/wait.times');
var GeneralForm = require('./general.info.form');

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
    this.tab = element(by.css('li[heading="General"]'));
    this.tabTitle = element(by.cssContainingText('.legend', 'General Info'));
    this.iconedValues = $$('.label.wide + .value.buffer-top');
    this.orderName = element.all(by.cssContainingText(DETAILS_LOCATOR, LABEL_ORDER_NAME)).first();
    this.customerOrderName = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_CUSTOMER_ORDER_NAME));
    this.description = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_DESCRIPTION));
    this.shipDate = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_SHIP_DATE));
    this.reqInHandsDate = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_REQ_IN_HANDS));
    this.firmInHandsDate = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_FIRM_IN_HANDS));
    this.rushValue = this.iconedValues.first();
    this.multiValue = this.iconedValues.last();
    this.accountExecutive = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_ACCOUNT_EXECUTIVE));
    this.salesCoordinator = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_SALES_COORDINATOR));
    this.orderCreator = element(by.cssContainingText(DETAILS_LOCATOR, LABEL_ORDER_CREATOR));
    this.editBtn = element(by.cssContainingText('#orderGeneralForm .btn-primary', 'Edit'));

    // other fields
    var EC = protractor.ExpectedConditions;

    /**
     * Get the value of the ship date
     *
     * @returns {*} Date object representing the ship date
     */
    this.click = function () {
        this.tab.click();
        browser.wait(EC.visibilityOf(this.tabTitle), WaitTimes.fiveSec);
    };

    /**
     * Get the value of the order name
     *
     * @returns {*} The order name
     */
    this.getOrderName = function () {
        return this.orderName.getText().then(function (text) {
            var heading = LABEL_ORDER_NAME.toUpperCase();

            return text.replace(heading, NULL_STRING).trim();
        });
    };

    this.getCustomerOrderName = function () {
        return this.customerOrderName.getText().then(function (text) {
            var heading = LABEL_CUSTOMER_ORDER_NAME.toUpperCase();

            return text.replace(heading, NULL_STRING).trim();
        });
    };

    this.getDescription = function () {
        return this.description.getText().then(function (strDesc) {
            if (strDesc.length > 0) {
                return strDesc.replace(LABEL_DESCRIPTION.toUpperCase(), NULL_STRING).trim();
            }
        });
    };

    this.getShipDate = function () {
        return this.shipDate.getText().then(function (strDate) {
            var extracted = strDate.replace(LABEL_SHIP_DATE.toUpperCase(), NULL_STRING).trim();

            return new Date(extracted);
        });
    };

    this.getReqInHands = function () {
        return this.reqInHandsDate.getText().then(function (strDate) {
            var extracted = strDate.replace(LABEL_REQ_IN_HANDS.toUpperCase(), NULL_STRING).trim();

            return new Date(extracted);
        });
    };

    this.getFirmInHands = function () {
        return this.firmInHandsDate.getText().then(function (strDate) {
            if (strDate.length > 0) {
                var extracted = strDate.replace(LABEL_FIRM_IN_HANDS.toUpperCase(), NULL_STRING).trim();

                return new Date(extracted);
            }
        });
    };

    this.getRushValue = function () {
        return this.rushValue.getText().then(function (text) {
            return text === 'YES';
        });
    };

    this.getMultiValue = function () {
        return this.multiValue.getText().then(function (text) {
            return text === 'YES';
        });
    };

    this.getAE = function () {
        return this.accountExecutive.getText().then(function (text) {
            return text.replace(LABEL_ACCOUNT_EXECUTIVE.toUpperCase(), NULL_STRING).trim();
        });
    };

    this.getSC = function () {
        return this.salesCoordinator.getText().then(function (text) {
            return text.replace(LABEL_SALES_COORDINATOR.toUpperCase(), NULL_STRING).trim();
        });
    };

    this.getOC = function () {
        return this.orderCreator.getText().then(function (text) {
            return text.replace(LABEL_ORDER_CREATOR.toUpperCase(), NULL_STRING).trim();
        });
    };

    this.clickEdit = function () {
        this.editBtn.click();
    };
};

module.exports = GeneralTab;