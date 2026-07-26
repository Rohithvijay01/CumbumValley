import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import auctionService from '../../services/auctionService';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, Clock, ShieldCheck, Leaf, AlertCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const AuctionRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const { userInfo } = useSelector((state) => state.auth);

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch auction data
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const data = await auctionService.getAuctionById(id);
        setAuction(data.auction);
        setBids(data.bids);
        
        // Suggest next bid
        const currentHighest = data.auction.currentHighestBid ? data.auction.currentHighestBid.amount : data.auction.basePrice;
        setBidAmount(currentHighest + data.auction.minBidIncrement);
      } catch (error) {
        toast.error('Failed to load auction');
        navigate('/auctions');
      } finally {
        setLoading(false);
      }
    };
    fetchAuction();
  }, [id, navigate]);

  // Handle Socket
  useEffect(() => {
    if (socket && auction) {
      socket.emit('join_auction', id);

      socket.on('bid_update', (data) => {
        if (data.auctionId === id) {
          // Add new bid to top of list
          setBids(prev => [data.bid, ...prev]);
          // Update auction current highest
          setAuction(prev => ({ ...prev, currentHighestBid: data.bid }));
          
          toast.success(`New bid: ₹${data.bid.amount}/kg by ${data.bid.buyer.name}`);
        }
      });

      socket.on('auction_closed', (data) => {
        if (data.auctionId === id) {
          setAuction(prev => ({ ...prev, status: 'Closed', winner: data.winner }));
          toast('Auction closed!', { icon: '🛑' });
        }
      });

      return () => {
        socket.emit('leave_auction', id);
        socket.off('bid_update');
        socket.off('auction_closed');
      };
    }
  }, [socket, id, auction]);

  // Timer
  useEffect(() => {
    if (!auction || auction.status !== 'Active') return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(auction.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('EXPIRED');
      } else {
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction]);

  const handlePlaceBid = (e) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error('Please login to place a bid');
      return;
    }
    
    if (!socket) {
      toast.error('Connection lost. Please refresh.');
      return;
    }

    const currentHighest = auction.currentHighestBid ? auction.currentHighestBid.amount : auction.basePrice;
    const amount = Number(bidAmount);

    if (amount < currentHighest + auction.minBidIncrement && amount !== auction.basePrice) {
      toast.error(`Minimum bid must be ₹${currentHighest + auction.minBidIncrement}`);
      return;
    }

    socket.emit('place_bid', {
      auctionId: id,
      buyerId: userInfo._id,
      amount
    }, (response) => {
      if (response.success) {
        toast.success('Bid placed successfully!');
        setBidAmount('');
      } else {
        toast.error(response.message);
      }
    });
  };

  if (loading || !auction) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const currentHighest = auction.currentHighestBid ? auction.currentHighestBid.amount : auction.basePrice;
  const isWinner = auction.status === 'Closed' && auction.winner === userInfo?._id;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate('/auctions')} className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Back to Auctions
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{auction.productName}</h1>
                <p className="text-gray-500">Lot #{auction.lotNumber}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold ${
                auction.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {auction.status === 'Active' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    LIVE
                  </span>
                ) : auction.status}
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Quantity</p>
                <p className="font-bold text-gray-900">{auction.quantity} kg</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Base Price</p>
                <p className="font-bold text-gray-900">₹{auction.basePrice}/kg</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Grade</p>
                <p className="font-bold text-primary-600">{auction.qualityGrade}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Increment</p>
                <p className="font-bold text-gray-900">₹{auction.minBidIncrement}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <h3 className="text-lg font-bold mb-4">Quality Parameters</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 text-sm">
                <div>
                  <span className="text-gray-500">Pod Size: </span>
                  <span className="font-medium">{auction.podSize} mm</span>
                </div>
                <div>
                  <span className="text-gray-500">Moisture: </span>
                  <span className="font-medium">{auction.moisture}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Colour: </span>
                  <span className="font-medium">{auction.colour}</span>
                </div>
                <div>
                  <span className="text-gray-500">Volatile Oil: </span>
                  <span className="font-medium">{auction.volatileOil}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Aroma: </span>
                  <span className="font-medium">{auction.aroma}</span>
                </div>
                <div>
                  <span className="text-gray-500">Harvest: </span>
                  <span className="font-medium">{new Date(auction.harvestDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4">
              {auction.organicBadge && (
                <div className="flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-bold">
                  <Leaf size={14} className="mr-1" /> Certified Organic
                </div>
              )}
              {auction.verifiedFarmerBadge && (
                <div className="flex items-center text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                  <ShieldCheck size={14} className="mr-1" /> Verified Farmer
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Bidding Area */}
        <div className="space-y-6">
          
          {/* Timer & Current Bid */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <h2 className="text-gray-500 font-medium mb-2 flex items-center justify-center gap-2">
              <Clock size={18} /> Time Remaining
            </h2>
            <div className={`text-4xl font-display font-bold mb-6 ${timeLeft === 'EXPIRED' ? 'text-red-500' : 'text-gray-900'}`}>
              {timeLeft}
            </div>

            <div className="bg-primary-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-primary-600 font-medium mb-1">Current Highest Bid</p>
              <p className="text-4xl font-bold text-primary-700">₹{currentHighest}<span className="text-lg">/kg</span></p>
              {auction.currentHighestBid && (
                <p className="text-sm text-primary-600 mt-2">by {auction.currentHighestBid.buyer.name}</p>
              )}
            </div>

            {auction.status === 'Active' ? (
              <form onSubmit={handlePlaceBid} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    min={currentHighest + (auction.currentHighestBid ? auction.minBidIncrement : 0)}
                    required
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="block w-full pl-8 pr-12 py-4 border border-gray-300 rounded-xl text-xl font-bold focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter bid amount"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">/kg</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!userInfo || userInfo.role === 'Farmer'}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-colors shadow-sm"
                >
                  <Gavel size={20} /> Place Bid
                </button>
                {userInfo?.role === 'Farmer' && (
                  <p className="text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle size={12}/> Farmers cannot bid
                  </p>
                )}
              </form>
            ) : (
              <div className={`p-4 rounded-xl ${isWinner ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {isWinner ? (
                  <div>
                    <h3 className="font-bold text-lg mb-1 flex items-center justify-center gap-2"><ShieldCheck size={20}/> You Won!</h3>
                    <p className="text-sm">Proceed to your dashboard to complete the order.</p>
                  </div>
                ) : (
                  <p className="font-bold">Auction is closed</p>
                )}
              </div>
            )}
          </div>

          {/* Bid History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700 flex justify-between items-center">
              <span>Bid History</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{bids.length} bids</span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <AnimatePresence>
                {bids.length > 0 ? bids.map((bid, i) => (
                  <motion.div
                    key={bid._id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`p-4 border-b border-gray-50 flex justify-between items-center ${i === 0 ? 'bg-primary-50/50' : ''}`}
                  >
                    <div>
                      <p className="font-bold text-gray-900">₹{bid.amount}/kg</p>
                      <p className="text-xs text-gray-500">{bid.buyer.name}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(bid.createdAt).toLocaleTimeString()}
                    </span>
                  </motion.div>
                )) : (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No bids yet. Be the first to bid!
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;
