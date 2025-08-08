const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");
const config = require("../config.json");
const data = require("../test-data/itemsCheckoutTests.data.json");

test.describe("Items and Checkout Flow", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(config.baseUrl);
    testInfo.loginPage = new LoginPage(page);
    testInfo.inventoryPage = new InventoryPage(page);
    testInfo.cartPage = new CartPage(page);
    testInfo.checkoutPage = new CheckoutPage(page);
    await testInfo.loginPage.login(
      data.validUser.username,
      data.validUser.password
    );
  });

  test(
    "should complete the checkout process @regression",
    async ({}, testInfo) => {
      const { inventoryPage, cartPage, checkoutPage } = testInfo;
      // Get test data for this test
      const testData = data.tests.find(t => t.name === "should complete the checkout process");
      await inventoryPage.addItemToCart(testData.products[0]);
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCheckoutInfo(
        testData.checkoutInfo.firstName,
        testData.checkoutInfo.lastName,
        testData.checkoutInfo.postalCode
      );
      await checkoutPage.finishCheckout();

      await expect(checkoutPage.completeHeader).toContainText(
        "Thank you for your order!"
      );
    }
  );

  test(
    "should add multiple items and complete full checkout flow @regression",
    async ({}, testInfo) => {
      const { inventoryPage, cartPage, checkoutPage } = testInfo;
      // Get test data for this test
      const testData = data.tests.find(t => t.name === "should add multiple items and complete full checkout flow");
      for (const product of testData.products) {
        await inventoryPage.addItemToCart(product);
      }
      await inventoryPage.goToCart();
      await expect(cartPage.cartItems).toHaveCount(testData.products.length);

      await cartPage.proceedToCheckout();
      await checkoutPage.fillCheckoutInfo(
        testData.checkoutInfo.firstName,
        testData.checkoutInfo.lastName,
        testData.checkoutInfo.postalCode
      );
      await expect(cartPage.cartItems).toHaveCount(testData.products.length);

      await checkoutPage.finishCheckout();
      await expect(checkoutPage.completeHeader).toContainText(
        "Thank you for your order!"
      );
    }
  );
});
