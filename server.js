const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('routes/products'); // Certifique-se de que o caminho está correto

const app = express();
const PORT = 8080;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/seuBancoDeDados', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB conectado!');
})
.catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Definindo as rotas de produtos
app.use('/api/products', productRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
