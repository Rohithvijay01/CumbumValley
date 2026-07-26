import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';
import { 
  Upload, Image as ImageIcon, CheckCircle2, 
  MapPin, Tag, DollarSign, Package, Layers, Eye, ArrowRight, 
  ArrowLeft, Check, Loader2, ShieldCheck, Sprout, Info, Star, ShoppingCart, Settings
} from 'lucide-react';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Organic Green Cardamom (8mm Bold)',
    category: 'Spices',
    description: 'Freshly harvested 8mm+ bold green cardamom pods from Nedumkandam plantation, Idukki. Hand-sorted, sun-dried with intense aromatic oils.',
    price: '3200',
    unit: 'kg',
    stock: '250',
    district: 'Idukki',
    town: 'Nedumkandam',
    organic: true,
    harvestSeason: 'Winter',
    images: ['/images/products/green-cardamom.jpg'],
    pickupAvailable: true,
  });

  // Presets for Farmers
  const presets = [
    {
      label: 'Idukki Cardamom',
      data: {
        name: 'Premium Idukki 8mm Green Cardamom',
        category: 'Spices',
        description: 'Sun-dried high-altitude green cardamom pods harvested in Nedumkandam, Idukki. Rich aroma and natural green color.',
        price: '3250',
        unit: 'kg',
        stock: '300',
        district: 'Idukki',
        town: 'Nedumkandam',
        organic: true,
        harvestSeason: 'Winter',
        images: ['/images/products/green-cardamom.jpg'],
      },
    },
    {
      label: 'Bodinayakanur Black Pepper',
      data: {
        name: 'Bodinayakanur MG1 Black Peppercorns',
        category: 'Spices',
        description: 'Bold, high-piperine black pepper directly from Western Ghats foothill farms in Bodinayakanur, Theni.',
        price: '680',
        unit: 'kg',
        stock: '500',
        district: 'Theni',
        town: 'Bodinayakanur',
        organic: true,
        harvestSeason: 'Winter',
        images: ['/images/products/black-pepper.jpg'],
      },
    },
    {
      label: 'Cumbum Black Grapes',
      data: {
        name: 'Fresh Cumbum Valley Paneer Grapes',
        category: 'Fruits',
        description: 'Naturally sweet GI-tagged Cumbum black grapes. Direct farm fresh harvest with rich juice content.',
        price: '85',
        unit: 'kg',
        stock: '1000',
        district: 'Theni',
        town: 'Cumbum',
        organic: true,
        harvestSeason: 'Summer',
        images: ['/images/products/cumbum-grapes.jpg'],
      },
    },
    {
      label: 'Munnar Organic Coffee',
      data: {
        name: 'Munnar High-Altitude Arabica Beans',
        category: 'Plantation Crops',
        description: 'Single-origin shade-grown Arabica coffee beans from 1,600m high Munnar hills. Medium roast aroma.',
        price: '540',
        unit: 'kg',
        stock: '150',
        district: 'Idukki',
        town: 'Munnar',
        organic: true,
        harvestSeason: 'Monsoon',
        images: ['/images/products/arabica-coffee-beans.jpg'],
      },
    },
  ];

  const handleApplyPreset = (preset) => {
    setFormData({ ...formData, ...preset.data });
    toast.success(`Applied template: ${preset.label}`, {
      style: { borderRadius: '4px', background: '#047857', color: '#fff' }
    });
  };

  const handleAiMagicFill = () => {
    if (!aiPrompt.trim()) {
      toast.error('Please enter a quick prompt or sentence first.');
      return;
    }
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setFormData({
        ...formData,
        name: 'Organic Farm Fresh ' + (aiPrompt.split(' ')[0] || 'Produce'),
        description: `Premium quality ${aiPrompt} directly harvested from Western Ghats farms. Certified chemical-free, hand-picked for optimum freshness and long shelf life.`,
        price: '450',
        unit: 'kg',
        stock: '200',
        organic: true,
      });
      toast.success('Auto Fill Complete. Form fields updated.');
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        unit: formData.unit,
        stock: Number(formData.stock),
        district: formData.district,
        town: formData.town,
        organic: formData.organic,
        images: formData.images,
      };

      await API.post('/products', payload);
      toast.success('Product listed successfully on AgriConnect.');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to list product.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, title: 'Produce & Media' },
    { num: 2, title: 'Harvest & Location' },
    { num: 3, title: 'Pricing & Stock' },
    { num: 4, title: 'Customer Preview' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded flex flex-col md:flex-row items-start md:items-center justify-between mb-6 shadow-sm">
        <div>
          <div className="inline-flex items-center space-x-2 bg-slate-800 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-2 border border-slate-700">
            <Sprout size={12} className="text-emerald-400" />
            <span>Vendor Console</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Create Product Listing
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl font-mono">
            Publish products to the marketplace. Ensure all details are accurate.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center">
          <Link
            to="/products"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 text-slate-300 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-700 hover:text-white transition-colors"
          >
            Cancel & Return
          </Link>
        </div>
      </div>

      {/* Auto Assistant Bar */}
      <div className="bg-white rounded p-5 border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center uppercase tracking-wider">
              <Settings size={14} className="text-slate-500 mr-2" />
              Quick Fill Tools
            </h3>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder='e.g. "200kg fresh organic Green Cardamom in Nedumkandam at 3200 per kg"'
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="flex-1 w-full px-3 py-2 rounded border border-slate-300 bg-white text-sm font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
          <button
            type="button"
            onClick={handleAiMagicFill}
            disabled={isAiGenerating}
            className="w-full sm:w-auto px-4 py-2 rounded bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider border border-slate-900 hover:bg-slate-700 transition-colors flex justify-center items-center flex-shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isAiGenerating ? (
              <Loader2 size={12} className="animate-spin mr-1.5" />
            ) : (
              <Settings size={12} className="mr-1.5" />
            )}
            {isAiGenerating ? 'Processing' : 'Auto Fill'}
          </button>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="bg-white rounded p-4 border border-slate-200 shadow-sm mb-6">
        <div className="grid grid-cols-4 gap-2">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex flex-col items-center justify-center p-2 rounded transition-colors border cursor-pointer ${
                currentStep === s.num
                  ? 'bg-slate-900 text-white border-slate-900'
                  : currentStep > s.num
                  ? 'bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-white text-slate-400 border-slate-100'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5">Step {s.num}</span>
              <span className="text-xs font-bold truncate hidden sm:block">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Steps + Live Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Panel */}
        <div className="lg:col-span-7 xl:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white rounded p-6 shadow-sm border border-slate-200 space-y-6 min-h-[400px] flex flex-col justify-between">
            <div>
              {/* STEP 1: Produce & Media */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 1: Produce & Media</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Provide the title, category, and photo for your product listing.</p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Listing Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Premium Organic Green Cardamom"
                      className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="Spices">Spices (Cardamom, Pepper, Clove)</option>
                        <option value="Plantation Crops">Plantation Crops (Coffee, Tea)</option>
                        <option value="Fruits">Fruits (Grapes, Mango, Banana)</option>
                        <option value="Vegetables">Vegetables (Tomato, Carrot, Potato)</option>
                        <option value="Seeds">Seeds & Saplings</option>
                        <option value="Fertilizers">Organic Fertilizers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Image File Path
                      </label>
                      <input
                        type="text"
                        value={formData.images[0] || ''}
                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                        placeholder="/images/products/green-cardamom.jpg"
                        className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Description & Quality Notes
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe aroma, pod size, sun-drying method, or harvest date..."
                      className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 2: Harvest & Location */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 2: Harvest & Regional Details</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Specify district, town, harvest season, and organic certification.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        District
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="Idukki">Idukki (Highland Spices & Tea)</option>
                        <option value="Theni">Theni (Valley Fruits & Vegetables)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Town / Village
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.town}
                        onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                        placeholder="e.g. Nedumkandam, Cumbum, Munnar..."
                        className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded border border-slate-200 bg-slate-50">
                    <input
                      id="organicCheck"
                      type="checkbox"
                      checked={formData.organic}
                      onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                      className="h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="organicCheck" className="text-xs font-bold uppercase tracking-wider text-slate-700 cursor-pointer">
                      Certified Organic Produce
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: Pricing & Inventory */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 3: Pricing & Stock Level</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Set fair market pricing and available inventory.</p>
                  </div>

                  {/* Market Price Benchmark Badge */}
                  <div className="p-3 rounded border border-slate-200 bg-slate-50 flex items-start justify-between">
                    <div className="flex space-x-2">
                      <Info className="text-slate-400 mt-0.5 flex-shrink-0" size={14} />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Live Regional Market Benchmark</p>
                        <p className="text-xs font-mono text-slate-500 mt-0.5">Average {formData.category} price in {formData.district}: ₹500 - ₹3,500/{formData.unit}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Unit
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="kg">kg (Kilogram)</option>
                        <option value="quintal">quintal (100 kg)</option>
                        <option value="box">box / crate</option>
                        <option value="bunch">bunch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Live Customer Preview & Submit */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 4: Confirm & Publish Listing</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Review your product details before publishing to customers.</p>
                  </div>

                  <div className="p-4 rounded border border-emerald-200 bg-emerald-50 flex items-start space-x-3">
                    <ShieldCheck className="text-emerald-700 mt-0.5" size={16} />
                    <p className="text-xs text-emerald-900 font-mono leading-relaxed">
                      Your listing will be instantly live on the AgriConnect marketplace for buyers in Tamil Nadu, Kerala, and across India. Ensure all details are accurate.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Navigation Buttons */}
            <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-4 py-2 rounded border border-slate-200 bg-white text-slate-700 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center"
                >
                  <ArrowLeft size={14} className="mr-1.5" /> Previous
                </button>
              ) : <div></div>}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-4 py-2 rounded border border-slate-900 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center"
                >
                  Next <ArrowRight size={14} className="ml-1.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider border border-emerald-800 hover:bg-emerald-600 transition-colors flex items-center"
                >
                  {loading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Check size={14} className="mr-2" />}
                  {loading ? 'Publishing...' : 'Publish Listing'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Panel: Real-time Live Marketplace Card Preview */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <Eye size={12} className="text-slate-500 mr-1.5" />
                Card Preview
              </h3>
            </div>

            {/* Mock Product Card matching Products.jsx redesign */}
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden group hover:border-emerald-500 transition-colors shadow-sm">
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img 
                  src={formData.images[0] || '/images/products/green-cardamom.jpg'}
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/images/products/green-cardamom.jpg'; }}
                />
                
                {/* Badges Overlay */}
                <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                  {formData.organic && (
                    <span className="bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm shadow-sm">
                      Organic
                    </span>
                  )}
                  <span className="bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm shadow-sm">
                    {formData.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col h-[140px]">
                {/* Location & Title */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center text-[10px] font-mono text-slate-500 uppercase tracking-wide">
                    <MapPin size={10} className="mr-1" />
                    <span className="truncate">{formData.town || 'Town'}, {formData.district}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-sm text-slate-900 leading-tight line-clamp-2 mb-auto group-hover:text-emerald-700 transition-colors">
                  {formData.name || 'Product Title'}
                </h3>

                {/* Price & Action */}
                <div className="flex items-end justify-between pt-3 border-t border-slate-100 mt-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Price</p>
                    <div className="flex items-baseline text-slate-900">
                      <span className="text-sm font-bold mr-0.5">₹</span>
                      <span className="text-lg font-bold font-mono tracking-tight">{formData.price || '0'}</span>
                      <span className="text-[10px] text-slate-500 ml-1">/{formData.unit}</span>
                    </div>
                  </div>
                  <button className="h-8 w-8 rounded border border-slate-200 flex items-center justify-center text-slate-700 bg-slate-50">
                    <ShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
