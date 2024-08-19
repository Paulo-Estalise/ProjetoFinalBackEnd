const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        this.path = path.join(__dirname, 'data/carts.json');
        this.loadCarts();
    }

    loadCarts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } else {
            this.carts = [];
        }
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }

    getNextId() {
        return this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1;
    }

    createCart() {
        const newCart = { id: this.getNextId(), products: [] };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(id) {
        return this.carts.find(c => c.id === id);
    }

    addProductToCart(cartId, productId, quantity = 1) {
        const cart = this.getCartById(cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        this.saveCarts();
        return cart;
    }
}

module.exports = CartManager;
