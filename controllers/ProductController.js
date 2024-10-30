import DaoFactory from '../factories/DaoFactory.js';
import ProductRepository from '../repositories/ProductRepository.js';

const dao = DaoFactory.getDao(process.argv[2] || 'mongo');
const productRepo = new ProductRepository(dao);

export const createProduct = async (req, res) => {
  try {
    const product = await productRepo.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};