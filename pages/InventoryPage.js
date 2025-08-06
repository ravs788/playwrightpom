class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryList = page.locator('.inventory_list');
        this.inventoryItemNames = page.locator('.inventory_item_name');
        this.cartButton = page.locator('#shopping_cart_container');
    }

    async addItemToCart(itemName) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await item.locator('button').click();
    }

    async goToCart() {
        await this.cartButton.click();
    }

    async getInventoryItemNames() {
        return await this.inventoryItemNames.allInnerTexts();
    }
}

module.exports = { InventoryPage };
