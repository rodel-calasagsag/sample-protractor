"use strict";
var WaitTime = require('../../helpers/wait.times');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome' // chrome, firefox, internet explorer, MicrosoftEdge
    },
    specs: ['clone.quote.spec.js'],

    onPrepare: function () {
        browser.driver.manage().window().maximize();
        // jasmine.getEnv().defaultTimeoutInterval = WaitTime.fiveSec;
    }
};