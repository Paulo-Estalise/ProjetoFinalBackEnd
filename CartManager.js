const Cart = require('./models/Cart');  // Assuming Mongoose schema

class CartManager {
    async getCartByIdWithProducts(cartId) {
        return Cart.findById(cartId).populate('products.product').exec();  // Populate products details
    }

    async updateCart(cartId, products) {
        return Cart.findByIdAndUpdate(cartId, { products }, { new: true }).populate('products.product').exec();
    }

    async clearCart(cartId) {
        return Cart.findByIdAndUpdate(cartId, { products: [] }, { new: true }).exec();
    }

    // Other methods remain the same
}

module.exports = CartManager;
