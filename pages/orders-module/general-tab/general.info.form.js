'use strict';
var Select = require('../../common/select');
var DatePicker = require('../../common/date.picker');
var WaitTime = require('../../../helpers/wait.times');

var GeneralInfoForm = function () {
    // page elements
    var orderNameField = element(by.id('orderName'));
    var customerOrderNameField = element(by.id('orderCustomerLabel'));
    var descriptionField = element(by.id('description'));
    var shipDateField = element(by.id('shipDate'));
    var inHandsDateField = element(by.id('inhandsDate'));
    var firmInHandsDateField = element(by.id('firminhandsDate'));
    var rushNoBtn = $('[title="Choose No if this is not a rush."]');
    var rushYesBtn = $('[title="Choose Yes if this is a rush."]');
    var multiNoBtn = $('[title="Choose No if this is not a multiple shipping order."]');
    var multiYesBtn = $('[title="Choose Yes if this is a multiple shipping order."]');
    var customOrderBtn = element(by.cssContainingText('label.btn', 'Custom Order'));
    var bulkItemsBtn = element(by.cssContainingText('label.btn', 'Bulk Items'));
    var aeOptions = element.all(by.options('user.UserId as user.FullName for user in accountManagers'));
    var scOptions = element.all(by.options('user.UserId as user.FullName for user in salesCoordinators'));
    var ocOptions = element.all(by.options('user.UserId as user.FullName for user in users'));
    var createOrderBtn = element(by.cssContainingText('#orderGeneralForm .btn-primary', 'Create Order'));
    var saveChangesBtn = element(by.buttonText('Save Changes'));

    // page objects
    var datePicker = new DatePicker();
    var select = new Select();

    // expected condition
    var EC = protractor.ExpectedConditions;

    this.typeOrderName = function (orderName) {
        browser.wait(EC.elementToBeClickable(orderNameField), WaitTime.fiveSec);
        orderNameField.clear();
        orderNameField.sendKeys(orderName);
    };

    this.typeDescription = function (description) {
        descriptionField.clear();
        descriptionField.sendKeys(description);
    };

    this.pickShipDate = function (shipDate) {
        datePicker.pick(shipDateField, shipDate);
    };

    this.pickReqInHands = function (reqDate) {
        datePicker.pick(inHandsDateField, reqDate);
    };

    this.pickFirmInHands = function (firmDate) {
        datePicker.pick(firmInHandsDateField, firmDate);
    };

    this.selectRush = function (isRush) {
        if (isRush) {
            rushYesBtn.click();
        } else {
            rushNoBtn.click();
        }
    };

    this.selectMulti = function (isMulti) {
        if (isMulti) {
            multiYesBtn.click();
        } else {
            multiNoBtn.click();
        }
    };

    this.selectCustomOrder = function () {
        customOrderBtn.click();
    };

    this.selectBulkItems = function () {
        bulkItemsBtn.click();
    };

    this.selectAE = function (aeName) {
        select.byText(aeOptions, aeName);
    };

    this.selectSC = function (scName) {
        select.byText(scOptions, scName);
    };

    this.selectOC = function (ocName) {
        select.byText(ocOptions, ocName);
    };

    this.clickCreateOrder = function () {
        createOrderBtn.click();
    };

    this.clickSaveChanges = function () {
        saveChangesBtn.click();
    };

    this.typeCustomerOrderName = function (customerOrderName) {
        customerOrderNameField.clear();
        customerOrderNameField.sendKeys(customerOrderName);
    };
};

module.exports = GeneralInfoForm;