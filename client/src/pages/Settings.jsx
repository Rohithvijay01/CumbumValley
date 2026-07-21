import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  User, Shield, Bell, Globe, Sun, Moon, Leaf, Lock, 
  Smartphone, Check, Save, CloudRain, TrendingUp, Sliders, 
  Eye, Database, MapPin, Sparkles, AlertCircle, RefreshCw, Key
} from 'lucide-react';

const Settings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('account');
  const [saving, setSaving] = useState(false);

  // Form states
  const [accountData, setAccountData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    phone: '+91 98421 78901',
    district: 'Idukki',
    town: 'Nedumkandam',
  });

  const [agriPrefs, setAgriPrefs] = useState({
    defaultRegion: 'Idukki & Theni Belt',
    tradeUnit: 'kg',
    organicOnly: true,
    priceAlertThreshold: 15,
    cropFocus: ['Cardamom', 'Black Pepper', 'Coffee'],
    weatherAlerts: true,
    directFarmPickup: true,
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    smsWeather: true,
    whatsAppPriceDrops: true,
    pushPromos: false,
    weeklyMarketReport: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    sessionTimeout: '30',
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    density: 'comfortable',
    reducedMotion: false,
    highContrast: false,
  });

  const tabs = [
    { id: 'account', label: 'Account Profile', icon: User, badge: null },
    { id: 'agri', label: 'Market & Crops', icon: Leaf, badge: 'Agri' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '5' },
    { id: 'security', label: 'Security & 2FA', icon: Shield, badge: 'Active' },
    { id: 'appearance', label: 'Appearance & UI', icon: Sun, badge: null },
    { id: 'privacy', label: 'Privacy & Data', icon: Database, badge: null },
  ];

  const handleSave = (sectionName) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success(`${sectionName} saved successfully! 🌿`, {
        style: {
          borderRadius: '16px',
          background: '#15803D',
          color: '#fff',
        },
      });
    }, 600);
  };

  const ToggleSwitch = ({ enabled, onChange, label, description, icon: Icon }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start space-x-3 pr-4">
        {Icon && <Icon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />}
        <div>
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          enabled ? 'bg-primary-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-800 via-primary-700 to-secondary-600 p-8 text-white shadow-xl mb-8">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-primary-100 mb-3 border border-white/20">
              <Sparkles size={14} className="text-yellow-300" />
              <span>AgriConnect Hub Settings</span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
              Preferences & Configuration
            </h1>
            <p className="text-primary-100 text-sm mt-1 max-w-xl">
              Customize your marketplace experience, regional crop notifications, security locks, and regional trading units for Theni & Idukki.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleSave(tabs.find(t => t.id === activeTab)?.label || 'Settings')}
              disabled={saving}
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-white text-primary-800 font-bold text-sm shadow-lg hover:bg-primary-50 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw size={18} className="mr-2 animate-spin text-primary-600" />
              ) : (
                <Save size={18} className="mr-2 text-primary-600" />
              )}
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="bg-white rounded-3xl p-3 shadow-soft border border-gray-100 sticky top-24">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-primary-100 text-primary-800'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Tab Content Panel */}
        <div className="lg:col-span-8 xl:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-gray-100"
            >
              {/* Tab 1: Account */}
              {activeTab === 'account' && (
                <div>
                  <div className="border-b border-gray-100 pb-5 mb-6 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-display font-bold text-gray-900">Account Profile</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Manage your personal identification and regional location details.</p>
                    </div>
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold">
                      {userInfo?.role || 'Customer'}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={accountData.name}
                          onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={accountData.email}
                          onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Phone Number (SMS & WhatsApp)
                        </label>
                        <input
                          type="text"
                          value={accountData.phone}
                          onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Primary Agricultural District
                        </label>
                        <select
                          value={accountData.district}
                          onChange={(e) => setAccountData({ ...accountData, district: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-medium transition-all"
                        >
                          <option value="Idukki">Idukki (Spices & Plantation)</option>
                          <option value="Theni">Theni (Fruits, Vegetables & Grapes)</option>
                          <option value="Madurai">Madurai (Trading & Distribution)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                        Town / Village Address
                      </label>
                      <input
                        type="text"
                        value={accountData.town}
                        onChange={(e) => setAccountData({ ...accountData, town: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-medium transition-all"
                        placeholder="e.g. Nedumkandam, Cumbum, Bodinayakanur..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Agri Preferences */}
              {activeTab === 'agri' && (
                <div>
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-xl font-display font-bold text-gray-900">Marketplace & Crop Preferences</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Customize default trading units, crop filters, and local farming alerts.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Default Trade Unit
                        </label>
                        <select
                          value={agriPrefs.tradeUnit}
                          onChange={(e) => setAgriPrefs({ ...agriPrefs, tradeUnit: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-medium transition-all"
                        >
                          <option value="kg">Kilograms (kg)</option>
                          <option value="quintal">Quintal (100 kg)</option>
                          <option value="ton">Metric Tonne</option>
                          <option value="box">Standard Farm Crate / Box</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Price Drop Alert Sensitivity
                        </label>
                        <div className="flex items-center space-x-4 pt-2">
                          <input
                            type="range"
                            min="5"
                            max="30"
                            step="5"
                            value={agriPrefs.priceAlertThreshold}
                            onChange={(e) => setAgriPrefs({ ...agriPrefs, priceAlertThreshold: Number(e.target.value) })}
                            className="w-full accent-primary-600 cursor-pointer"
                          />
                          <span className="text-sm font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-xl border border-primary-200">
                            {agriPrefs.priceAlertThreshold}% Drop
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100 rounded-2xl bg-gray-50 p-4 border border-gray-200/80">
                      <ToggleSwitch
                        enabled={agriPrefs.organicOnly}
                        onChange={(val) => setAgriPrefs({ ...agriPrefs, organicOnly: val })}
                        label="Organic Only Filter by Default"
                        description="Automatically highlight certified organic produce from Western Ghats farmers."
                        icon={Leaf}
                      />
                      <ToggleSwitch
                        enabled={agriPrefs.weatherAlerts}
                        onChange={(val) => setAgriPrefs({ ...agriPrefs, weatherAlerts: val })}
                        label="Theni & Idukki Weather & Rainfall Alerts"
                        description="Get notified about rainfall forecasts and harvesting conditions in your district."
                        icon={CloudRain}
                      />
                      <ToggleSwitch
                        enabled={agriPrefs.directFarmPickup}
                        onChange={(val) => setAgriPrefs({ ...agriPrefs, directFarmPickup: val })}
                        label="Enable Direct Farm Pickup Option"
                        description="Show farm-gate pickup options when buying directly from verified growers."
                        icon={MapPin}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Notifications */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-xl font-display font-bold text-gray-900">Notifications & Channels</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Control how and when you receive order updates and market intelligence.</p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200/80 space-y-1">
                    <ToggleSwitch
                      enabled={notifications.whatsAppPriceDrops}
                      onChange={(val) => setNotifications({ ...notifications, whatsAppPriceDrops: val })}
                      label="WhatsApp Market Price Alerts"
                      description="Instant WhatsApp messages when Cardamom, Pepper, or Tea prices fluctuate."
                      icon={Smartphone}
                    />
                    <ToggleSwitch
                      enabled={notifications.smsWeather}
                      onChange={(val) => setNotifications({ ...notifications, smsWeather: val })}
                      label="SMS Order & Dispatch Status"
                      description="Receive SMS notifications for real-time tracking of farm dispatches."
                      icon={Bell}
                    />
                    <ToggleSwitch
                      enabled={notifications.emailOrders}
                      onChange={(val) => setNotifications({ ...notifications, emailOrders: val })}
                      label="Email Invoices & Receipts"
                      description="Tax compliant invoices sent directly to your inbox upon order confirmation."
                      icon={Globe}
                    />
                    <ToggleSwitch
                      enabled={notifications.weeklyMarketReport}
                      onChange={(val) => setNotifications({ ...notifications, weeklyMarketReport: val })}
                      label="Weekly Regional Spices Digest"
                      description="Curated market analysis for Idukki Spices Auction & Cumbum Fruit Market."
                      icon={TrendingUp}
                    />
                  </div>
                </div>
              )}

              {/* Tab 4: Security */}
              {activeTab === 'security' && (
                <div>
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-xl font-display font-bold text-gray-900">Security & Authentication</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Manage 2-Factor Authentication, login security, and passwords.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200/80">
                      <ToggleSwitch
                        enabled={security.twoFactor}
                        onChange={(val) => setSecurity({ ...security, twoFactor: val })}
                        label="Two-Factor Authentication (2FA)"
                        description="Require an OTP sent to your registered mobile device upon every login."
                        icon={Shield}
                      />
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-6 bg-white space-y-4">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center">
                        <Key className="w-4 h-4 text-primary-600 mr-2" />
                        Change Account Password
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1">Current Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={security.currentPassword}
                            onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1">New Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={security.newPassword}
                            onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1">Confirm Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={security.confirmPassword}
                            onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Appearance */}
              {activeTab === 'appearance' && (
                <div>
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-xl font-display font-bold text-gray-900">Appearance & Theme</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Customize the visual density, dark mode, and interface aesthetics.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                        Color Mode
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: 'light', label: 'Light Mode', icon: Sun },
                          { id: 'dark', label: 'Dark Mode', icon: Moon },
                          { id: 'system', label: 'System Theme', icon: Sliders },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setAppearance({ ...appearance, theme: item.id })}
                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                              appearance.theme === item.id
                                ? 'border-primary-600 bg-primary-50/50 text-primary-800 font-bold shadow-sm'
                                : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            <item.icon className="w-6 h-6 mb-2" />
                            <span className="text-xs">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: Privacy */}
              {activeTab === 'privacy' && (
                <div>
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-xl font-display font-bold text-gray-900">Privacy & Data Management</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Export your trade logs or manage personal data access permissions.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-2xl bg-gray-50 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-900">Download Account & Purchase History</p>
                        <p className="text-xs text-gray-500">Get a JSON archive of your orders, saved addresses, and farm inquiries.</p>
                      </div>
                      <button
                        onClick={() => toast.success('Data export initiated! Check your email soon.')}
                        className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 transition-colors"
                      >
                        Export Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => toast.error('Changes discarded')}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition-colors"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(tabs.find(t => t.id === activeTab)?.label || 'Settings')}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-bold shadow-md shadow-primary-600/20 hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Check size={16} className="mr-1.5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
