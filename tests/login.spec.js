const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const config = require("../config.json");

test("valid login should succeed {@smoke}", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto(config.baseUrl);
  await loginPage.login(
    config.users.validUser.username,
    config.users.validUser.password
  );

  const inventoryPage = new InventoryPage(page);
  // Assert successful login by checking for inventory page visibility/content
  await expect(inventoryPage.inventoryList).toBeVisible();
});

test("invalid login should show error {@smoke}", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto(config.baseUrl);
  await loginPage.login(
    config.users.invalidUser.username,
    config.users.invalidUser.password
  );

  // Assert presence of error message using page object
  await expect(loginPage.errorMessage).toBeVisible();
});
