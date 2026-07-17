import { useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data.data);
      } catch (err) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading products...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Marketplace</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="text-xs font-semibold text-primary-600 mb-1">{product.category} &bull; {product.location}</div>
                <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-gray-900">₹{product.price} / {product.unit}</span>
                  <Link to={`/checkout?product=${product._id}`} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-primary-100">
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
