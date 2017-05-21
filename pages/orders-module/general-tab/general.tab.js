"use strict";
var WaitTimes = require('../../../helpers/wait.times');

var GeneralTab = function () {
    // elements
    var tab = element(by.css('li[heading="General"]'));
    var tabTitle = element(by.cssContainingText('.legend', 'General Info'));
    var values = $$('.section-content .property .value');
    var orderName = values.get(0);
    var description = values.get(1);
    var shipDate = values.get(2);
    var reqInHandsDate = values.get(3);
    var firmInHandsDate = values.get(4);
    var rushValue = values.get(5);
    var multiValue = values.get(6);
    var accountExecutive = values.get(7);
    var salesCoordinator = values.get(8);
    var orderCreator = values.get(9);

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
        return orderName.getText();
    };


    this.getDescription = function () {
        return description.getText().then(function (strDesc) {
            if (strDesc.length > 0) {
                return strDesc
            } else {
                return null;
            }
        });
    };

    this.getShipDate = function () {
        return shipDate.getText().then(function (strDate) {
            return new Date(strDate);
        });
    };

    this.getReqInHands = function () {
        return reqInHandsDate.getText().then(function (strDate) {
            return new Date(strDate);
        });
    };

    this.getFirmInHands = function () {
        return firmInHandsDate.getText().then(function (strDate) {
            if (strDate.length > 0) {
                return new Date(strDate);
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
        return accountExecutive.getText();
    };

    this.getSC = function () {
        return salesCoordinator.getText();
    };

    this.getOC = function () {
        return orderCreator.getText();
    };
};

module.exports = GeneralTab;