import cron from 'node-cron';
import AuctionLot from '../models/auctionModel.js';
import Order from '../models/orderModel.js'; // Ensure Order model exists
import Bid from '../models/bidModel.js';

export default function cronJobs(io) {
  // Check every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      
      // Find auctions that have passed end time but are still active
      const expiredAuctions = await AuctionLot.find({
        status: 'Active',
        endTime: { $lt: now }
      }).populate('currentHighestBid');

      for (let auction of expiredAuctions) {
        auction.status = 'Closed';
        
        if (auction.currentHighestBid) {
          auction.winner = auction.currentHighestBid.buyer;
          
          // Optionally create an order here based on existing flow
          // ... 
        }
        
        await auction.save();
        console.log(`Auction ${auction._id} closed.`);
        
        // Notify clients
        io.to(auction._id.toString()).emit('auction_closed', {
          auctionId: auction._id,
          winner: auction.winner,
          winningBid: auction.currentHighestBid
        });
      }

      // Find pending auctions that should now start
      const startingAuctions = await AuctionLot.find({
        status: 'Pending',
        startTime: { $lt: now },
        endTime: { $gt: now }
      });

      for (let auction of startingAuctions) {
        auction.status = 'Active';
        await auction.save();
        console.log(`Auction ${auction._id} is now active.`);
        // Notify clients maybe?
      }

    } catch (error) {
      console.error('Cron Job Error:', error);
    }
  });
}
