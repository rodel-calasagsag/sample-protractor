'use strict';
var Wait = require('../../helpers/wait.times');

var Select = function (options) {

    // other vars
    var EC = protractor.ExpectedConditions;

    this.byText = function (innerText) {
        return options.reduce(function (acc, option) {
            if (acc) {
                return acc;
            }

            return option.getText().then(function (currentOptionText) {
                console.log("current name = " + currentOptionText);
                if (currentOptionText === innerText) {
                    console.log("MATCHED!!");
                    return option;
                }
            });
        }).then(function (option) {
            return option.click();
        });
    };
};

module.exports = Select;