const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/seuBancoDeDados', {
      dbName: 'ecommerce', // Substitua pelo nome do seu banco
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB conectado: ${db.connection.host}`);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Finaliza o app em caso de falha crítica
  }
};

module.exports = connectDB;
