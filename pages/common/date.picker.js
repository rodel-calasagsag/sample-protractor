'use strict';
var WaitTime = require('../../helpers/wait.times');

var DatePicker = function () {
    // page elements
    var container = element(by.className('uib-datepicker-popup'));
    var todayBtn = element(by.buttonText('Today'));
    var clearBtn = element(by.buttonText('Clear'));
    var leftBtn = element(by.className('glyphicon-chevron-left'));
    var rightBtn = element(by.className('glyphicon-chevron-right'));
    var title = element(by.css('button.uib-title'));
    var dayButtons = element.all(by.repeater('dt in row'));

    // other vars
    var EC = protractor.ExpectedConditions;

    var openDatePicker = function (dateField) {
        dateField.click();
        browser.wait(EC.visibilityOf(container), WaitTime.fiveSec);
    };

    var clearDate = function () {
        clearBtn.click();
        browser.wait(EC.stalenessOf(container), WaitTime.fiveSec);
    };

    /**
     * Pick a date from the date picker
     *
     * @param dateField Input field that brings up the date picker when clicked
     * @param targetDate Date to be picked
     */
    this.pick = function (dateField, targetDate) {
        openDatePicker(dateField);
        clearDate();
        openDatePicker(dateField);
        goToTargetMonth(targetDate);
        clickDayBtn(targetDate.getDate());
    };

    /**
     * Click the button corresponding to the desired day
     *
     * @param targetNum Number on the button to be clicked
     */
    var clickDayBtn = function (targetNum) {
        var monthHasStarted = false;

        dayButtons.reduce(function (acc, dayBtn) {
            if (typeof acc !== 'undefined') {
                return acc;
            }

            return dayBtn.getText().then(function (innerText) {
                var innerNum = Number(innerText);

                if (innerNum === 1) {
                    monthHasStarted = true;
                }

                if (monthHasStarted && innerNum === targetNum) {
                    console.log("Found the target number: " + innerText);
                    return dayBtn;
                }
            });

        }).then(function (dayBtn) {
            dayBtn.click();
        });
        browser.wait(EC.stalenessOf(container), WaitTime.oneSec);
    };

    var goToTargetMonth = function (targetDate) {
        var month = targetDate.toLocaleString("en-us", {month: "long"});
        var untilTargetMonthArrives = EC.textToBePresentInElement(title, month);
        var monthDiff = computeMonthDiff(targetDate);
        var arrowBtn = monthDiff > 0 ? rightBtn : leftBtn;

        for (var i = 0; i < Math.abs(monthDiff); i++) {
            arrowBtn.click();
        }
        browser.wait(untilTargetMonthArrives, WaitTime.fiveSec);
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