const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");
const config = require("../config.json");

test("should add multiple items and complete full checkout flow {@regression}", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto(config.baseUrl);

  // Login
  await loginPage.login(
    config.users.validUser.username,
    config.users.validUser.password
  );

  // Add multiple products
  const products = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
  ];
  for (const product of products) {
    await inventoryPage.addItemToCart(product);
  }

  // Open Cart and verify number of items
  await inventoryPage.goToCart();
  await expect(cartPage.cartItems).toHaveCount(products.length);

  // Proceed through checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInfo("Alice", "Smith", "98765");

  // Verify overview page shows chosen items
  await expect(cartPage.cartItems).toHaveCount(products.length);

  // Finish order
  await checkoutPage.finishCheckout();

  // Verify order completion
  await expect(checkoutPage.completeHeader).toContainText(
    "Thank you for your order!"
  );
});
