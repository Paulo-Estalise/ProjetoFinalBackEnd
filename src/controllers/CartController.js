import Ticket from '../models/TicketModel.js';
import Product from '../models/ProductModel.js';

export const purchaseCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    let totalAmount = 0;
    const unavailableProducts = [];

    for (const item of cart.products) {
      const product = item.product;
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await product.save();
      } else {
        unavailableProducts.push(product._id);
      }
    }

    if (totalAmount > 0) {
      const ticket = await Ticket.create({
        amount: totalAmount,
        purchaser: req.user.email,
      });
      cart.products = cart.products.filter(item => unavailableProducts.includes(item.product._id));
      await cart.save();
      res.status(201).json({ ticket, unavailableProducts });
    } else {
      res.status(400).json({ message: 'No products available for purchase', unavailableProducts });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};