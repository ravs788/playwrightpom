/**
 * Playwright configuration:
 * - Runs tests in headed mode (visible browser window)
 * - Executes against all three browsers: Chromium, Firefox, WebKit
 * - Keeps existing test directory, timeout and reporter settings
 */
const { devices } = require("@playwright/test");
const { trace } = require("console");

module.exports = {
  testDir: "./tests",
  outputDir: "tests-results",
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000,
    tohaveScreenshot: {
      maxDiffPixels: 10, // Allow 1% difference in screenshots
    },
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.1, // Allow 1% difference in snapshots
    },
  },
  reporter: "list",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined, // Use 1 worker in CI to avoid parallel issues
  reporter: [
    ["html", { open: "never" }], // Generate HTML report, do not open automatically
    ["list"], // Use list reporter for console output
  ],
  // Shared settings for all the projects below.
  use: {
    headless: !(
      process.env.DEBUG === "true" ||
      typeof process.env.PWDEBUG !== "undefined"
    ), // headed mode in debug
    // launchOptions: { slowMo: 500 } // 500 ms delay between actions
    trace: "on-first-retry", // Enable tracing for debugging
  },

  // Define one project for each browser.
  projects: process.env.CI
    ? [
        { name: "Chromium", use: { browserName: "chromium" } },
        { name: "Firefox", use: { browserName: "firefox" } }
      ]
    : [
        { name: "Chromium", use: { browserName: "chromium" } },
        { name: "Firefox", use: { browserName: "firefox" } },
        { name: "WebKit", use: { browserName: "webkit" } }
      ],
};
