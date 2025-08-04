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
│   └── multiItemsCheckout.spec.js
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
npx playwright test tests/saucedemo.spec.js
```

### Headed / Debug Mode

```bash
npx playwright test --headed --debug
```

---

## 📊 Reports & Artifacts

* **HTML Report**: Generated in `playwright-report/`.
* **Trace Viewer**: If a test fails, traces are stored in `test-results/` and can be opened with  
  `npx playwright show-trace <trace.zip>`.

---

## 📐 Diagrams

Refer to **`test-flow-diagram.md`** for:

1. A **navigation flowchart** mapping test execution.
2. A **UML class diagram** illustrating test files and page objects.

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

Feel free to open issues or PRs! Ensure `npm test` passes and keep commits atomic.

---

## 📄 License

This project is licensed under the MIT License.
