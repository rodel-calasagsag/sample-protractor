"use strict";
var NavPanel = require('./navpanel');

/**
 * Page object for the login page
 * @constructor
 */
var LoginPage = function () {
    var usernameInput = element(by.name('userName'));
    var passwordInput = element(by.name('password'));
    var loginBtn = element(by.css('.btn-primary'));

    this.login = function (username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        loginBtn.click();

        return new NavPanel();
    };

    this.typeUsername = function (username) {
        usernameInput.clear();
        usernameInput.sendKeys(username);
    };

    this.typePassword = function (password) {
        passwordInput.clear();
        passwordInput.sendKeys(password);
    };
};

module.exports = LoginPage;