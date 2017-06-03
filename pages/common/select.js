'use strict';

var Select = function (dropDownElement) {

    this.byText = function (text) {
        var optionTag = 'option';

        element(dropDownElement.locator()).element(by.cssContainingText(optionTag, text)).click();
    };
};

module.exports = Select;