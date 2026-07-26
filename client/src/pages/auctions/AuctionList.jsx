import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Live e-Auctions</h1>
          <p className="text-slate-500 mt-1 text-sm">Bid on premium organic cardamom lots from verified farmers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auctions.map((auction) => (
          <div
            key={auction._id}
            className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden hover:border-primary-500 transition-colors flex flex-col"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-start bg-slate-50">
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 mb-2">
                  Live Now
                </span>
                <h3 className="text-sm font-bold text-slate-900">{auction.productName}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">Lot: {auction.lotNumber}</p>
              </div>
              <div className="bg-white border border-slate-200 p-1.5 rounded text-slate-400 shadow-sm">
                <Gavel size={16} />
              </div>
            </div>

            <div className="p-4 flex-1">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs border-b border-slate-100 pb-2">
                  <span className="text-slate-500 flex items-center gap-1.5"><Package size={14}/> Quantity</span>
                  <span className="font-bold text-slate-900">{auction.quantity} kg</span>
                </div>
                <div className="flex justify-between text-xs border-b border-slate-100 pb-2">
                  <span className="text-slate-500 flex items-center gap-1.5"><Gavel size={14}/> Base Price</span>
                  <span className="font-bold text-slate-900">₹{auction.basePrice}/kg</span>
                </div>
                <div className="flex justify-between text-xs pb-1">
                  <span className="text-slate-500 flex items-center gap-1.5"><Timer size={14}/> Ends In</span>
                  <span className="font-bold text-red-600">
                    {formatDistanceToNow(new Date(auction.endTime))}
                  </span>
                </div>
              </div>

              <div className="pt-3 flex items-end justify-between mt-auto">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Highest Bid</p>
                  <p className="text-lg font-bold text-primary-700 leading-none">
                    ₹{auction.currentHighestBid ? auction.currentHighestBid.amount : auction.basePrice}
                  </p>
                </div>
                <Link
                  to={`/auctions/${auction._id}`}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
                >
                  Enter Room
                </Link>
              </div>
            </div>
          </div>
        ))}

        {auctions.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-slate-300 rounded-md bg-slate-50">
            <Gavel size={32} className="mx-auto mb-3 text-slate-400" />
            <p className="text-sm font-medium text-slate-600">No active auctions at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionList;
