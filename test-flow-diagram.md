# Test Flow Diagram

```mermaid
flowchart TD
    subgraph Tests
        login["loginTests.spec.js"]
        inventory["inventoryItemsTests.spec.js"]
        checkout["itemsCheckouttests.spec.js"]
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

## UML Class Diagram (Minimal for Mermaid compatibility)

```mermaid
classDiagram
    class LoginTests { }
    class InventoryItemsTests { }
    class ItemsCheckoutTests { }
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

_Note: If errors persist, your Mermaid parser/editor may have custom restrictions. You can further simplify by removing all arrows and only listing class names._
