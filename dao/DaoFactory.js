// src/factories/DaoFactory.js
import FileProductDAO from '../dao/FileProductDAO.js';
import MongoProductDAO from '../dao/MongoProductDAO.js';

export default class DaoFactory {
  static getDao(type) {
    switch (type) {
      case 'file':
        return new FileProductDAO();
      case 'mongo':
        return new MongoProductDAO();
      default:
        throw new Error('DAO type not supported');
    }
  }
}
