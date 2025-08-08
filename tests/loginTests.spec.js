const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const config = require("../config.json");
const data = require("../test-data/loginTests.data.json");

test.describe("Login Tests", () => {
  test.describe.configure({ tags: ['smoke'] });
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(config.baseUrl);
    testInfo.loginPage = new LoginPage(page);
  });

  data.users.forEach(({ username, password, valid }) => {
    test(`[smoke] login with "${username}" and password "${password}" should ${valid ? "succeed" : "fail"}`, async ({ page }, testInfo) => {
      const loginPage = testInfo.loginPage;
      await loginPage.login(username, password);

      if (valid) {
        const inventoryPage = new InventoryPage(page);
        await expect(inventoryPage.inventoryList).toBeVisible();
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
      }
    });
  });
});
