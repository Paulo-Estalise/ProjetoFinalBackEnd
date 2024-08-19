const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, 'data/products.json');
        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } else {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    getNextId() {
        return this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
    }

    getProducts(limit) {
        return limit ? this.products.slice(0, limit) : this.products;
    }

    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    addProduct(product) {
        const newProduct = { id: this.getNextId(), status: true, ...product };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) return null;

        const updatedProduct = { ...this.products[productIndex], ...updatedFields };
        this.products[productIndex] = updatedProduct;
        this.saveProducts();
        return updatedProduct;
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) return null;

        const [deletedProduct] = this.products.splice(productIndex, 1);
        this.saveProducts();
        return deletedProduct;
    }
}

module.exports = ProductManager;
