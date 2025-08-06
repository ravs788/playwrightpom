const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const config = require("../config.json");

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
  await page.goto(config.baseUrl);
  await loginPage.login(
    config.users.validUser.username,
    config.users.validUser.password
  );

  const inventoryPage = new InventoryPage(page);

  // Collect inventory item names using page object
  const itemNames = await inventoryPage.getInventoryItemNames();

  // Compare sets (order-independent)
  expect(itemNames.sort()).toEqual(expectedItems.sort());
});
