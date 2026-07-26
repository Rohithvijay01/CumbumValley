import AuctionLot from '../models/auctionModel.js';
import Bid from '../models/bidModel.js';
import AppError from '../utils/appError.js';

// @desc    Create a new auction lot
// @route   POST /api/auctions
// @access  Private (Farmer/Admin)
export const createAuction = async (req, res, next) => {
  try {
    const {
      productName, lotNumber, quantity, basePrice, minBidIncrement,
      startTime, endTime, farmLocation, images, organicBadge,
      podSize, colour, aroma, moisture, volatileOil, harvestDate, qualityGrade
    } = req.body;

    const auction = await AuctionLot.create({
      farmer: req.user._id,
      productName,
      lotNumber,
      quantity,
      basePrice,
      minBidIncrement,
      startTime,
      endTime,
      farmLocation,
      images,
      organicBadge,
      verifiedFarmerBadge: req.user.isVerified,
      podSize,
      colour,
      aroma,
      moisture,
      volatileOil,
      harvestDate,
      qualityGrade,
      status: 'Pending' // Admin must approve
    });

    res.status(201).json({
      success: true,
      data: auction
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all active/approved auctions
// @route   GET /api/auctions
// @access  Public
export const getAuctions = async (req, res, next) => {
  try {
    const status = req.query.status || 'Active'; // default to active
    
    // Admins can see pending, others should ideally only see active/closed
    const query = { status };
    
    if (req.query.status === 'Pending' && req.user?.role !== 'Admin') {
       return next(new AppError('Not authorized to view pending auctions', 403));
    }

    const auctions = await AuctionLot.find(query)
      .populate('farmer', 'name isVerified')
      .populate({
        path: 'currentHighestBid',
        populate: { path: 'buyer', select: 'name' }
      })
      .sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      count: auctions.length,
      data: auctions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single auction by ID
// @route   GET /api/auctions/:id
// @access  Public
export const getAuctionById = async (req, res, next) => {
  try {
    const auction = await AuctionLot.findById(req.params.id)
      .populate('farmer', 'name isVerified')
      .populate({
        path: 'currentHighestBid',
        populate: { path: 'buyer', select: 'name' }
      });

    if (!auction) {
      return next(new AppError('Auction not found', 404));
    }

    // Get all bids for this auction to show bid history
    const bids = await Bid.find({ auctionLot: req.params.id })
      .populate('buyer', 'name')
      .sort({ amount: -1 });

    res.status(200).json({
      success: true,
      data: {
        auction,
        bids
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my auctions (Farmer)
// @route   GET /api/auctions/my-auctions
// @access  Private (Farmer)
export const getMyAuctions = async (req, res, next) => {
  try {
    const auctions = await AuctionLot.find({ farmer: req.user._id })
      .populate('currentHighestBid')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: auctions.length,
      data: auctions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my bids (Buyer)
// @route   GET /api/auctions/my-bids
// @access  Private
export const getMyBids = async (req, res, next) => {
  try {
    const bids = await Bid.find({ buyer: req.user._id })
      .populate({
        path: 'auctionLot',
        populate: { path: 'currentHighestBid' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bids.length,
      data: bids
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update auction status (Approve/Reject)
// @route   PUT /api/auctions/:id/status
// @access  Private (Admin)
export const updateAuctionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['Active', 'Cancelled'].includes(status)) {
       return next(new AppError('Invalid status update', 400));
    }

    const auction = await AuctionLot.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!auction) {
      return next(new AppError('Auction not found', 404));
    }

    res.status(200).json({
      success: true,
      data: auction
    });
  } catch (error) {
    next(error);
  }
};
