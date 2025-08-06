# Playwright Test Suite – SauceDemo

This repository contains an automated end-to-end test suite for the [saucedemo.com](https://www.saucedemo.com) sample shop, built with **[Playwright](https://playwright.dev)** in JavaScript.

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

Tests are annotated with tags via the [Playwright annotation object syntax](https://playwright.dev/docs/test-annotations):

```js
test('description', { tag: '@smoke' }, async ({ ... }) => { ... });
test('...', { tag: '@regression' }, async () => { ... });
```

To run only regression tests:

```bash
npx playwright test --grep "@regression"
```

To run smoke tests:

```bash
npx playwright test --grep "@smoke"
```

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
