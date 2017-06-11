"use strict";
var LoginPage = require('../../pages/login.page.js');
var NavPanel = require('../../pages/navpanel');
var OrderSearchTab = require('../../pages/orders-module/tab-level/order.search.tab');
var GeneralInfoForm = require('../../pages/orders-module/general-tab/general.info.form');
var User = require('../../helpers/user.js');
var BaseUrl = require('../../helpers/base.urls');
var GeneralTab = require('../../pages/orders-module/general-tab/general.tab');
var OrderTab = require('../../pages/orders-module/tab-level/order.tab');
var OrderStatus = require('../../helpers/order.statuses');
var SummaryTab = require('../../pages/orders-module/summary-tab/summary.tab');
var QuoteSummaryTab = require('../../pages/orders-module/quote-summary-tab/quote.summary.tab');
var OrdersModule = require('../../pages/orders-module/orders.module');
var WaitTime = require('../../helpers/wait.times');

describe('Quote', function () {

    // domain: suite values
    var baseUrl = BaseUrl.qas.orders;
    var username = User.test2.username;
    var password = User.globalPassword;
    var oldOrderNumber = "13157";
    var quoteClonedFromOrder;

    // domain vars: general info
    var orderName = 'Build Swag for Bing - Drawstring Packs - RUSH';
    var customerOrderName = "GoDaddy TA Ambassador Tees <<Customr Ordr Nme>>";
    var description = 'Description for: Build Swag for Bing - Drawstring Packs';
    var shipDate = new Date('06/30/2017');
    var reqInHands = new Date('07/14/2017');
    var firmInHands = new Date('08/31/2017');
    var rushValue = true;
    var multiValue = false;
    var aeName = User.test1.name;
    var scName = User.test3.name;
    var ocName = User.test2.name;

    // page objects
    var loginPage = new LoginPage();
    var navPanel = new NavPanel();
    var searchTab = new OrderSearchTab();
    var generalForm = new GeneralInfoForm();
    var generalTab = new GeneralTab();
    var orderTab = new OrderTab();
    var summaryTab = new SummaryTab();
    var quoteTab = new QuoteSummaryTab();
    var ordersModule = new OrdersModule();

    /**
     * Login as AE and go to order search tab
     */
    beforeEach(function () {
        loginPage.login(baseUrl, username, password);
        navPanel.goToOrders();
        ordersModule.goToSearchTab();
    });

    /**
     * Logout
     */
    afterEach(function () {
        navPanel.logout();
    });

    // spec 1
    it('can be cloned FROM an order', function () {
        cloneOrderAsQuote();
        orderTab.getOrderNumber().then(function (text) {
            quoteClonedFromOrder = text;
            console.log("Order number of quote cloned from an old order = " + quoteClonedFromOrder);
        });
        fillUpGeneralForm();
        generalForm.clickSaveChanges();

        expect(orderTab.getOrderStatus()).toEqual(OrderStatus.quote);
        expect(generalTab.getOrderName()).toEqual(orderName);
        expect(generalTab.getCustomerOrderName()).toEqual(customerOrderName);
        expect(generalTab.getDescription()).toEqual(description);
        expect(generalTab.getShipDate()).toEqual(shipDate);
        expect(generalTab.getReqInHands()).toEqual(reqInHands);
        expect(generalTab.getFirmInHands()).toEqual(firmInHands);
        expect(generalTab.getRushValue()).toEqual(rushValue);
        expect(generalTab.getMultiValue()).toEqual(multiValue);
        expect(generalTab.getAE()).toEqual(aeName);
        expect(generalTab.getSC()).toEqual(scName);
        expect(generalTab.getOC()).toEqual(ocName);
    });

    // spec 2
    xit('cloned FROM an order has a Quote Summary Tab and Convert to Order button', function () {
        searchTab.searchFor(quoteClonedFromOrder);
        searchTab.clickRowWithOrderNumber(quoteClonedFromOrder);


        // summaryTab = new SummaryTab();
        // summaryTab.click();
        // expect(quoteTab.isPresent()).toBeTruthy();
        // expect(summaryTab.convertToOrderBtn.isDisplayed()).toBeTruthy();
    });

    // spec 3
    xit('can be cloned TO an order', function () {
        searchTab.searchFor(quoteClonedFromOrder)
            .clickRowWithOrderNumber(quoteClonedFromOrder);
        orderTab.cloneAsOrder();

        expect(orderTab.getOrderStatus()).toEqual(OrderStatus.incomplete);
    });

    // spec 4
    xit("can be converted to an order ", function () {
        // todo completeProductInfo();
        // todo completeShippingInfo();
        // todo completePaymentInfo();
        // todo convertQuoteToOrder();
        // todo verify order status changes to Incomplete in order tab and search tab
        // todo verify Quote Summary tab becomes read only
        // todo verify convert to order button disappears
    });

    // utility methods

    var cloneOrderAsQuote = function () {
        searchTab.searchFor(oldOrderNumber);
        searchTab.clickRowWithOrderNumber(oldOrderNumber);
        orderTab.cloneAsQuote();

        expect(orderTab.getOrderStatus()).toEqual(OrderStatus.quote);
    };

    var fillUpGeneralForm = function () {
        generalForm.selectOC(ocName);
        generalForm.typeOrderName(orderName);
        generalForm.typeCustomerOrderName(customerOrderName);
        generalForm.typeDescription(description);
        generalForm.pickShipDate(shipDate);
        generalForm.pickReqInHands(reqInHands);
        generalForm.pickFirmInHands(firmInHands);
        generalForm.selectRush(rushValue);
        generalForm.selectMulti(multiValue);
        generalForm.selectAE(aeName);
        generalForm.selectSC(scName);
    };
});