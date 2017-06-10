'use strict';

var Select = function () {

    this.byText = function (options, innerText) {
        options.each(function (option) {
            option.getText().then(function (currentOptionText) {
                if (currentOptionText === innerText) {
                    option.click();
                }
            });
        });
    };
};

module.exports = Select;