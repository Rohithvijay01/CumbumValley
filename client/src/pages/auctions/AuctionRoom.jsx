import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import auctionService from '../../services/auctionService';
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
          toast.success('Auction closed!');
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const currentHighest = auction.currentHighestBid ? auction.currentHighestBid.amount : auction.basePrice;
  const isWinner = auction.status === 'Closed' && auction.winner === userInfo?._id;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate('/auctions')} className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-1" /> BACK
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{auction.productName}</h1>
                <p className="text-slate-500 text-xs font-mono mt-0.5">LOT #{auction.lotNumber}</p>
              </div>
              <div className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded ${
                auction.status === 'Active' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {auction.status}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
              <div className="p-4 flex flex-col justify-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Quantity</p>
                <p className="font-bold text-slate-900 text-lg">{auction.quantity} kg</p>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Base Price</p>
                <p className="font-bold text-slate-900 text-lg">₹{auction.basePrice}/kg</p>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Grade</p>
                <p className="font-bold text-primary-700 text-lg">{auction.qualityGrade}</p>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Min Increment</p>
                <p className="font-bold text-slate-900 text-lg">₹{auction.minBidIncrement}</p>
              </div>
            </div>

            <div className="p-4 bg-white">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Quality Parameters</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500 text-xs">Pod Size</span>
                  <span className="font-bold text-slate-900 text-xs">{auction.podSize} mm</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500 text-xs">Moisture</span>
                  <span className="font-bold text-slate-900 text-xs">{auction.moisture}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500 text-xs">Colour</span>
                  <span className="font-bold text-slate-900 text-xs">{auction.colour}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500 text-xs">Volatile Oil</span>
                  <span className="font-bold text-slate-900 text-xs">{auction.volatileOil}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500 text-xs">Aroma</span>
                  <span className="font-bold text-slate-900 text-xs">{auction.aroma}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500 text-xs">Harvest</span>
                  <span className="font-bold text-slate-900 text-xs">{new Date(auction.harvestDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex gap-3">
              {auction.organicBadge && (
                <div className="flex items-center text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  <Leaf size={12} className="mr-1" /> Certified Organic
                </div>
              )}
              {auction.verifiedFarmerBadge && (
                <div className="flex items-center text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={12} className="mr-1" /> Verified Farmer
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Bidding Area */}
        <div className="space-y-6">
          
          {/* Timer & Current Bid */}
          <div className="bg-slate-900 rounded-md shadow-sm border border-slate-800 text-white overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5"><Clock size={12} /> Time Remaining</span>
              <span className={`text-sm font-mono font-bold ${timeLeft === 'EXPIRED' ? 'text-red-500' : 'text-emerald-400'}`}>
                {timeLeft}
              </span>
            </div>

            <div className="p-6 text-center border-b border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Highest Bid</p>
              <p className="text-4xl font-mono font-bold text-white tracking-tight">₹{currentHighest}<span className="text-sm text-slate-500 ml-1">/kg</span></p>
              {auction.currentHighestBid && (
                <p className="text-xs text-emerald-400 mt-2 font-mono">by {auction.currentHighestBid.buyer.name}</p>
              )}
            </div>

            {auction.status === 'Active' ? (
              <div className="p-4 bg-slate-900">
                <form onSubmit={handlePlaceBid} className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-mono font-bold">₹</span>
                    </div>
                    <input
                      type="number"
                      min={currentHighest + (auction.currentHighestBid ? auction.minBidIncrement : 0)}
                      required
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="block w-full pl-8 pr-12 py-3 bg-slate-950 border border-slate-700 rounded-md text-white font-mono font-bold focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter amount"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">/kg</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!userInfo || userInfo.role === 'Farmer'}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-wider py-3 rounded-md flex justify-center items-center gap-2 transition-colors border border-emerald-500 disabled:border-slate-700"
                  >
                    <Gavel size={16} /> Place Bid
                  </button>
                  {userInfo?.role === 'Farmer' && (
                    <p className="text-[10px] text-red-400 mt-2 flex items-center justify-center gap-1 uppercase font-bold">
                      <AlertCircle size={10}/> Farmers cannot bid
                    </p>
                  )}
                </form>
              </div>
            ) : (
              <div className={`p-4 text-center border-t border-slate-800 ${isWinner ? 'bg-emerald-950/50 text-emerald-400' : 'bg-slate-950 text-slate-500'}`}>
                {isWinner ? (
                  <div>
                    <h3 className="font-bold text-sm mb-1 uppercase tracking-wider flex items-center justify-center gap-1.5"><ShieldCheck size={14}/> You Won</h3>
                    <p className="text-[10px]">Complete order in dashboard.</p>
                  </div>
                ) : (
                  <p className="text-xs font-bold uppercase tracking-wider">Auction Closed</p>
                )}
              </div>
            )}
          </div>

          {/* Bid History */}
          <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Order Book</span>
              <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">{bids.length}</span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {bids.length > 0 ? (
                <table className="w-full text-left text-xs">
                  <thead className="bg-white sticky top-0 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-2 font-bold text-slate-400 uppercase text-[10px]">Price</th>
                      <th className="px-4 py-2 font-bold text-slate-400 uppercase text-[10px]">Buyer</th>
                      <th className="px-4 py-2 font-bold text-slate-400 uppercase text-[10px] text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bids.map((bid, i) => (
                      <tr key={bid._id} className={i === 0 ? 'bg-emerald-50/50' : 'bg-white hover:bg-slate-50'}>
                        <td className="px-4 py-2 font-mono font-bold text-slate-900">₹{bid.amount}</td>
                        <td className="px-4 py-2 text-slate-600 truncate max-w-[100px]">{bid.buyer.name}</td>
                        <td className="px-4 py-2 text-slate-400 text-right font-mono text-[10px]">
                          {new Date(bid.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs font-medium">
                  No bids recorded.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;
