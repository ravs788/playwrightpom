class InventoryItem {
    constructor(name, price = null, id = null) {
        this.name = name;
        this.price = price;
        this.id = id;
    }
}

module.exports = { InventoryItem };
