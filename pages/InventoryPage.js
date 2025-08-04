class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartButton = page.locator('#shopping_cart_container');
    }

    async addItemToCart(itemName) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await item.locator('button').click();
    }

    async goToCart() {
        await this.cartButton.click();
    }
}

module.exports = { InventoryPage };
