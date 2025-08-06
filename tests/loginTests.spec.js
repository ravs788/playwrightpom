const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const config = require("../config.json");

test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(config.baseUrl);
    // Expose LoginPage on testInfo for use in tests
    testInfo.loginPage = new LoginPage(page);
  });

  test("valid login should succeed", { tag: '@smoke' }, async ({ page }, testInfo) => {
    const loginPage = testInfo.loginPage;
    await loginPage.login(
      config.users.validUser.username,
      config.users.validUser.password
    );

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test("invalid login should show error", { tag: '@smoke' }, async ({ page }, testInfo) => {
    const loginPage = testInfo.loginPage;
    await loginPage.login(
      config.users.invalidUser.username,
      config.users.invalidUser.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
