const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

test("should list all expected inventory items after login {@regression}", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  // Expected item names visible on the inventory page
  const expectedItems = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
  ];

  // Login and navigate to inventory
  await page.goto("https://www.saucedemo.com/");
  await loginPage.login("standard_user", "secret_sauce");

  // Collect inventory item names
  const itemNames = await page.locator(".inventory_item_name").allInnerTexts();

  // Compare sets (order-independent)
  expect(itemNames.sort()).toEqual(expectedItems.sort());
});
