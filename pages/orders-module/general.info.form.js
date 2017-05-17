'use strict';
var Select = require('../common/select');
var DatePicker = require('../common/date.picker');

var GeneralInfoForm = function () {
    // page elements
    var orderNameField = element(by.id('orderName'));
    var descriptionField = element(by.id('description'));
    var shipDateField = element(by.id('shipDate'));
    var inhandsDateField = element(by.id('inhandsDate'));
    var firmInhandsDateField = element(by.id('firminhandsDate'));
    var rushNoBtn = element.all(by.model('order.IsRush')).first();
    var rushYesBtn = element.all(by.model('order.IsRush')).last();
    var multiNoBtn = element.all(by.model('order.IsMultipleShipping')).first();
    var multiYesBtn = element.all(by.model('order.IsMultipleShipping')).last();
    var customOrderBtn = element(by.cssContainingText('label.btn', 'Custom Order'));
    var bulkItemsBtn = element(by.cssContainingText('label.btn', 'Bulk Items'));
    var aeDropDown = element(by.id('accountManagerId'));
    var scDropDown = element(by.id('salesCoordinatorId'));
    var ocDropDown = element(by.id('orderCreatorId'));
    var datePicker = new DatePicker();

    this.typeOrderName = function (orderName) {
        orderNameField.clear();
        orderNameField.sendKeys(orderName);
        return this;
    };

    this.typeDescription = function (description) {
        descriptionField.clear();
        descriptionField.sendKeys(description);
        return this;
    };

    this.pickShipDate = function (shipDate) {
        datePicker.pick(shipDateField, shipDate);
        return this;
    };

    this.pickReqInHands = function (reqDate) {
        datePicker.pick(inhandsDateField, reqDate);
        return this;
    };

    this.pickFirmInHands = function (firmDate) {
        datePicker.pick(firmInhandsDateField, firmDate);
        return this;
    };

    this.selectRush = function (isRush) {
        if (isRush) {
            rushYesBtn.click();
        } else {
            rushNoBtn.click();
        }
        return this;
    };

    this.selectMulti = function (isMulti) {
        if (isMulti) {
            multiYesBtn.click();
        } else {
            multiNoBtn.click();
        }
        return this;
    };

    this.selectCustomOrder = function () {
        customOrderBtn.click();
        return this;
    };

    this.selectBulkItems = function () {
        bulkItemsBtn.click();
        return this;
    };

    this.selectAE = function (aeName) {
        var aeSelect = new Select(aeDropDown);
        aeSelect.byText(aeName);
        return this;
    };

    this.selectSC = function (scName) {
        var scSelect = new Select(scDropDown);
        scSelect.byText(scName);
        return this;
    };

    this.selectOC = function (ocName) {
        var scSelect = new Select(ocDropDown);
        scSelect.byText(ocName);
        return this;
    };
};

module.exports = GeneralInfoForm;