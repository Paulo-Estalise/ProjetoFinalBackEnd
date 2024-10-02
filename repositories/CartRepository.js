const CartDAO = require('../dao/CartDAO');

class CartRepository {
    constructor() {
        this.cartDAO = new CartDAO();
    }

    async getCartById(cartId) {
        return this.cartDAO.getCartById(cartId);
    }

    async updateCart(cartId, products) {
        return this.cartDAO.updateCart(cartId, products);
    }

    async clearCart(cartId) {
        return this.cartDAO.clearCart(cartId);
    }
}

module.exports = CartRepository;
