import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema(
  {
    auctionLot: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'AuctionLot',
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true, // This gives us createdAt timestamp for the bid
  }
);

// Ensure a user can only have one bid per amount per lot (prevent duplicate submissions)
bidSchema.index({ auctionLot: 1, buyer: 1, amount: 1 }, { unique: true });

const Bid = mongoose.model('Bid', bidSchema);
export default Bid;
