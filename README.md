# Playwright Test Suite – SauceDemo

This repository contains an automated end-to-end test suite for the [saucedemo.com](https://www.saucedemo.com) sample shop, built with **[Playwright](https://playwright.dev)** in JavaScript.

![Playwright](https://img.shields.io/badge/Playwright-E2E-green?logo=playwright)
![Node](https://img.shields.io/badge/Node.js-%3E=18.x-blue?logo=node.js)

---

## 📁 Project Structure

| Path | Purpose |
|------|---------|
| `tests/` | Playwright spec files (`*.spec.js`) |
| `pages/` | Page-object models (POMs) for each site page |
| `test-flow-diagram.md` | Mermaid flowchart + UML showing test and page relationships |
| `playwright-report/` | HTML reports generated after each run |
| `.gitignore` | Git ignore rules (see below) |

```
.
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   └── LoginPage.js
├── tests/
│   ├── saucedemo.spec.js
│   ├── multiItemsCheckout.spec.js
│   └── inventoryItems.spec.js
└── ...
```

---

## 🛠️ Prerequisites

* **Node.js 18 LTS or later**
* npm 9+ (bundled with Node)

---

## � Test Tagging Strategy

Tests are tagged to manage suites:

* `@smoke` — fast, critical checks (e.g. high-priority UI flow)
* `@regression` — coverage for all major business logic

A test can have both tags.
Add tags in the test title:  
```js
test('should do important thing {@smoke} {@regression}', async () => { ... });
```

---

## 🚀 Running Tests

**All test files execute in parallel** as configured in `playwright.config.js` (`fullyParallel: true`).  
Within a file, tests run sequentially unless you use `test.describe.parallel()`.

#### Run the full test suite

```bash
npm test           # (cleans output, then runs all specs)
```

#### Run only regression tests

```bash
npm run test:regression
```

#### Run only smoke tests

```bash
npx playwright test --grep '@smoke'
```

#### Running a Specific Spec

```bash
npx playwright test tests/saucedemo.spec.js
```

#### Debug/Headed Mode

```bash
npx playwright test --headed --debug
```

---

## 📊 Reports & Artifacts

* **HTML Report**: Generated in `playwright-report/`.
* **Trace Viewer**: On test failure, inspect details with  
  `npx playwright show-trace test-results/**/trace.zip`.
* **Screenshots on Failure**: PNGs saved automatically for failed steps in `test-results/`.

---

## ♻️ Output Folder Cleanup

Before every test run, `test-results/` and `playwright-report/` are auto-deleted
by the `clean` npm script.

---

## 🤖 Continuous Integration

GitHub Actions automates test selection through reusable workflows:

| Workflow                   | Trigger          | Tag Filter     |
|----------------------------|------------------|---------------|
| `.github/workflows/pr-tests.yml`   | On PR to `main`   | `@smoke`      |
| `.github/workflows/merge-tests.yml`| On push to `main` | `@regression` |

---

## 📐 Diagrams

See **`test-flow-diagram.md`** for:

1. Navigation flowchart of all spec-file/page-object interactions
2. UML class diagram for test/page relationships

Both use Mermaid and are VS Code-/GitHub-friendly.

---

## 📝 .gitignore Highlights

The repo’s `.gitignore` excludes:

* `node_modules/`, OS junk files (`.DS_Store`, `Thumbs.db`)
* Playwright artifacts (`test-results/`, `playwright-report/`, traces)
* IDE settings (`.vscode/`, `.idea/`)
* Build outputs (`dist/`, `build/`)
* Environment files (`.env*`)

---

## 🧪 Example Tests

* Two smoke tests in `saucedemo.spec.js` (one deliberately fails to demo screenshot)
* Standalone regression: `inventoryItems.spec.js` verifies inventory items

---

## 🤝 Contributing

Feel free to open issues or PRs! Ensure all tests pass before pushing.

---

## 📄 License

This project is licensed under the MIT License.
