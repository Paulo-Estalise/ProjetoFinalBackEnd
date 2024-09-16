const express = require('express');
const mongoose = require('mongoose');
const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const app = express();
const productManager = new ProductManager();
const cartManager = new CartManager();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Route to get paginated, filtered, and sorted products
app.get('/api/products', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    
    const filter = query ? { category: query } : {};  // Example: filtering by category
    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},  // Sorting by price
    };

    try {
        const products = await productManager.getPaginatedProducts(filter, options);
        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.prevPage : null,
            nextPage: products.hasNextPage ? products.nextPage : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Product endpoints remain unchanged

// Cart endpoints

app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartByIdWithProducts(req.params.cid);
        if (!cart) return res.status(404).send('Cart not found');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.put('/api/carts/:cid', async (req, res) => {
    const { products } = req.body;
    try {
        const updatedCart = await cartManager.updateCart(req.params.cid, products);
        if (!updatedCart) return res.status(404).send('Cart not found');
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Delete all products from cart
app.delete('/api/carts/:cid', async (req, res) => {
    try {
        const deletedCart = await cartManager.clearCart(req.params.cid);
        if (!deletedCart) return res.status(404).send('Cart not found');
        res.json(deletedCart);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
