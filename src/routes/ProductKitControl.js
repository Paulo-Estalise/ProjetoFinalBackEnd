exports.getProducts = async (req, res) => {
    try {
      // Implemente a lógica para listar produtos
      res.json({ message: 'Lista de produtos' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter produtos' });
    }
  };
  
  exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.pid;
      // Implemente a lógica para obter produto por ID
      res.json({ message: `Produto com ID: ${productId}` });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter o produto' });
    }
  };
  