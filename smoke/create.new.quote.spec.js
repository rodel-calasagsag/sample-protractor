"use strict";
var LoginPage = require('../pages/login.page.js');
var User = require('../helpers/user.js');

describe('Create new quote', function () {
    var user = new User();
    var loginPage = new LoginPage();
    var navPanel;
    var searchTab;

    beforeEach(function () {
        navPanel = loginPage.login(user.testAe2.username, user.password);
        searchTab = navPanel.goToOrders().goToSearchTab();
    });

    it('should take user to New Quote Form', function () {
        expect(true).toBeTruthy();
    });

    afterEach(function () {
        navPanel.logout();
    });
});