const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

test("should complete the checkout process {@smoke} {@regression}", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto("https://www.saucedemo.com/");

  await loginPage.login("standard_user", "secret_sauce");
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInfo("John", "Doe", "12345");
  await checkoutPage.finishCheckout();

  await expect(page.locator(".complete-header")).toContainText(
    "Thank you for your order!"
  );
});
