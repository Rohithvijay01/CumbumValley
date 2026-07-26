import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';
import { MapPin, ShoppingCart, ArrowRight, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: '', city: '', postalCode: ''
  });

  useEffect(() => {
    if (productId) {
      API.get(`/products/${productId}`).then(res => setProduct(res.data.data)).catch(() => toast.error('Product not found'));
    }
  }, [productId]);

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderItems: [
          {
            name: product.name,
            qty: Number(qty),
            price: product.price,
            product: product._id
          }
        ],
        shippingAddress: address,
        paymentMethod: 'Cash on Delivery',
        totalPrice: product.price * qty
      };
      await API.post('/orders', orderData);
      toast.success('Order placed successfully.');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to place order');
    }
  };

  if (!product) return (
    <div className="flex justify-center items-center h-64 text-slate-500 text-xs font-mono uppercase tracking-wider">
      Initializing Checkout...
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Order Checkout</h1>
          <p className="text-[11px] font-mono text-slate-500 mt-1">Finalize logistics and procurement details.</p>
        </div>
        <div className="hidden sm:flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
          <ShieldCheck size={14} className="mr-1.5" />
          Secure Transaction
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-white p-5 border border-slate-200 rounded shadow-sm">
          <h2 className="text-xs font-bold mb-4 text-slate-900 uppercase tracking-wider flex items-center">
            <MapPin size={14} className="mr-2 text-slate-500" /> Logistics Destination
          </h2>
          <form id="checkout-form" onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Delivery Address</label>
              <input type="text" required placeholder="Warehouse / Facility Address" className="block w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" onChange={e => setAddress({...address, address: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">City / District</label>
                <input type="text" required placeholder="e.g. Theni" className="block w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" onChange={e => setAddress({...address, city: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Postal Code</label>
                <input type="text" required placeholder="PIN Code" className="block w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" onChange={e => setAddress({...address, postalCode: e.target.value})} />
              </div>
            </div>
          </form>
        </div>

        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-5 border border-slate-200 rounded shadow-sm">
            <h2 className="text-xs font-bold mb-4 text-slate-900 uppercase tracking-wider flex items-center">
              <ShoppingCart size={14} className="mr-2 text-slate-500" /> Procurement Summary
            </h2>
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <p className="font-bold text-sm text-slate-900">{product.name}</p>
                <p className="text-[11px] font-mono text-slate-500 mt-1">₹{product.price} / {product.unit}</p>
              </div>
              <div className="w-24">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Qty ({product.unit})</label>
                <input type="number" min="1" max={product.stock} value={qty} onChange={e => setQty(e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm font-mono text-center focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-slate-600 font-mono">
                <span>Subtotal:</span>
                <span>₹{(product.price * qty).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 font-mono">
                <span>Platform Fee (0%):</span>
                <span>₹0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm font-bold text-slate-900 border-t border-slate-200 pt-4">
              <span className="uppercase tracking-wider">Total Value:</span>
              <span className="font-mono text-emerald-700">₹{(product.price * qty).toFixed(2)}</span>
            </div>
            <div className="mt-2 text-[10px] font-bold text-slate-500 text-right uppercase tracking-wider border-b border-slate-100 pb-4">
              Terms: Cash on Delivery (COD)
            </div>
            
            <button form="checkout-form" type="submit" className="w-full mt-4 flex justify-center items-center bg-emerald-700 text-white font-bold text-[11px] uppercase tracking-wider py-2.5 rounded hover:bg-emerald-600 transition-colors border border-emerald-800">
              Confirm Procurement <ArrowRight size={14} className="ml-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
