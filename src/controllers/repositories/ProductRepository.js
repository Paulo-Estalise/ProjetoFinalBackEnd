export default class ProductRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async createProduct(data) {
      return await this.dao.create(data);
    }
  
    async updateProduct(id, data) {
      return await this.dao.update(id, data);
    }
  
    async deleteProduct(id) {
      return await this.dao.delete(id);
    }
  
    async getProductById(id) {
      return await this.dao.findById(id);
    }
  }