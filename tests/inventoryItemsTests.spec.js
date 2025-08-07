const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const config = require("../config.json");

test.describe("Inventory Items", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(config.baseUrl);
    const loginPage = new LoginPage(page);
    await loginPage.login(
      config.users.validUser.username,
      config.users.validUser.password
    );
    testInfo.inventoryPage = new InventoryPage(page);
  });

  test("should list all expected inventory items after login", { tag: "@regression" }, async ({}, testInfo) => {
    const expectedItems = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Onesie",
      "Test.allTheThings() T-Shirt (Red)",
    ];

    const itemNames = await testInfo.inventoryPage.getInventoryItemNames();
    expect(itemNames.sort()).toEqual(expectedItems.sort());
  });
});
