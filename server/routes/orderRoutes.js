import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, authorize('Farmer', 'Admin'), updateOrderStatus);

export default router;
