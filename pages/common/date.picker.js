'use strict';

var DatePicker = function () {
    var todayBtn = element(by.buttonText('Today'));
    var leftBtn = element(by.className('glyphicon-chevron-left'));
    var rightBtn = element(by.className('glyphicon-chevron-right'));
    var dayButtons = element.all(by.repeater('dt in row'));


    this.pick = function (dateField, targetDate) {
        dateField.click();
        todayBtn.click();
        dateField.click();
        goToTargetMonth(targetDate);
        clickDayBtn(targetDate.getDay());
    };

    var clickDayBtn = function (targetDay) {
        var monthHasStarted = false;
        var found = false;

        for (var i = 0; i < dayButtons.count(); i++) {
            var dayBtn = dayButtons.get(i);

            dayBtn.getText().then(function (dayText) {
                var innerNum = Number(dayText);

                if (innerNum === 1) {
                    monthHasStarted = true;
                }
                if (monthHasStarted && innerNum === targetDay) {
                    dayBtn.click();
                    found = true;
                }
            });
            if (found) {
                break;
            }
        }
    };

    var goToTargetMonth = function (targetDate) {
        var monthDiff = computeMonthDiff(targetDate);
        var arrowBtn = monthDiff > 0 ? rightBtn : leftBtn;

        for (var i = 0; i < Math.abs(monthDiff); i++) {
            arrowBtn.click();
        }
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