import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';
import { ShieldCheck, Truck, ArrowLeft, Loader2, PackageCheck, MapPin, ShoppingCart, ArrowRight } from 'lucide-react';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: '', city: '', postalCode: ''
  });

  useEffect(() => {
    if (productId) {
      setLoading(true);
      API.get(`/products/${productId}`)
        .then(res => setProduct(res.data.data))
        .catch(() => toast.error('Product not found or unavailable'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [productId]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!product) return;

    const parsedQty = Number(qty);
    if (parsedQty <= 0 || isNaN(parsedQty)) {
      toast.error('Please select a valid quantity greater than 0');
      return;
    }
    if (parsedQty > product.stock) {
      toast.error(`Only ${product.stock} ${product.unit} available in stock`);
      return;
    }

    try {
      const orderData = {
        orderItems: [
          {
            name: product.name,
            qty: parsedQty,
            price: product.price,
            product: product._id
          }
        ],
        shippingAddress: address,
        paymentMethod: 'Cash on Delivery',
        totalPrice: product.price * parsedQty
      };
      await API.post('/orders', orderData);
      toast.success('🎉 Order placed successfully!');
      navigate('/my-orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-primary-600">
        <Loader2 size={40} className="animate-spin mb-4" />
        <p className="font-medium text-gray-600">Preparing secure checkout...</p>
      </div>
    );
  }

  if (!productId || !product) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl border border-gray-200 text-center shadow-sm">
        <PackageCheck size={48} className="text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Product Selected</h2>
        <p className="text-sm text-gray-500 mb-6">Please choose a produce item from the marketplace to proceed to checkout.</p>
        <Link to="/products" className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors">
          <ArrowLeft size={16} />
          <span>Browse Marketplace</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Truck size={20} className="mr-2 text-primary-600" />
          Shipping Details
        </h2>
        <form id="checkout-form" onSubmit={handleOrder} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Delivery Street Address</label>
            <input 
              type="text" 
              required 
              placeholder="Door No, Street Name, Landmark"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
              onChange={e => setAddress({...address, address: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Town / City</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Nedumkandam"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                onChange={e => setAddress({...address, city: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Pincode</label>
              <input 
                type="text" 
                required 
                placeholder="685553"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                onChange={e => setAddress({...address, postalCode: e.target.value})} 
              />
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <ShieldCheck size={20} className="mr-2 text-primary-600" />
            Order Summary
          </h2>
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
            <div>
              <p className="font-bold text-gray-900">{product.name}</p>
              <p className="text-xs text-primary-600 font-semibold mt-0.5">₹{product.price} / {product.unit}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Stock Available: {product.stock} {product.unit}</p>
            </div>
            <div className="w-24">
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Quantity</label>
              <input 
                type="number" 
                min="1" 
                max={product.stock} 
                value={qty} 
                onChange={e => setQty(e.target.value)} 
                className="w-full border border-gray-200 rounded-xl p-2 text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary-500" 
              />
            </div>
          </div>
          <div className="flex justify-between text-lg font-extrabold text-gray-900">
            <span>Total Amount:</span>
            <span className="text-primary-700">₹{product.price * Number(qty || 0)}</span>
          </div>
          <div className="mt-4 p-3 bg-primary-50 rounded-xl text-xs text-primary-800 font-semibold flex items-center justify-between">
            <span>Payment Method:</span>
            <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-primary-200">Cash on Delivery</span>
          </div>
        </div>

        <button 
          form="checkout-form" 
          type="submit" 
          className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95"
        >
          Confirm & Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
