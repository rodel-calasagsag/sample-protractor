"use strict";

var CustomerSection = function () {
    // elements
    var parent = $('[ng-if$="order.Customer"]');
    var completedFlag = parent.element(by.className('badge-success'));
    var name = parent.$('.col-lg-6:first-child strong');
    var sapNum = parent.$('.col-lg-6:first-child .details:nth-of-type(1)');
    var email = parent.$('.col-lg-6:first-child .details:nth-of-type(2)');
    var billingAddress = parent.$('.col-lg-6:last-child .details');

    this.getName = function () {
        return name.getText();
    };

    this.isCompleted = function () {
        return completedFlag.isDisplayed();
    };

    this.getSapNumber = function () {
        return sapNum.getText().then(function (text) {
            var heading = "SAP #";
            var nullString = "";

            return text.replace(heading, nullString).trim();
        });
    };

    this.getEmail = function () {
        return email.getText();
    };

    this.getBillingAddress = function () {
        return billingAddress.getText();
    };

};

module.exports = CustomerSection;