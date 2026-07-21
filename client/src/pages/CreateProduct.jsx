import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../services/api';
import toast from 'react-hot-toast';
import { 
  Sparkles, Wand2, Upload, Image as ImageIcon, CheckCircle2, 
  MapPin, Tag, DollarSign, Package, Layers, Eye, ArrowRight, 
  ArrowLeft, Check, Loader2, ShieldCheck, Sprout, Info, Star, ShoppingCart
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
      label: '🌿 Idukki Cardamom',
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
      label: '🌶️ Bodinayakanur Black Pepper',
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
      label: '🍇 Cumbum Black Grapes',
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
      label: '☕ Munnar Organic Coffee',
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
      style: { borderRadius: '16px', background: '#15803D', color: '#fff' }
    });
  };

  const handleAiMagicFill = () => {
    if (!aiPrompt.trim()) {
      toast.error('Please enter a quick prompt or sentence first!');
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
      toast.success('AI Magic Fill Complete! Form fields updated. ✨');
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
      toast.success('🎉 Product listed successfully on AgriConnect!');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-700 p-8 text-white shadow-xl mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-primary-100 mb-3 border border-white/20">
              <Sprout size={14} className="text-emerald-300" />
              <span>Farmer Self-Service Listing Studio 2030</span>
            </span>
            <h1 className="text-3xl font-display font-extrabold text-white">
              Sell Directly to Customers & Wholesalers
            </h1>
            <p className="text-primary-100 text-sm mt-1 max-w-xl">
              List your spices, fruits, and produce in minutes with AI Auto-Fill, zero commission fees, and direct farm pickup options.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md transition-colors"
            >
              Cancel & Return
            </Link>
          </div>
        </div>
      </div>

      {/* AI Quick Assistant Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center">
              <Sparkles size={18} className="text-amber-500 mr-2" />
              AI Magic Auto-Fill Prompt
            </h3>
            <p className="text-xs text-gray-500">Type or dictate a sentence about your harvest, and AI will complete your listing.</p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder='e.g. "I harvested 200kg of fresh organic Green Cardamom in Nedumkandam at 3200 per kg"'
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
          <button
            type="button"
            onClick={handleAiMagicFill}
            disabled={isAiGenerating}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-xs shadow-md hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center flex-shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isAiGenerating ? (
              <Loader2 size={16} className="animate-spin mr-1.5" />
            ) : (
              <Wand2 size={16} className="mr-1.5" />
            )}
            {isAiGenerating ? 'Generating...' : 'AI Magic Fill'}
          </button>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 mb-8">
        <div className="grid grid-cols-4 gap-2 text-center">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all cursor-pointer ${
                currentStep === s.num
                  ? 'bg-primary-600 text-white shadow-md'
                  : currentStep > s.num
                  ? 'bg-primary-50 text-primary-800'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              <span className="text-xs font-extrabold uppercase tracking-wider mb-1">Step {s.num}</span>
              <span className="text-xs sm:text-sm font-bold truncate">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Steps + Live Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Panel */}
        <div className="lg:col-span-7 xl:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-gray-100 space-y-6">
            <AnimatePresence mode="wait">
              {/* STEP 1: Produce & Media */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-display font-bold text-gray-900">Step 1: Produce & Media</h2>
                    <p className="text-xs text-gray-500">Provide the title, category, and photo for your product listing.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Listing Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Premium Organic Green Cardamom"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Image File Path / Asset
                      </label>
                      <input
                        type="text"
                        value={formData.images[0] || ''}
                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                        placeholder="/images/products/green-cardamom.jpg"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Description & Quality Notes
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe aroma, pod size, sun-drying method, or harvest date..."
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    ></textarea>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Harvest & Location */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-display font-bold text-gray-900">Step 2: Harvest & Regional Details</h2>
                    <p className="text-xs text-gray-500">Specify district, town, harvest season, and organic certification.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        District
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      >
                        <option value="Idukki">Idukki (Highland Spices & Tea)</option>
                        <option value="Theni">Theni (Valley Fruits & Vegetables)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Town / Village
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.town}
                        onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                        placeholder="e.g. Nedumkandam, Cumbum, Munnar..."
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-primary-50/60 border border-primary-100">
                    <input
                      id="organicCheck"
                      type="checkbox"
                      checked={formData.organic}
                      onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                      className="h-5 w-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <label htmlFor="organicCheck" className="text-sm font-bold text-primary-900 cursor-pointer">
                      Certified Organic & Chemical-Free Produce Badge
                    </label>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Pricing & Inventory */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-display font-bold text-gray-900">Step 3: Pricing & Stock Level</h2>
                    <p className="text-xs text-gray-500">Set fair market pricing and available inventory.</p>
                  </div>

                  {/* Market Price Benchmark Badge */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Info className="text-amber-600 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs font-bold text-amber-900">Live Regional Market Benchmark</p>
                        <p className="text-[11px] text-amber-700">Average {formData.category} price in {formData.district}: ₹500 - ₹3,500/{formData.unit}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Unit
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      >
                        <option value="kg">kg (Kilogram)</option>
                        <option value="quintal">quintal (100 kg)</option>
                        <option value="box">box / crate</option>
                        <option value="bunch">bunch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Live Customer Preview & Submit */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-display font-bold text-gray-900">Step 4: Confirm & Publish Listing</h2>
                    <p className="text-xs text-gray-500">Review your product details before publishing to customers.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3">
                    <ShieldCheck className="text-emerald-600" size={24} />
                    <p className="text-xs text-emerald-900 font-medium">
                      Your listing will be instantly live on the AgriConnect marketplace for buyers in Tamil Nadu, Kerala, and across India!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wizard Navigation Buttons */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-5 py-2.5 rounded-2xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors flex items-center"
                >
                  <ArrowLeft size={16} className="mr-1.5" /> Previous Step
                </button>
              ) : <div></div>}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-6 py-2.5 rounded-2xl bg-primary-600 text-white font-bold text-xs hover:bg-primary-700 shadow-md transition-colors flex items-center"
                >
                  Next Step <ArrowRight size={16} className="ml-1.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-extrabold text-sm shadow-xl hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center"
                >
                  {loading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Check size={18} className="mr-2" />}
                  {loading ? 'Publishing...' : 'Publish Product Listing'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Panel: Real-time Live Marketplace Card Preview */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 flex items-center">
                <Eye size={18} className="text-primary-600 mr-2" />
                Live Marketplace Card Preview
              </h3>
              <span className="text-[10px] font-bold bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                Buyer's View
              </span>
            </div>

            {/* Mock Product Card matching Marketplace */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {formData.organic && (
                  <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center">
                    <CheckCircle2 size={10} className="mr-1" /> ORGANIC
                  </span>
                )}
              </div>

              {/* Image */}
              <div className="bg-gray-50 p-2 w-full relative">
                <img
                  src={formData.images[0] || '/images/products/green-cardamom.jpg'}
                  alt="Preview"
                  className="w-full aspect-square object-cover rounded-xl"
                  style={{ borderRadius: '12px' }}
                  onError={(e) => { e.target.src = '/images/products/green-cardamom.jpg'; }}
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1 shadow-sm">
                  <span className="text-xs font-bold">5.0</span>
                  <Star size={10} className="text-yellow-400 fill-current" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col">
                <div className="text-xs text-gray-400 font-medium mb-1">Direct Farm Produce</div>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-2">
                  {formData.name || 'Product Title'}
                </h3>

                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                  <MapPin size={12} className="text-primary-500" />
                  <span>{formData.town || 'Town'}, {formData.district}</span>
                </div>

                <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-900 leading-none">
                      ₹{formData.price || '0'}
                      <span className="text-xs font-normal text-gray-500 ml-0.5">/{formData.unit}</span>
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                    <ShoppingCart size={14} />
                  </div>
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
