import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import auctionService from '../../services/auctionService';
import { Timer, Gavel, Package } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await auctionService.getAuctions();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Live e-Auctions</h1>
          <p className="text-gray-500 mt-2">Bid on premium organic cardamom lots from verified farmers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction, idx) => (
          <motion.div
            key={auction._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-2">
                    <span className="w-2 h-2 mr-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    Live Now
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{auction.productName}</h3>
                  <p className="text-sm text-gray-500">Lot: {auction.lotNumber}</p>
                </div>
                <div className="bg-primary-50 p-2 rounded-lg text-primary-700">
                  <Gavel size={20} />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2"><Package size={16}/> Quantity</span>
                  <span className="font-medium">{auction.quantity} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2"><Gavel size={16}/> Base Price</span>
                  <span className="font-medium">₹{auction.basePrice}/kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2"><Timer size={16}/> Ends In</span>
                  <span className="font-medium text-red-600">
                    {formatDistanceToNow(new Date(auction.endTime))}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Current Highest Bid</p>
                  <p className="text-lg font-bold text-primary-600">
                    ₹{auction.currentHighestBid ? auction.currentHighestBid.amount : auction.basePrice}
                  </p>
                </div>
                <Link
                  to={`/auctions/${auction._id}`}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Enter Room
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {auctions.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            <Gavel size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No active auctions at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionList;
