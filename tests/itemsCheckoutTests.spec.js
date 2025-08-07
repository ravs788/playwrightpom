const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");
const config = require("../config.json");

test.describe("Items and Checkout Flow", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(config.baseUrl);
    testInfo.loginPage = new LoginPage(page);
    testInfo.inventoryPage = new InventoryPage(page);
    testInfo.cartPage = new CartPage(page);
    testInfo.checkoutPage = new CheckoutPage(page);
    await testInfo.loginPage.login(
      config.users.validUser.username,
      config.users.validUser.password
    );
  });

  test(
    "should complete the checkout process",
    { tag: "@regression" },
    async ({}, testInfo) => {
      const { inventoryPage, cartPage, checkoutPage } = testInfo;
      await inventoryPage.addItemToCart("Sauce Labs Backpack");
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCheckoutInfo("John", "Doe", "12345");
      await checkoutPage.finishCheckout();

      await expect(checkoutPage.completeHeader).toContainText(
        "Thank you for your order!"
      );
    }
  );

  test(
    "should add multiple items and complete full checkout flow",
    { tag: "@regression" },
    async ({}, testInfo) => {
      const { inventoryPage, cartPage, checkoutPage } = testInfo;
      const products = [
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
      ];
      for (const product of products) {
        await inventoryPage.addItemToCart(product);
      }
      await inventoryPage.goToCart();
      await expect(cartPage.cartItems).toHaveCount(products.length);

      await cartPage.proceedToCheckout();
      await checkoutPage.fillCheckoutInfo("Alice", "Smith", "98765");
      await expect(cartPage.cartItems).toHaveCount(products.length);

      await checkoutPage.finishCheckout();
      await expect(checkoutPage.completeHeader).toContainText(
        "Thank you for your order!"
      );
    }
  );
});
