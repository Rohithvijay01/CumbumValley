import { useState, useEffect, useCallback } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, MapPin, Tag, Loader2, Star, CheckCircle, Search, FilterX, ChevronLeft, ChevronRight } from 'lucide-react';

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get('search') || searchParams.get('keyword') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  
  // Filter States
  const [filters, setFilters] = useState({
    keyword: initialKeyword,
    category: '',
    district: '',
    town: '',
    organic: '',
    harvestSeason: '',
    rating: '',
    minPrice: '',
    maxPrice: '',
    isAvailable: 'true',
    sort: 'createdAt_-1'
  });

  const categories = ['Spices', 'Plantation Crops', 'Fruits', 'Vegetables', 'Seeds', 'Fertilizers', 'Plant Saplings', 'Organic Products'];
  const districts = ['Theni', 'Idukki'];
  const harvestSeasons = ['Summer', 'Winter', 'Monsoon', 'All Year'];

  // Fetch products with debouncing support for search
  const fetchProducts = useCallback(async (currentFilters, page = 1) => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 12);
      
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value !== '' && value !== null) {
          params.append(key, value);
        }
      });

      const { data } = await API.get(`/products?${params.toString()}`);
      setProducts(data.data);
      setPagination({
        page: data.page,
        pages: data.pages,
        total: data.total
      });
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchProducts(newFilters, 1); // Reset to page 1 on filter change
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchProducts(filters, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearFilters = () => {
    const reset = {
      keyword: '', category: '', district: '', town: '', organic: '', 
      harvestSeason: '', rating: '', minPrice: '', maxPrice: '', 
      isAvailable: 'true', sort: 'createdAt_-1'
    };
    setFilters(reset);
    fetchProducts(reset, 1);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(filters, 1);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [filters.keyword]);

  // Initial load and URL param changes
  useEffect(() => {
    const urlKeyword = searchParams.get('search') || searchParams.get('keyword') || '';
    if (urlKeyword !== filters.keyword) {
      setFilters(prev => ({ ...prev, keyword: urlKeyword }));
      fetchProducts({ ...filters, keyword: urlKeyword }, 1);
    } else {
      fetchProducts(filters, 1);
    }
  }, [searchParams]);

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">Regional Marketplace</h2>
          <p className="text-muted-foreground mt-1">Authentic agriculture products from Theni and Idukki</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={filters.keyword}
              onChange={(e) => setFilters({...filters, keyword: e.target.value})}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64"
            />
          </div>
          
          <select 
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="createdAt_-1">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar (Filters) */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={clearFilters} className="text-sm text-red-500 flex items-center hover:underline">
              <FilterX size={14} className="mr-1" /> Clear
            </button>
          </div>
          
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-sm space-y-6">
            
            {/* Category Filter */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-gray-700">Category</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category"
                      checked={filters.category === cat}
                      onChange={() => handleFilterChange('category', cat)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-gray-700">Region (District)</h4>
              <select 
                value={filters.district} 
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="w-full text-sm border-gray-200 rounded-md p-2 bg-gray-50 focus:bg-white"
              >
                <option value="">All Regions</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-gray-700">Price Range (₹)</h4>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full p-2 text-sm border border-gray-200 rounded-md"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full p-2 text-sm border border-gray-200 rounded-md"
                />
              </div>
            </div>

            {/* Specific Traits */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-gray-700">Features</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.organic === 'true'}
                    onChange={(e) => handleFilterChange('organic', e.target.checked ? 'true' : '')}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">Organic Only</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.isAvailable === 'true'}
                    onChange={(e) => handleFilterChange('isAvailable', e.target.checked ? 'true' : '')}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">In Stock</span>
                </label>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-gray-700">Rating</h4>
              <div className="space-y-2">
                {[4, 3].map(rating => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="rating"
                      checked={filters.rating === String(rating)}
                      onChange={() => handleFilterChange('rating', String(rating))}
                      className="text-primary-600"
                    />
                    <span className="text-sm text-gray-600 flex items-center">
                      {rating}+ <Star size={12} className="ml-1 text-yellow-400 fill-current" />
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Section (Product Grid) */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-500">
            Showing {products.length > 0 ? ((pagination.page - 1) * 12) + 1 : 0} - {Math.min(pagination.page * 12, pagination.total)} of {pagination.total} products
          </div>

          {loading && products.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-primary-600">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="font-medium">Loading marketplace...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-border shadow-sm">
              <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="mt-4 text-primary-600 font-medium hover:underline">Clear all filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-md shadow-sm hover:shadow-md border border-slate-200 overflow-hidden transition-shadow group flex flex-col h-full relative">
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                      {product.organic && (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">
                          ORGANIC
                        </span>
                      )}
                      {!product.isAvailable && (
                        <span className="bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          OUT OF STOCK
                        </span>
                      )}
                    </div>

                    {/* Image Area */}
                    <div className="bg-slate-50 w-full relative border-b border-slate-100">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full aspect-[4/3] object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full aspect-[4/3] bg-slate-100 text-slate-400">
                          <Tag size={32} />
                        </div>
                      )}
                      
                      {/* Rating Badge Overlay */}
                      {product.rating > 0 && (
                        <div className="absolute bottom-2 left-2 bg-white px-1.5 py-0.5 rounded border border-slate-200 flex items-center space-x-1 shadow-sm">
                          <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                          <Star size={10} className="text-amber-400 fill-current" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content Area */}
                    <div className="p-3 flex flex-col flex-1">
                      <div className="text-[11px] text-slate-500 mb-1 font-medium uppercase tracking-wider">{product.vendorName || product.farmer?.name}</div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug mb-2 group-hover:text-primary-700 transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mb-3 flex-1">
                        <MapPin size={12} className="text-slate-400" />
                        <span className="truncate">{product.town}, {product.district}</span>
                      </div>
                      
                      <div className="flex items-end justify-between pt-3 border-t border-slate-100 mt-auto">
                        <div className="flex flex-col">
                          <span className="font-bold text-lg text-slate-900 leading-none">
                            ₹{product.price}
                            <span className="text-xs font-normal text-slate-500 ml-0.5">/{product.unit}</span>
                          </span>
                        </div>
                        <Link 
                          to={`/checkout?product=${product._id}`} 
                          className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center justify-center transition-colors border ${
                            product.isAvailable 
                              ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-primary-500 hover:text-primary-700' 
                              : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed pointer-events-none'
                          }`}
                        >
                          Buy
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-10 flex items-center justify-center space-x-2">
                  <button 
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex space-x-1">
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          pagination.page === i + 1 
                            ? 'bg-primary-600 text-white shadow-md' 
                            : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
