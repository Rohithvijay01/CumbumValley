import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Spices',
    description: '',
    price: '',
    unit: 'kg',
    stock: '',
    location: 'Theni',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', formData);
      toast.success('Product listed successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to list product');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">List New Product</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={handleChange}>
              <option value="Spices">Spices</option>
              <option value="Plantation">Plantation</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" required rows="3" className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={handleChange}></textarea>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input type="number" name="price" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit (e.g. kg)</label>
            <input type="text" name="unit" required defaultValue="kg" className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Available</label>
            <input type="number" name="stock" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Source Location</label>
          <select name="location" className="mt-1 block w-full border border-gray-300 rounded-md p-2" onChange={handleChange}>
            <option value="Theni">Theni, Tamil Nadu</option>
            <option value="Idukki">Idukki, Kerala</option>
          </select>
        </div>

        <button type="submit" className="w-full mt-4 bg-primary-600 text-white font-medium py-2 rounded-md hover:bg-primary-700">
          Publish Listing
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
