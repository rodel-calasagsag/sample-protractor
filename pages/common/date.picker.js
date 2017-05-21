'use strict';
var WaitTime = require('../../helpers/wait.times');

var DatePicker = function () {
    // page elements
    var todayBtn = element(by.buttonText('Today'));
    var leftBtn = element(by.className('glyphicon-chevron-left'));
    var rightBtn = element(by.className('glyphicon-chevron-right'));
    var title = element(by.css('button.uib-title'));
    var dayButtons = element.all(by.repeater('dt in row'));

    // other vars
    var EC = protractor.ExpectedConditions;

    /**
     * Pick a date from the date picker
     *
     * @param dateField Input field that brings up the date picker when clicked
     * @param targetDate Date to be picked
     */
    this.pick = function (dateField, targetDate) {
        dateField.click();
        todayBtn.click();
        dateField.click();
        goToTargetMonth(targetDate);
        clickDayBtn(targetDate.getDate());
    };

    /**
     * Click the button corresponding to the desired day
     *
     * @param targetNum Number on the button to be clicked
     */
    var clickDayBtn = function (targetNum) {
        var monthStart;

        dayButtons.filter(function (dayBtn, index) {
            var inFirstWk = index < 7;

            return dayBtn.getText().then(function (innerText) {
                var innerNum = Number(innerText);

                if (inFirstWk && innerNum === 1) {
                    monthStart = index;
                }

                return innerNum === targetNum && index >= monthStart;
            });
        }).first().click();
    };

    var goToTargetMonth = function (targetDate) {
        var month = targetDate.toLocaleString("en-us", {month: "long"});
        var tillMonthUpdates = EC.textToBePresentInElement(title, month);
        var monthDiff = computeMonthDiff(targetDate);
        var arrowBtn = monthDiff > 0 ? rightBtn : leftBtn;

        for (var i = 0; i < Math.abs(monthDiff); i++) {
            arrowBtn.click();
        }
        browser.wait(tillMonthUpdates, WaitTime.fiveSec);
    };

    var computeMonthDiff = function (targetDate) {
        var today = new Date();
        var currMonth = today.getMonth() + 1;
        var targetMonth = targetDate.getMonth() + 1;
        var yearDiff = targetDate.getFullYear() - today.getFullYear();

        return yearDiff * 12 + targetMonth - currMonth;
    };
};

module.exports = DatePicker;