"use strict";
var WaitTime = require('../../helpers/wait.times');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome' // chrome, firefox, internet explorer, MicrosoftEdge
    },
    specs: ['create.clone.quotes.spec.js'],

    onPrepare: function () {
        browser.driver.manage().window().maximize();
        // jasmine.DEFAULT_TIMEOUT_INTERVAL = WaitTime.tenSec;
        // browser.manage().timeouts().implicitlyWait(WaitTime.tenSec);
    }
};