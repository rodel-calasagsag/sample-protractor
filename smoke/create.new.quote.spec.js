"use strict";
var LoginPage = require('../pages/login.page.js');
var NavPanel = require('../pages/navpanel');
var OrderSearchTab = require('../pages/orders-module/order.search.tab');
var GeneralInfoForm = require('../pages/orders-module/general.info.form');
var User = require('../helpers/user.js');
var BaseUrl = require('../helpers/base.urls');

describe('New Quote', function () {
    var loginPage = new LoginPage();
    var navPanel = new NavPanel();
    var searchTab = new OrderSearchTab();
    var generalForm = new GeneralInfoForm();

    beforeEach(function () {
        browser.get(BaseUrl.orders);
        loginPage.login(User.testAe2.username, User.password);
        navPanel.goToOrders().goToSearchTab();
    });

    it('should be created via the New Quote button', function () {
        // general info
        var orderName = 'Build Swag for Bing - Drawstring Packs - RUSH';
        var description = 'CLONED from Order 17836 - Build Swag for Bing - Drawstring Packs';
        var aeName = 'Test Account2';
        var scName = 'Test Account 3';
        var orderCreator = 'Test Account4';

        searchTab.clickNewQuote();
        generalForm.typeOrderName(orderName);
        generalForm.typeDescription(description);
        generalForm.selectAE(aeName);
        generalForm.selectSC(scName);
        generalForm.selectOC(orderCreator);

    });

    afterEach(function () {
        navPanel.logout();
    });
});