"use strict";
var LoginPage = require('../pages/login.page.js');
var NavPanel = require('../pages/navpanel');
var OrderSearchTab = require('../pages/orders-module/order.search.tab');
var GeneralInfoForm = require('../pages/orders-module/general.info.form');
var User = require('../helpers/user.js');
var BaseUrl = require('../helpers/base.urls');
var GeneralTab = require('../pages/orders-module/general.tab');
var OrderTab = require('../pages/orders-module/order.tab');
var OrderStatuses = require('../helpers/order.statuses');

describe('New Quote', function () {
    // pages
    var loginPage = new LoginPage();
    var navPanel = new NavPanel();
    var searchTab = new OrderSearchTab();
    var generalForm = new GeneralInfoForm();
    var generalTab = new GeneralTab();
    var orderTab = new OrderTab();

    // suite variables
    var orderNumber;

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
            .selectAE(aeName)
            .selectSC(scName)
            .selectOC(ocName)
            .clickCreateOrder();
        generalTab.click();

        // assertions on general info values
        expect(generalTab.getOrderName()).toEqual(orderName);
        expect(generalTab.getDescription()).toEqual(description);
        expect(generalTab.getShipDate()).toEqual(shipDate);
        expect(generalTab.getReqInHands()).toEqual(reqInHands);
        expect(generalTab.getFirmInHands()).toEqual(firmInHands);
        expect(generalTab.getRushValue()).toEqual(rushValue);
        expect(generalTab.getMultiValue()).toEqual(multiValue);
        expect(generalTab.getAE()).toEqual(aeName);
        expect(generalTab.getSC()).toEqual(scName);
        expect(generalTab.getOC()).toEqual(ocName);

        // assertion on order tab details
        orderNumber = orderTab.getOrderNumber();
        expect(orderTab.getOrderName()).toEqual(orderName);
        expect(orderTab.getOrderStatus()).toEqual(OrderStatuses.quote);
        expect(orderTab.getReqInHands()).toEqual(reqInHands);
        expect(orderTab.getFirmInHands()).toEqual(firmInHands);
        expect(orderTab.getAE()).toEqual(aeName);
        expect(orderTab.getSC()).toEqual(scName);
        expect(orderTab.getOrderNumber()).toMatch("\\d{5}");

        // todo choose customer
        // todo assertions for customer details

    });

    afterEach(function () {
        navPanel.logout();
    });
});