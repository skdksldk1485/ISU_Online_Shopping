import express from 'express';
const router = express.Router();
import {
  getProductList,
  getCurrentProductList,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authHandler.js';

router.route('/').get(getProductList).post(protect, admin, createProduct);
router.route('/current').get(getCurrentProductList).post(protect, admin);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route('/:id')
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
