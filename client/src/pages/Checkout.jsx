import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

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
      toast.success('Order placed successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to place order');
    }
  };

  if (!product) return <div>Loading checkout...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
        <form id="checkout-form" onSubmit={handleOrder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={e => setAddress({...address, address: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={e => setAddress({...address, city: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={e => setAddress({...address, postalCode: e.target.value})} />
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between border-b pb-4 mb-4">
          <div>
            <p className="font-bold">{product.name}</p>
            <p className="text-sm text-gray-500">₹{product.price} / {product.unit}</p>
          </div>
          <div className="w-20">
            <input type="number" min="1" max={product.stock} value={qty} onChange={e => setQty(e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-center" />
          </div>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>₹{product.price * qty}</span>
        </div>
        <div className="mt-2 text-sm text-gray-500 text-right">Payment: Cash on Delivery</div>
        <button form="checkout-form" type="submit" className="w-full mt-6 bg-primary-600 text-white font-medium py-2 rounded-md hover:bg-primary-700">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
