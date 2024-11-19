const express = require('express');
const connectDB = require('./src/config/dbConfig'); // Configuração do banco
const productRoutes = require('./src/routes/carts'); // Caminho correto para as rotas

const app = express();
const PORT = 8080;

// Conectar ao MongoDB
connectDB();

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Rotas
app.use('/api/products', productRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
