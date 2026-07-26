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
  // Re-use getAuctions from service, but pass token if we want pending ones. 
  // Wait, getAuctions in service doesn't pass token currently. I'll fetch directly or add token to getAuctions.
  // Actually, I can just use axios directly here or update getAuctions to accept an optional token & status.
  // Let's use axios directly to fetch ALL statuses for admin.
  
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
            <Gavel className="text-primary-600" /> Auction Management
          </h1>
          <p className="text-gray-500 mt-1">Approve pending auction lots and monitor active bidding.</p>
        </div>
        <Link to="/admin/dashboard" className="text-sm font-medium text-gray-500 hover:text-primary-600">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Lot & Product</th>
                <th className="p-4 font-semibold">Farmer</th>
                <th className="p-4 font-semibold">Grade / Qty</th>
                <th className="p-4 font-semibold">Base Price</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {auctions.map((auction) => (
                <tr key={auction._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{auction.productName}</p>
                    <p className="text-xs text-gray-500">#{auction.lotNumber}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{auction.farmer?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{auction.farmLocation}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-primary-600">{auction.qualityGrade}</p>
                    <p className="text-xs text-gray-500">{auction.quantity} kg</p>
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    ₹{auction.basePrice}/kg
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      auction.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                      auction.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {auction.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end space-x-2">
                    {auction.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(auction._id, 'Active')}
                          className="flex items-center text-green-600 hover:text-green-800 bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <CheckCircle size={16} className="mr-1" /> Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(auction._id, 'Cancelled')}
                          className="flex items-center text-red-600 hover:text-red-800 bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <XCircle size={16} className="mr-1" /> Reject
                        </button>
                      </>
                    )}
                    {auction.status === 'Active' && (
                       <Link
                         to={`/auctions/${auction._id}`}
                         className="flex items-center text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                       >
                         Monitor
                       </Link>
                    )}
                  </td>
                </tr>
              ))}
              
              {auctions.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    <AlertCircle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    No auctions found.
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
