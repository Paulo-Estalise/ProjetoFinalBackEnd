const express = require('express');
const ProductManager = require('../../repositories/ProductManager'); // Ajuste o caminho se necessário
const router = express.Router();

const productManager = new ProductManager();

// Rota para obter produtos paginados
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Obtendo os parâmetros de página e limite
    const filter = {}; // Adicione filtros conforme necessário
    const options = {
        page: Number(page),
        limit: Number(limit),
        sort: { createdAt: -1 }, // Ordena por data de criação, por exemplo
    };

    try {
        const result = await productManager.getPaginatedProducts(filter, options);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});

module.exports = router;
