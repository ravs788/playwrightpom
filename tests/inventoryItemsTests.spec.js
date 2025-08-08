const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const config = require("../config.json");
const data = require("../test-data/inventoryItemsTests.data.json");

test.describe("Inventory Items", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(config.baseUrl);
    const loginPage = new LoginPage(page);
    await loginPage.login(
      data.validUser.username,
      data.validUser.password
    );
    testInfo.inventoryPage = new InventoryPage(page);
  });

  test("should list all expected inventory items after login @regression", async ({}, testInfo) => {
    const expectedItems = data.expectedItems;

    const itemNames = await testInfo.inventoryPage.getInventoryItemNames();
    expect(itemNames.sort()).toEqual(expectedItems.sort());
  });
});
