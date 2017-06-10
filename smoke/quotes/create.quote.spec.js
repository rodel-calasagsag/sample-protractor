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
var CustomerTab = require('../../pages/orders-module/customer.tab');
var SummaryTab = require('../../pages/orders-module/summary-tab/summary.tab');
var CustomerSection = require('../../pages/orders-module/summary-tab/customer.section');
var QuoteSummaryTab = require('../../pages/orders-module/quote-summary-tab/quote.summary.tab');
var OrdersModule = require('../../pages/orders-module/orders.module');

describe('Quote', function () {

    // domain: suite values
    var baseUrl = BaseUrl.qas.orders;
    var username = User.test2.username;
    var password = User.globalPassword;
    var newOrderNumber;

    // domain vars: general info
    var orderName = 'Build Swag for Bing - Drawstring Packs - RUSH';
    var customerOrderName = "GoDaddy TA Ambassador Tees <<Customr Ordr Nme>>";
    var description = 'Description for: Build Swag for Bing - Drawstring Packs';
    var shipDate = new Date('06/30/2017');
    var reqInHands = new Date('07/14/2017');
    var firmInHands = new Date('08/31/2017');
    var rushValue = true;
    var multiValue = false;
    var aeName = User.test2.name;
    var scName = User.test3.name;
    var ocName = User.test4.name;
    var orderCreateDateTime;

    // domain vars: customer details
    var customerName;
    var customerSap = "0001365875";
    var customerEmail;
    var customerPhone;
    var customerStore;
    var customerCompany;
    var billingAddress;

    // page objects
    var loginPage = new LoginPage();
    var navPanel = new NavPanel();
    var searchTab = new OrderSearchTab();
    var generalForm = new GeneralInfoForm();
    var generalTab = new GeneralTab();
    var orderTab = new OrderTab();
    var customerTab = new CustomerTab();
    var summaryTab = new SummaryTab();
    var customerSummary = new CustomerSection();
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
        // todo if spec failed, take screenshot
        navPanel.logout();
    });

    // spec 1
    it('should be created via the New Quote button', function () {
        createNewQuote();
        verifySavedGeneralInfo();
        verifyOrderTabDetails();
        chooseCustomer();
        getExpectedCustomerDetails();
        verifyPresenceOfQuoteSummaryTab();
        verifyCustomerDetailsInCustomerTab();
        verifyCustomerDetailsInOrderTab();
        verifyPresenceOfConvertToOrderBtnInSummaryTab();
        verifyCustomerDetailsInSummaryTab();
    });

    // spec 2
    it('should be searchable in Order Search tab', function () {
        // search for the quote
        searchTab.searchFor(newOrderNumber)
            .findRowWithOrderNumber(newOrderNumber);

        // verify row details
        expect(searchTab.getRowAE()).toEqual(aeName);
        expect(searchTab.getRowSC()).toEqual(scName);
        expect(searchTab.getRowOrderNumberAndTitle()).toContain(newOrderNumber);
        expect(searchTab.getRowOrderNumberAndTitle()).toContain(orderName);
        expect(searchTab.getRowCustomerName()).toContain(customerName);
        expect(searchTab.getRowStoreCode()).toEqual(customerStore);
        expect(searchTab.getRowInHands()).toEqual(reqInHands);
        expect(searchTab.getRowFirmInHands()).toEqual(firmInHands);
        expect(searchTab.getRowStatus()).toEqual(OrderStatus.quote);
        expect(searchTab.rowShowsMultiFlag()).toBe(multiValue);
        expect(searchTab.rowShowsRushFlag()).toBe(rushValue);
        expect(searchTab.getRowCreateDateTime()).toEqual(orderCreateDateTime.toString());
    });


    // utility methods
    var setOrderCreateDateTime = function () {
        orderCreateDateTime = new Date();
        orderCreateDateTime.setSeconds(0);
    };

    var verifyOrderTabDetails = function () {
        orderTab.getOrderNumber().then(function (text) {
            newOrderNumber = text;
            console.log("Order Number of newly created quote = " + newOrderNumber);
        });

        expect(orderTab.getOrderName()).toEqual(orderName);
        expect(orderTab.getOrderStatus()).toEqual(OrderStatus.quote);
        expect(orderTab.getReqInHands()).toEqual(reqInHands);
        expect(orderTab.getFirmInHands()).toEqual(firmInHands);
        expect(orderTab.getAE()).toEqual(aeName);
        expect(orderTab.getSC()).toEqual(scName);
        expect(orderTab.getOrderNumber()).toMatch("\\d{5}");
        expect(orderTab.showsMultiIcon()).toBe(multiValue);
        expect(orderTab.showsRushIcon()).toBe(rushValue);
    };

    var verifySavedGeneralInfo = function () {
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
    };

    var fillUpGeneralForm = function () {
        generalForm.selectOC(ocName)
            .typeOrderName(orderName)
            .typeCustomerOrderName(customerOrderName)
            .typeDescription(description)
            .pickShipDate(shipDate)
            .pickReqInHands(reqInHands)
            .pickFirmInHands(firmInHands)
            .selectRush(rushValue)
            .selectMulti(multiValue)
            .selectAE(aeName)
            .selectSC(scName);
    };

    var createNewQuote = function () {
        searchTab.clickNewQuote();
        fillUpGeneralForm();
        generalForm.clickCreateOrder();
        setOrderCreateDateTime();
        generalTab.click();
    };

    var chooseCustomer = function () {
        customerTab.click()
            .selectCustomerBySap(customerSap);
    };

    var verifyCustomerDetailsInCustomerTab = function () {
        expect(customerTab.getSapNumber()).toEqual(customerSap);
    };

    var getExpectedCustomerDetails = function () {
        customerName = customerTab.getName();
        customerEmail = customerTab.getEmail();
        customerPhone = customerTab.getPhone();
        customerStore = customerTab.getStore();
        customerCompany = customerTab.getCompany();
        billingAddress = customerTab.getBillingAddress();
    };

    var verifyCustomerDetailsInOrderTab = function () {
        expect(orderTab.getStoreCode()).toEqual(customerStore);
        expect(orderTab.getCustomerName()).toEqual(customerName);
    };

    var verifyPresenceOfConvertToOrderBtnInSummaryTab = function () {
        summaryTab.click();
        expect(summaryTab.convertToOrderBtnDisplayed()).toBeTruthy();
    };

    var verifyCustomerDetailsInSummaryTab = function () {
        expect(customerSummary.isCompleted()).toBeTruthy();
        expect(customerSummary.getName()).toEqual(customerName);
        expect(customerSummary.getSapNumber()).toEqual(customerSap);
        expect(customerSummary.getEmail()).toEqual(customerEmail);
        expect(customerSummary.getBillingAddress()).toEqual(billingAddress);
    };

    var verifyPresenceOfQuoteSummaryTab = function () {
        expect(quoteTab.isPresent()).toBeTruthy();
    };
});