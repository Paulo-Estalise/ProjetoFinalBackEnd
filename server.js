const express = require('express');
const mongoose = require('mongoose');
const ProductManager = require('./ProductManager');
const CartManager = require('./routes/carts');
const { authMiddleware } = require('./middleware/authMiddleware');
const cartRoutes = require('./routes/carts');

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

// Middleware de autenticação
app.use(authMiddleware);

// Rotas
app.use('/api/carts', cartRoutes);

// Outras rotas...

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
