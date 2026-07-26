import AuctionLot from './models/auctionModel.js';
import Bid from './models/bidModel.js';
import User from './models/userModel.js';

export default function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join auction room
    socket.on('join_auction', (auctionId) => {
      socket.join(auctionId);
      console.log(`User joined auction room: ${auctionId}`);
    });

    // Leave auction room
    socket.on('leave_auction', (auctionId) => {
      socket.leave(auctionId);
      console.log(`User left auction room: ${auctionId}`);
    });

    // Place bid
    socket.on('place_bid', async (data, callback) => {
      try {
        const { auctionId, buyerId, amount } = data;
        
        // Find auction lot
        const auction = await AuctionLot.findById(auctionId).populate('currentHighestBid');
        if (!auction) {
          return callback({ success: false, message: 'Auction not found' });
        }

        // Validate auction is active
        const now = new Date();
        if (auction.status !== 'Active' || auction.startTime > now || auction.endTime < now) {
          return callback({ success: false, message: 'Auction is not currently active' });
        }

        // Validate bidder is not the farmer
        if (auction.farmer.toString() === buyerId) {
          return callback({ success: false, message: 'Farmers cannot bid on their own lots' });
        }

        // Check if amount is valid
        const currentHighest = auction.currentHighestBid ? auction.currentHighestBid.amount : auction.basePrice;
        
        // If there are no bids yet, they must bid at least basePrice
        if (!auction.currentHighestBid && amount < auction.basePrice) {
            return callback({ success: false, message: `Bid must be at least the base price of ₹${auction.basePrice}`});
        }

        // If there are bids, they must increment properly
        if (auction.currentHighestBid && amount < currentHighest + auction.minBidIncrement) {
          return callback({ success: false, message: `Bid must be at least ₹${currentHighest + auction.minBidIncrement}` });
        }

        // Create the bid (could use transactions here, but for MVP keep it simple)
        const bid = await Bid.create({
          auctionLot: auctionId,
          buyer: buyerId,
          amount
        });

        // Update auction
        auction.currentHighestBid = bid._id;
        await auction.save();

        const populatedBid = await Bid.findById(bid._id).populate('buyer', 'name');

        // Broadcast to everyone in the room
        io.to(auctionId).emit('bid_update', {
          auctionId,
          bid: populatedBid
        });

        callback({ success: true, bid: populatedBid });

      } catch (error) {
        console.error('Socket bid error:', error);
        callback({ success: false, message: error.message || 'Error placing bid' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}
