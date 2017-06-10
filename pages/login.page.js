"use strict";
var NavPanel = require('./navpanel');
var WaitTime = require('../helpers/wait.times');

/**
 * Page object for the login page
 * @constructor
 */
var LoginPage = function () {
    // elements
    var usernameInput = element(by.name('userName'));
    var passwordInput = element(by.name('globalPassword'));
    var loginBtn = element(by.css('.btn-primary'));

    // other vars
    var EC = protractor.ExpectedConditions;

    this.login = function (baseUrl, username, password) {
        browser.get(baseUrl);
        this.typeUsername(username);
        this.typePassword(password);
        loginBtn.click();
    };

    this.typeUsername = function (username) {
        browser.wait(EC.elementToBeClickable(usernameInput), WaitTime.tenSec);
        usernameInput.clear();
        usernameInput.sendKeys(username);
    };

    this.typePassword = function (password) {
        passwordInput.clear();
        passwordInput.sendKeys(password);
    };
};

module.exports = LoginPage;