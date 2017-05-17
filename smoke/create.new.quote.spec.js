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
        navPanel.goToOrders()
            .goToSearchTab();
    });

    it('should be created via the New Quote button', function () {
        // test data: general info
        var orderName = 'Build Swag for Bing - Drawstring Packs - RUSH';
        var description = 'CLONED from Order 17836 - Build Swag for Bing - Drawstring Packs';
        var shipDate = new Date('05/30/2017');
        var reqInHands = new Date('06/28/2017');
        var firmInHands = new Date('08/04/2017');
        var rushValue = true;
        var multiValue = true;
        var aeName = 'Test Account2';
        var scName = 'Test Account 3';
        var ocName = 'Test Account4';

        searchTab.clickNewQuote();
        generalForm.typeOrderName(orderName)
            .typeDescription(description)
            .pickShipDate(shipDate)
            .pickReqInHands(reqInHands)
            .pickFirmInHands(firmInHands)
            .selectRush(rushValue)
            .selectMulti(multiValue)
            .selectCustomOrder()
            .selectAE(aeName)
            .selectSC(scName)
            .selectOC(ocName);
    });

    afterEach(function () {
        navPanel.logout();
    });
});