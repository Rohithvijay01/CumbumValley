import express from 'express';
import {
  createAuction,
  getAuctions,
  getAuctionById,
  getMyAuctions,
  getMyBids,
  updateAuctionStatus
} from '../controllers/auctionController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAuctions)
  .post(protect, authorize('Vendor', 'Farmer', 'Admin'), createAuction);

router.get('/my-auctions', protect, authorize('Vendor', 'Farmer'), getMyAuctions);
router.get('/my-bids', protect, getMyBids); // Buyers can view their bids

router.route('/:id')
  .get(getAuctionById);

router.put('/:id/status', protect, authorize('Admin'), updateAuctionStatus);

export default router;
