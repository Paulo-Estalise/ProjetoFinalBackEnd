const express = require('express');
const CartRepository = require('../repositories/CartRepository');
const TicketService = require('../services/TicketService');
const { userMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const cartRepository = new CartRepository();
const ticketService = new TicketService();

router.post('/:cid/purchase', userMiddleware, async (req, res) => {
    const cartId = req.params.cid;
    const cart = await cartRepository.getCartById(cartId);

    if (!cart) return res.status(404).send('Cart not found');

    let totalAmount = 0;
    const unavailableProducts = [];

    for (const item of cart.products) {
        const product = await productManager.getProductById(item.product); // Assumindo que você tem um método para buscar produto por ID
        if (product.stock >= item.quantity) {
            totalAmount += product.price * item.quantity;
            product.stock -= item.quantity; // Atualiza o estoque
            await product.save(); // Salva a alteração
        } else {
            unavailableProducts.push(product);
        }
    }

    if (unavailableProducts.length > 0) {
        // Retorna os produtos indisponíveis
        return res.status(400).json({ message: 'Some products are unavailable', unavailableProducts });
    }

    // Gera o ticket
    const ticket = await ticketService.createTicket(req.user.email, totalAmount);
    
    // Limpa o carrinho (ou pode modificar conforme a lógica desejada)
    await cartRepository.clearCart(cartId);
    
    res.json({ message: 'Purchase successful', ticket });
});

module.exports = router;
