# Test Flow Diagram

```mermaid
flowchart TD
    subgraph Tests
        login["loginTests.spec.js"]
        inventory["inventoryItemsTests.spec.js"]
        checkout["itemsCheckoutTests.spec.js"]
        loginParam[":parametrized by users"]
        loginTag["@smoke"]
        inventoryTag["@regression"]
        checkoutTag["@regression"]
        login --> loginParam
        login --> loginTag
        inventory --> inventoryTag
        checkout --> checkoutTag
    end

    subgraph Pages
        loginPage["LoginPage.js"]
        inventoryPage["InventoryPage.js"]
        cartPage["CartPage.js"]
        checkoutPage["CheckoutPage.js"]
    end

    subgraph Models
        user["User.js"]
        inventoryItem["InventoryItem.js"]
        checkoutInfo["CheckoutInfo.js"]
    end

    login --> loginPage
    loginPage --> user
    inventory --> inventoryPage
    inventoryPage --> inventoryItem
    checkout --> checkoutPage
    checkoutPage --> checkoutInfo
```

**Diagram notes:**
- loginTests.spec.js generates multiple tests via parameterization (looping over a users array).
- Tag-based filtering: login tests use '@smoke' in titles; inventory and checkout tests use '@regression'.

## UML Class Diagram (Minimal for Mermaid compatibility)

```mermaid
classDiagram
    class LoginTests {
      <<parameterized>>
      tag: @smoke
    }
    class InventoryItemsTests {
      tag: @regression
    }
    class ItemsCheckoutTests {
      tag: @regression
    }
    class LoginPage { }
    class InventoryPage { }
    class CartPage { }
    class CheckoutPage { }
    class User { }
    class InventoryItem { }
    class CheckoutInfo { }

    LoginTests --> LoginPage
    InventoryItemsTests --> InventoryPage
    ItemsCheckoutTests --> CheckoutPage
    LoginPage --> User
    InventoryPage --> InventoryItem
    CheckoutPage --> CheckoutInfo
```

**UML notes:**
- `<<parameterized>>` indicates that LoginTests are generated from user data.
- "tag: ..." indicates what tag is present in test titles for Playwright's `--grep` filter.
- Include tags directly in the first argument (test title) string for Playwright CLI filtering.

_Note: If errors persist, your Mermaid parser/editor may have custom restrictions. You can further simplify by removing all arrows and only listing class names._
