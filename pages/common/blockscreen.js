'use strict';
var WaitTime = require('../../helpers/wait.times');

var BlockScreen = function () {

    // elements
    var mask = element(by.className('fluxpanel-mask'));

    // other objects
    var EC = protractor.ExpectedConditions;

    this.waitToAppear = function () {
        browser.wait(EC.visibilityOf(mask), WaitTime.fiveSec);
    };

    /**
     * Wait for a maximum of 1 minute until block screen disappears
     */
    this.waitUntilGone = function () {
        this.waitToAppear();
        browser.wait(EC.invisibilityOf(mask), WaitTime.oneMin);
    };
};

module.exports = BlockScreen;
