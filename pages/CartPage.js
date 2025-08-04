class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };
