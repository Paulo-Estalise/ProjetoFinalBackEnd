import { isAdmin } from '../middlewares/authMiddleware.js';

router.post('/', isAdmin, productController.createProduct);
router.put('/:id', isAdmin, productController.updateProduct);
router.delete('/:id', isAdmin, productController.deleteProduct);

// src/routes/chatRoutes.js
import { isUser } from '../middlewares/authMiddleware.js';

router.post('/send', isUser, chatController.sendMessage);