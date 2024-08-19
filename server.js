const express = require('express');
const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const app = express();
const productManager = new ProductManager();
const cartManager = new CartManager();

app.use(express.json());

// Routes for products
app.get('/api/products', (req, res) => {
    const { limit } = req.query;
    const products = productManager.getProducts(limit ? parseInt(limit) : undefined);
    res.json(products);
});

app.get('/api/products/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

app.post('/api/products', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send('All fields except thumbnails are required');
    }

    const newProduct = productManager.addProduct({ title, description, code, price, stock, category, thumbnails });
    res.status(201).json(newProduct);
});

app.put('/api/products/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(parseInt(req.params.pid), req.body);
    if (!updatedProduct) return res.status(404).send('Product not found');
    res.json(updatedProduct);
});

app.delete('/api/products/:pid', (req, res) => {
    const deletedProduct = productManager.deleteProduct(parseInt(req.params.pid));
    if (!deletedProduct) return res.status(404).send('Product not found');
    res.json(deletedProduct);
});


app.post('/api/carts', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

app.get('/api/carts/:cid', (req, res) => {
    const cart = cartManager.getCartById(parseInt(req.params.cid));
    if (!cart) return res.status(404).send('Cart not found');
    res.json(cart);
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (!cart) return res.status(404).send('Cart not found');
    res.json(cart);
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
