const Cart = require('../models/Cart');  // Assuming Mongoose schema

class CartDAO {
    async getCartById(cartId) {
        return Cart.findById(cartId).populate('products.product').exec();
    }

    async updateCart(cartId, products) {
        return Cart.findByIdAndUpdate(cartId, { products }, { new: true }).populate('products.product').exec();
    }

    async clearCart(cartId) {
        return Cart.findByIdAndUpdate(cartId, { products: [] }, { new: true }).exec();
    }
}

module.exports = CartDAO;
