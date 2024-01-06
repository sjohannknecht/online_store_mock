const shoppingCartProto = {

    getQuantityAll() {
        return Object.values(this.items).reduce(
            (accumulator, currentValue) => currentValue + accumulator,
            0);
    },

    getQuantityByProductId(productId) {
        if (!Object.prototype.hasOwnProperty.call(this.items, productId.toString())) {
            return 0;
        }
        return this.items[productId];
    },

    getProductIds() {
        return Object.keys(this.items);
    },

    getItems() {
        return this.items;
    },

    add(productId, quantity) {
        if (Object.prototype.hasOwnProperty.call(this.items, productId.toString())) {
            this.items[productId] += Number(quantity);
        } else {
            this.items[productId] = Number(quantity);
        }
        return this;
    },

    increment(productId) {
        if (!Object.prototype.hasOwnProperty.call(this.items, productId.toString())) {
            throw new Error("Product does not exist in Shopping Cart");
        }
        this.items[productId]++;
        return this;
    },

    decrement(productId) {
        if (!Object.prototype.hasOwnProperty.call(this.items, productId.toString())) {
            throw new Error("Product does not exist in Shopping Cart");
        }
        if (--this.items[productId] === 0) {
            delete this.items[productId];
        }
        return this;
    },

    clear(productId) {
        if (Object.prototype.hasOwnProperty.call(this.items, productId.toString())) {
            delete this.items[productId];
        }
        return this;
    }
}

function shoppingCartFactory(existingCart = {items: {}}) {
    const newCart = Object.create(shoppingCartProto);
    newCart.items = {...existingCart.items};
    return newCart;
}

export default shoppingCartFactory;