'use strict';
var Select = require('/helpers/select');

var GeneralInfoForm = function () {
    var orderNameField = element(by.id('orderName'));
    var descriptionField = element(by.id('description'));
    var aeDropDown = element(by.id('accountManagerId'));
    var scDropDown = element(by.id('salesCoordinatorId'));

    this.typeOrderName = function (orderName) {
        orderNameField.clear();
        orderNameField.sendKeys(orderName);
    };

    this.typeDescription = function (description) {
        descriptionField.clear();
        descriptionField.sendKeys(description);
    };

    this.selectAE = function (aeName) {
        var aeSelect = new Select(aeDropDown);

        aeSelect.byText(aeName);
    };

    this.selectSC = function (scName) {
        var scSelect = new Select(scDropDown);

        scSelect.byText(scName);
    };

    this.selectOC = function (scName) {
        var scSelect = new Select(scDropDown);

        scSelect.byText(scName);
    };
};

module.exports = GeneralInfoForm;