"use strict";
var LoginPage = require('../pages/login.page.js');
var NavPanel = require('../pages/navpanel');
var OrderSearchTab = require('../pages/orders-module/tab-level/order.search.tab');
var GeneralInfoForm = require('../pages/orders-module/general-tab/general.info.form');
var User = require('../helpers/user.js');
var BaseUrl = require('../helpers/base.urls');
var GeneralTab = require('../pages/orders-module/general-tab/general.tab');
var OrderTab = require('../pages/orders-module/tab-level/order.tab');
var OrderStatuses = require('../helpers/order.statuses');
var CustomerTab = require('../pages/orders-module/customer.tab');

describe('New Quote', function () {
    // pages
    var loginPage = new LoginPage();
    var navPanel = new NavPanel();
    var searchTab = new OrderSearchTab();
    var generalForm = new GeneralInfoForm();
    var generalTab = new GeneralTab();
    var orderTab = new OrderTab();
    var customerTab = new CustomerTab();

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

        // test data: customer details
        var customerName;
        var customerSap = "0001365875";
        var customerEmail;
        var customerPhone;
        var customerStore;
        var customerCompany;
        var billingAddress;

        // create new quote
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

        // verify saved general info
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

        // verify order tab details
        orderNumber = orderTab.getOrderNumber();
        expect(orderTab.getOrderName()).toEqual(orderName);
        expect(orderTab.getOrderStatus()).toEqual(OrderStatuses.quote);
        expect(orderTab.getReqInHands()).toEqual(reqInHands);
        expect(orderTab.getFirmInHands()).toEqual(firmInHands);
        expect(orderTab.getAE()).toEqual(aeName);
        expect(orderTab.getSC()).toEqual(scName);
        expect(orderTab.getOrderNumber()).toMatch("\\d{5}");

        // choose customer
        customerTab.click()
            .selectCustomerBySap(customerSap);

        // get expected customer details
        customerName = customerTab.getName();
        customerEmail = customerTab.getEmail();
        customerPhone = customerTab.getPhone();
        customerStore = customerTab.getStore();
        customerCompany = customerTab.getCompany();
        billingAddress = customerTab.getBillingAddress();

        // verify customer details in Customer tab
        expect(customerTab.getSapNumber()).toEqual(customerSap);

        // verify customer details in order tab
        expect(orderTab.getStoreCode()).toEqual(customerStore);
        expect(orderTab.getCustomerName()).toEqual(customerName);

        // todo verify customer details in Summary tab

    });

    afterEach(function () {
        navPanel.logout();
    });
});