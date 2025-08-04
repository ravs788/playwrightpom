class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.zipCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
    }

    async fillCheckoutInfo(firstName, lastName, zipCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}

module.exports = { CheckoutPage };
