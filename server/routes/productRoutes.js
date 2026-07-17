import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('Farmer', 'Admin'), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, authorize('Farmer', 'Admin'), updateProduct)
  .delete(protect, authorize('Farmer', 'Admin'), deleteProduct);

export default router;
