const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductStats
} = require('../controllers/productController');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/stats', getProductStats);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProduct);

// Admin routes (you can add authentication middleware here later)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
