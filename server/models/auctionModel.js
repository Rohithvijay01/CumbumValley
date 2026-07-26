import mongoose from 'mongoose';

const auctionLotSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Please add a product name'],
      default: 'Green Cardamom',
    },
    lotNumber: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity in kg'],
    },
    basePrice: {
      type: Number,
      required: [true, 'Please add base price per kg'],
    },
    currentHighestBid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bid',
    },
    minBidIncrement: {
      type: Number,
      required: true,
      default: 5, // minimum 5 rupees increment
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Active', 'Closed', 'Cancelled'],
      default: 'Pending',
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    farmLocation: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    organicBadge: {
      type: Boolean,
      default: false,
    },
    
    // Quality Grading fields
    podSize: {
      type: Number, // mm
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    aroma: {
      type: String,
      required: true,
    },
    moisture: {
      type: Number, // percentage
      required: true,
    },
    volatileOil: {
      type: Number,
      required: true,
    },
    harvestDate: {
      type: Date,
      required: true,
    },
    qualityGrade: {
      type: String,
      enum: ['A+', 'A', 'B', 'C'],
      required: true,
    },
    
    // System fields
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    winningOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    }
  },
  {
    timestamps: true,
  }
);

// Method to check if auction is active based on current time
auctionLotSchema.methods.isActive = function() {
  const now = new Date();
  return this.status === 'Active' && this.startTime <= now && this.endTime > now;
};

const AuctionLot = mongoose.model('AuctionLot', auctionLotSchema);
export default AuctionLot;
