# Test Flow Diagram

```mermaid
flowchart TD
    %% ==================== GITHUB ACTIONS =====================
    subgraph "GitHub Actions Workflows"
        PR["pr-tests.yml<br/>Trigger: PR to main<br/>Runs: @smoke tests"]
        MERGE["merge-tests.yml<br/>Trigger: push to main<br/>Runs: @regression tests"]
        TEMPLATE["reusable-test-template.yml<br/>Setup, run-tagged suite"]
    end

    %% ==================== TEST FILES =====================
    subgraph Tests
        SingleItemTest["saucedemo.spec.js"]
        MultiItemTest["multiItemsCheckout.spec.js"]
        InventoryTest["inventoryItems.spec.js"]
    end

    %% =================== PAGE OBJECTS ====================
    subgraph Pages
        LoginPage["LoginPage.js"]
        InventoryPage["InventoryPage.js"]
        CartPage["CartPage.js"]
        CheckoutPage["CheckoutPage.js"]
    end

    %% ================ CI -> TESTS TRIGGER FLOW ============
    PR -.-> SingleItemTest
    PR -.-> InventoryTest
    MERGE -.-> SingleItemTest
    MERGE -.-> MultiItemTest
    MERGE -.-> InventoryTest

    PR --> TEMPLATE
    MERGE --> TEMPLATE

    %% ================ NAVIGATION FLOW ===================
    %% --- Single-item checkout ---
    SingleItemTest --> LoginPage
    SingleItemTest --> InventoryPage
    InventoryPage --> CartPage
    CartPage --> CheckoutPage
    CheckoutPage -->|"Order complete"| SingleItemTest

    %% --- Multi-item checkout (adds loop) ---
    MultiItemTest --> LoginPage
    MultiItemTest --> InventoryPage
    InventoryPage -->|"add items*"| InventoryPage
    InventoryPage --> CartPage
    CartPage --> CheckoutPage
    CheckoutPage -->|"Order complete"| MultiItemTest

    %% --- Inventory items regression test (direct) ---
    InventoryTest --> LoginPage
    InventoryTest --> InventoryPage

    %% ====================== STYLES =======================
    classDef test fill:#C5CAE9,stroke:#303F9F,stroke-width:2px,color:#000;
    classDef page fill:#B2DFDB,stroke:#00796B,stroke-width:2px,color:#000;
    classDef ci fill:#FFE082,stroke:#F9A825,stroke-width:2px,color:#000;

    class PR,MERGE,TEMPLATE ci;
    class SingleItemTest,MultiItemTest,InventoryTest test;
    class LoginPage,InventoryPage,CartPage,CheckoutPage page;
```

## UML Class Diagram

**CI workflows:**  

- `pr-tests.yml` runs `@smoke` tests on PR to main  
- `merge-tests.yml` runs `@regression` tests on push to main  
- Both invoke `reusable-test-template.yml` for setup and execution.

```mermaid
classDiagram
    class Tests
    class LoginPage
    class InventoryPage
    class CartPage
    class CheckoutPage

    Tests --> LoginPage
    Tests --> InventoryPage
    Tests --> CartPage
    Tests --> CheckoutPage
```
