import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import auctionService from '../../services/auctionService';
import { Gavel, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  
  const fetchAdminAuctions = async () => {
    try {
      // Need to send token for admin privileges to see Pending
      const res = await fetch('/api/auctions?status=Pending', {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });
      const data = await res.json();
      
      const resActive = await fetch('/api/auctions?status=Active', {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });
      const dataActive = await resActive.json();

      setAuctions([...(data.data || []), ...(dataActive.data || [])]);
    } catch (error) {
      toast.error('Failed to load auctions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminAuctions();
  }, [userInfo]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await auctionService.updateAuctionStatus(id, status, userInfo.token);
      toast.success(`Auction ${status} successfully`);
      fetchAdminAuctions();
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Gavel size={24} className="text-emerald-700" /> Auction Management
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Approve pending auction lots and monitor active bidding.</p>
        </div>
        <Link to="/admin/dashboard" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-700 transition-colors">
          &larr; Back
        </Link>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                <th className="px-4 py-3">Lot & Product</th>
                <th className="px-4 py-3">Farmer</th>
                <th className="px-4 py-3">Grade / Qty</th>
                <th className="px-4 py-3">Base Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {auctions.map((auction) => (
                <tr key={auction._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{auction.productName}</p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">#{auction.lotNumber}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900 text-sm">{auction.farmer?.name || 'Unknown'}</p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">{auction.farmLocation}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-emerald-700">{auction.qualityGrade}</p>
                    <p className="text-xs text-slate-500 font-mono">{auction.quantity} kg</p>
                  </td>
                  <td className="px-4 py-3 font-bold font-mono text-slate-900">
                    ₹{auction.basePrice}/kg
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      auction.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      auction.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                      'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      {auction.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-end space-x-2">
                    {auction.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(auction._id, 'Active')}
                          className="flex items-center bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-500 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <CheckCircle size={14} className="mr-1" /> Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(auction._id, 'Cancelled')}
                          className="flex items-center bg-white border border-red-300 text-red-700 hover:bg-red-50 hover:border-red-500 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <XCircle size={14} className="mr-1" /> Reject
                        </button>
                      </>
                    )}
                    {auction.status === 'Active' && (
                       <Link
                         to={`/auctions/${auction._id}`}
                         className="flex items-center bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-500 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                       >
                         Monitor
                       </Link>
                    )}
                  </td>
                </tr>
              ))}
              
              {auctions.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    <AlertCircle className="mx-auto h-6 w-6 text-slate-300 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-wider">No auctions found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAuctions;
