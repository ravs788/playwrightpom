const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('should add multiple items and complete full checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('https://www.saucedemo.com/');

  // Login
  await loginPage.login('standard_user', 'secret_sauce');

  // Add multiple products
  const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
  for (const product of products) {
    await inventoryPage.addItemToCart(product);
  }

  // Open Cart and verify number of items
  await inventoryPage.goToCart();
  await expect(page.locator('.cart_item')).toHaveCount(products.length);

  // Proceed through checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInfo('Alice', 'Smith', '98765');

  // Verify overview page shows chosen items
  await expect(page.locator('.cart_item')).toHaveCount(products.length);

  // Finish order
  await checkoutPage.finishCheckout();

  // Verify order completion
  await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
});
