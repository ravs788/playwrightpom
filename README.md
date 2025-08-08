# Playwright Test Suite – SauceDemo

<!-- Build Status Badges: Update file names if workflow names change -->
[![Regression Workflow](https://github.com/ravs788/playwright-test-saucedemo/actions/workflows/regression.yml/badge.svg)](https://github.com/ravs788/playwright-test-saucedemo/actions/workflows/regression.yml)
[![Reusable Test Template Workflow](https://github.com/ravs788/playwright-test-saucedemo/actions/workflows/reusable-test-template.yml/badge.svg)](https://github.com/ravs788/playwright-test-saucedemo/actions/workflows/reusable-test-template.yml)
[![Playwright Regression Template Workflow](https://github.com/ravs788/playwright-test-saucedemo/actions/workflows/playwright-regression-template.yml/badge.svg)](https://github.com/ravs788/playwright-test-saucedemo/actions/workflows/playwright-regression-template.yml)
![Node](https://img.shields.io/badge/Node.js-%3E=18.x-blue?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green)
![Playwright](https://img.shields.io/badge/Playwright-E2E-green?logo=playwright)

---

**Repository**: [github.com/ravs788/playwright-test-saucedemo](https://github.com/ravs788/playwright-test-saucedemo)  
**Issues**: [Open Issues](https://github.com/ravs788/playwright-test-saucedemo/issues)  
**Pull Requests**: [View PRs](https://github.com/ravs788/playwright-test-saucedemo/pulls)  
**Actions**: [GitHub Actions Workflow](https://github.com/ravs788/playwright-test-saucedemo/actions)

---

## 📊 Summary of Features

_Feature list and roadmap is maintained in [additional-features.txt](additional-features.txt). The table below summarizes current status and maps directly to the entries in that file. When implementing new features or updating capabilities, ensure both `README.md` and `additional-features.txt` stay in sync._

| Feature                                         | Status     |
|-------------------------------------------------|------------|
| Test Coverage Reporting                         | ❌ Not yet   |
| Advanced Reporting                              | ✅ Implemented (Playwright HTML Report, artifact upload) |
| Parallel Execution & Matrix Builds              | ❌ Not yet   |
| Visual Regression Testing                       | ❌ Not yet   |
| Accessibility Checks (a11y)                     | ❌ Not yet   |
| API Testing                                     | ❌ Not yet   |
| Continuous Feedback (Slack/Email/etc.)          | ❌ Not yet   |
| Test Tagging & Filtering                        | ✅ Implemented (@smoke, @regression via titles) |
| Data-Driven & Parameterized Testing             | ✅ Implemented (e.g. login tests) |
| Test Flake Detection/Handling                   | ❌ Not yet   |
| Performance/Network Profiling                   | ❌ Not yet   |
| Network Request Mocking/Intercepts              | ❌ Not yet   |
| Test Artifacts Archival                         | ✅ Implemented (HTML report upload) |
| Third-Party Integration (Jira/TestRail/etc.)    | ❌ Not yet   |
| Automatic PR Validation (via GitHub Actions)    | ✅ Implemented |

_See [additional-features.txt](additional-features.txt) for details on each feature, description, and enhancement ideas._

---

![Playwright](https://img.shields.io/badge/Playwright-E2E-green?logo=playwright)
![Node](https://img.shields.io/badge/Node.js-%3E=18.x-blue?logo=node.js)

---

## 📁 Project Structure

| Path                 | Purpose                                     |
|----------------------|---------------------------------------------|
| `tests/`             | Playwright spec files (`*.spec.js`)         |
| `pages/`             | Page-object models (POMs) for each site page|
| `models/`            | Domain/data model classes (User, Item, etc.)|
| `.github/workflows/` | CI/CD and scheduled regression workflows    |
| `test-flow-diagram.md` | Mermaid flowchart + UML of tests/pages    |
| `playwright-report/` | HTML reports generated after each run       |
| `.gitignore`         | Git ignore rules (see below)                |

```
.
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   └── LoginPage.js
├── models/
│   ├── User.js
│   ├── InventoryItem.js
│   └── CheckoutInfo.js
├── tests/
│   ├── loginTests.spec.js
│   ├── inventoryItemsTests.spec.js
│   └── itemsCheckouttests.spec.js
├── .github/
│   └── workflows/
│       ├── regression.yml
│       └── playwright-regression-template.yml
└── ...
```

---

## 🛠️ Prerequisites

* **Node.js 18 LTS or later**
* npm 9+ (bundled with Node)

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm ci

# 2. Run the full test suite
npx playwright test

# 3. Open the last HTML report
npx playwright show-report
```

### Running a Single Spec

```bash
npx playwright test tests/loginTests.spec.js
```

---

## 🏷️ Test Tagging & Filtering

Tests are tagged for filtering by including `@smoke`, `@regression`, etc. _directly in their test title string_:

```js
test('login with valid credentials @smoke', async ({ ... }) => { ... });
test('should handle checkout failure @regression', async () => { ... });
```

To run only regression tests:

```bash
npx playwright test --grep "@regression"
```

To run smoke tests:

```bash
npx playwright test --grep "@smoke"
```

_Note:_ Playwright's `--grep` flag will only match tags that are present in the test's title (the first argument string). Be sure to add `@smoke` or `@regression` into your test title wherever filtering by tag is desired.

---

## 🧪 Parameterized Tests

Some test suites (such as loginTests.spec.js) use data-driven parameterization to generate multiple tests from a data array. This is done by looping over the data and dynamically creating a test for each parameter set:

```js
const users = [
  { username: 'standard_user', password: 'secret_sauce', valid: true },
  { username: 'locked_out_user', password: 'secret_sauce', valid: false },
  // ...more
];

users.forEach(({ username, password, valid }) => {
  test(
    `login with "${username}" and password "${password}" should ${valid ? "succeed" : "fail"} @smoke`,
    async ({ page }) => {
      // ...test logic...
    }
  );
});
```

- Each generated test will appear in the Playwright report and CLI output as a separate test case.
- You can include tags (like `@smoke`) directly in the dynamically generated test title, so these parameterized cases can also be filtered with `--grep "@smoke"`.

---

## 📦 Models & Page Object Model

- **models/**: Reusable domain classes (e.g. User, InventoryItem, CheckoutInfo) structure input/test data.
- **pages/**: Implements the Page Object Model: each class (e.g. LoginPage) encapsulates all locators and UI interactions for a given page. Test files never interact with raw locators directly.

---

## 🤖 CI & Scheduled Regression

- **GitHub Actions** are set up to run `@regression` tests every day at 7 AM IST (1:30 AM UTC).
- The workflow reuses the [`playwright-regression-template.yml`](.github/workflows/playwright-regression-template.yml), promoting DRY job configs.
- You can manually trigger a run via the Actions tab if needed.

---

## 📊 Reports & Artifacts

- **HTML Report**: Generated in `playwright-report/`
- **Trace Viewer**: On test failures, see `test-results/` for Playwright traces  
  (`npx playwright show-trace <trace.zip>`)

---

## 📐 Diagrams

See **`test-flow-diagram.md`** for:
1. A **navigation flowchart** mapping test execution.
2. A **UML diagram** illustrating test files, models, and page objects.

Both are written in Mermaid and render on GitHub / VS Code preview.

---

## 📝 .gitignore Highlights

The repo’s `.gitignore` excludes:
* `node_modules/`, OS junk files (`.DS_Store`, `Thumbs.db`)
* Playwright artifacts (`test-results/`, `playwright-report/`, traces)
* IDE settings (`.vscode/`, `.idea/`)
* Build outputs (`dist/`, `build/`)
* Environment files (`.env*`)

---

## 🤝 Contributing

Open issues or PRs! Run `npx playwright test` before submitting. Keep commits atomic.

---

## 📄 License

This project is licensed under the MIT License.
