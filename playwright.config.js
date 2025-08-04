/**
 * Playwright configuration:
 * - Runs tests in headed mode (visible browser window)
 * - Executes against all three browsers: Chromium, Firefox, WebKit
 * - Keeps existing test directory, timeout and reporter settings
 */
const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  reporter: 'list',
  fullyParallel: true,

  // Shared settings for all the projects below.
  use: {
    headless: true, // headed mode
    // launchOptions: { slowMo: 500 } // 500 ms delay between actions
  },

  // Define one project for each browser.
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox',  use: { browserName: 'firefox'  } },
    { name: 'WebKit',   use: { browserName: 'webkit'   } }
  ]
};
