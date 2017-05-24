"use strict";
var LoginPage = require('../../pages/login.page.js');
var NavPanel = require('../../pages/navpanel');
var OrderSearchTab = require('../../pages/orders-module/tab-level/order.search.tab');
var GeneralInfoForm = require('../../pages/orders-module/general-tab/general.info.form');
var User = require('../../helpers/user.js');
var BaseUrl = require('../../helpers/base.urls');
var GeneralTab = require('../../pages/orders-module/general-tab/general.tab');
var OrderTab = require('../../pages/orders-module/tab-level/order.tab');
var OrderStatuses = require('../../helpers/order.statuses');
var CustomerTab = require('../../pages/orders-module/customer.tab');
var SummaryTab = require('../../pages/orders-module/summary-tab/summary.tab');
var CustomerSection = require('../../pages/orders-module/summary-tab/customer.section');

describe('Quotes', function () {
    // pages
    var loginPage = new LoginPage();
    var navPanel = new NavPanel();
    var searchTab = new OrderSearchTab();
    var generalForm = new GeneralInfoForm();
    var generalTab = new GeneralTab();
    var orderTab = new OrderTab();
    var customerTab = new CustomerTab();
    var summaryTab = new SummaryTab();
    var customerSummary = new CustomerSection();

    // suite variables
    var orderNumber = '13139';

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
    var orderCreateDate = new Date("05/22/2017");

    // test data: customer details
    var customerName = "NANCY MASON";
    var customerSap = "0001365875";
    var customerEmail = "NONE@ECOMPANYSTORE.COM";
    var customerPhone = "678-942-3100";
    var customerStore = "CIG";
    var customerCompany = "ECS TEST DATA";
    var billingAddress;

    /**
     * Login as AE and go to order search tab
     */
    beforeEach(function () {
        browser.get(BaseUrl.orders);
        loginPage.login(User.testAe2.username, User.password);
        navPanel.goToOrders()
            .goToSearchTab();
    });

    /**
     * Logout
     */
    afterEach(function () {
        navPanel.logout();
    });

    xit('should be created via the New Quote button', function () {
        createNewQuote();
        verifySavedGeneralInfo();
        verifyOrderTabDetails();
        chooseCustomer();
        getExpectedCustomerDetails();
        verifyCustomerDetailsInCustomerTab();
        verifyCustomerDetailsInOrderTab();
        verifyPresenceOfConvertToOrderBtnInSummaryTab();
        verifyCustomerDetailsInSummaryTab();
    });

    it('should be searchable in Order Search tab', function () {
        // search for the quote
        searchTab.searchFor(orderNumber)
            .findRowWithOrderNumber(orderNumber);

        // verify row details
        expect(searchTab.getRowAE()).toEqual(aeName);
        expect(searchTab.getRowSC()).toEqual(scName);
        expect(searchTab.getRowOrderNumberAndTitle()).toContain(orderNumber);
        expect(searchTab.getRowOrderNumberAndTitle()).toContain(orderName);
        expect(searchTab.getRowCustomerName()).toContain(customerName);
        expect(searchTab.getRowStoreCode()).toEqual(customerStore);
        expect(searchTab.getRowInHands()).toEqual(reqInHands);
        expect(searchTab.getRowFirmInHands()).toEqual(firmInHands);
        expect(searchTab.getRowStatus()).toEqual(OrderStatuses.quote);
        expect(searchTab.getRowCreateDate()).toEqual(orderCreateDate);
        expect(searchTab.rowShowsMultiFlag()).toBe(multiValue);
        expect(searchTab.rowShowsRushFlag()).toBe(rushValue);
    });

    xit('should have a Quote Summary tab', function () {
        // todo complete this
        expect(true).toBeTruthy();
    });

    // utility functions
    var verifyOrderTabDetails = function () {
        orderNumber = orderTab.getOrderNumber();
        expect(orderTab.getOrderName()).toEqual(orderName);
        expect(orderTab.getOrderStatus()).toEqual(OrderStatuses.quote);
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

    var createNewQuote = function () {
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
        orderCreateDate = new Date();
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
});