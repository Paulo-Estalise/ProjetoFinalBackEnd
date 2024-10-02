const ProductDAO = require('../dao/ProductDAO');

class ProductRepository {
    constructor() {
        this.productDAO = new ProductDAO();
    }

    async getPaginatedProducts(filter, options) {
        return this.productDAO.getPaginatedProducts(filter, options);
    }

    // Outros métodos de negócio que utilizam o ProductDAO
}

module.exports = ProductRepository;
