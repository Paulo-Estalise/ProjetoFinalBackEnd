const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./models/Product')

const app = express();
const PORT = 8080;

mongoose.connect('mongodb://localhost:27017/seuBancoDeDados')
    .then(() => {
        console.log('MongoDB conectado!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
