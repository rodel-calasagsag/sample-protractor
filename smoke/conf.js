"use strict";
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome' // chrome, firefox, internet explorer, MicrosoftEdge
    },
    specs: ['create.new.quote.spec.js'],

    onPrepare: function () {
        var baseUrl = "https://qas-soflo.ecompanystore.com/#/Order";

        browser.driver.manage().window().maximize();
        browser.get(baseUrl);
    }
};