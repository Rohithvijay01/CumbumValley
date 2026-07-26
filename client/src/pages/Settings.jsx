import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { 
  User, Shield, Bell, Globe, Sun, Moon, Leaf, Lock, 
  Smartphone, Check, Save, CloudRain, TrendingUp, Sliders, 
  Eye, Database, MapPin, Sparkles, AlertCircle, RefreshCw, Key
} from 'lucide-react';

const Settings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { theme: activeTheme, setTheme } = useTheme();
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
      toast.success(`${sectionName} saved successfully.`);
    }, 600);
  };

  const ToggleSwitch = ({ enabled, onChange, label, description, icon: Icon }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
      <div className="flex items-start space-x-3 pr-4">
        {Icon && <Icon className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />}
        <div>
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">{label}</p>
          {description && <p className="text-[11px] font-mono text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded border transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
          enabled ? 'bg-emerald-700 border-emerald-800' : 'bg-slate-200 border-slate-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-[2px] bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded flex flex-col md:flex-row items-start md:items-center justify-between mb-6 shadow-sm">
        <div>
          <div className="inline-flex items-center space-x-2 bg-slate-800 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-2 border border-slate-700">
            <Sliders size={12} className="text-slate-400" />
            <span>Platform Settings</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Preferences & Configuration
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl font-mono">
            Customize your marketplace experience, security locks, and trading units.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center">
          <button
            onClick={() => handleSave(tabs.find(t => t.id === activeTab)?.label || 'Settings')}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 rounded bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider border border-emerald-800 hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw size={14} className="mr-2 animate-spin" />
            ) : (
              <Save size={14} className="mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="bg-white rounded p-2 border border-slate-200 sticky top-24 shadow-sm">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors border ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 border-slate-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-800' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          isActive
                            ? 'bg-slate-200 text-slate-800'
                            : 'bg-slate-100 text-slate-500'
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
          <div className="bg-white rounded p-6 sm:p-8 shadow-sm border border-slate-200 min-h-[400px]">
              {/* Tab 1: Account */}
              {activeTab === 'account' && (
                <div>
                  <div className="border-b border-slate-100 pb-3 mb-5 flex justify-between items-center">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Account Profile</h2>
                      <p className="text-xs font-mono text-slate-500 mt-1">Manage your personal identification and regional details.</p>
                    </div>
                    <span className="px-2 py-1 border border-slate-200 bg-slate-50 text-slate-700 rounded text-[10px] font-bold uppercase tracking-wider">
                      {userInfo?.role || 'Customer'}
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={accountData.name}
                          onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={accountData.email}
                          onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number (SMS & WhatsApp)
                        </label>
                        <input
                          type="text"
                          value={accountData.phone}
                          onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Primary Agricultural District
                        </label>
                        <select
                          value={accountData.district}
                          onChange={(e) => setAccountData({ ...accountData, district: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        >
                          <option value="Idukki">Idukki (Spices & Plantation)</option>
                          <option value="Theni">Theni (Fruits & Vegetables)</option>
                          <option value="Madurai">Madurai (Trading & Distribution)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Town / Village Address
                      </label>
                      <input
                        type="text"
                        value={accountData.town}
                        onChange={(e) => setAccountData({ ...accountData, town: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="e.g. Nedumkandam, Cumbum, Bodinayakanur..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Agri Preferences */}
              {activeTab === 'agri' && (
                <div>
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Marketplace & Crop Preferences</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Customize default trading units, crop filters, and local farming alerts.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Default Trade Unit
                        </label>
                        <select
                          value={agriPrefs.tradeUnit}
                          onChange={(e) => setAgriPrefs({ ...agriPrefs, tradeUnit: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-slate-300 bg-white font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        >
                          <option value="kg">Kilograms (kg)</option>
                          <option value="quintal">Quintal (100 kg)</option>
                          <option value="ton">Metric Tonne</option>
                          <option value="box">Standard Farm Crate / Box</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Price Drop Alert Sensitivity
                        </label>
                        <div className="flex items-center space-x-4 pt-1">
                          <input
                            type="range"
                            min="5"
                            max="30"
                            step="5"
                            value={agriPrefs.priceAlertThreshold}
                            onChange={(e) => setAgriPrefs({ ...agriPrefs, priceAlertThreshold: Number(e.target.value) })}
                            className="w-full accent-slate-800 cursor-pointer"
                          />
                          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded border border-slate-200">
                            {agriPrefs.priceAlertThreshold}% Drop
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-100 rounded border border-slate-200 bg-white px-4">
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
                        label="Theni & Idukki Weather Alerts"
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
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Notifications & Channels</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Control how and when you receive order updates and market intelligence.</p>
                  </div>

                  <div className="rounded border border-slate-200 bg-white px-4 divide-y divide-slate-100">
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
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Security & Authentication</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Manage 2-Factor Authentication, login security, and passwords.</p>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded border border-slate-200 bg-white px-4">
                      <ToggleSwitch
                        enabled={security.twoFactor}
                        onChange={(val) => setSecurity({ ...security, twoFactor: val })}
                        label="Two-Factor Authentication (2FA)"
                        description="Require an OTP sent to your registered mobile device upon every login."
                        icon={Shield}
                      />
                    </div>

                    <div className="border border-slate-200 rounded p-5 bg-slate-50 space-y-4">
                      <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center mb-3">
                        <Key className="w-3.5 h-3.5 text-slate-500 mr-2" />
                        Change Account Password
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Current Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={security.currentPassword}
                            onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-mono transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">New Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={security.newPassword}
                            onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-mono transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Confirm Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={security.confirmPassword}
                            onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-mono transition-colors"
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
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Appearance & Theme</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Customize the visual density, dark mode, and interface aesthetics.</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-3">
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
                            onClick={() => {
                              setAppearance({ ...appearance, theme: item.id });
                              setTheme(item.id);
                              toast.success(`Theme updated to ${item.label}`);
                            }}
                            className={`flex flex-col items-center justify-center p-4 rounded border transition-colors ${
                              activeTheme === item.id
                                ? 'border-slate-900 bg-slate-100 text-slate-900 font-bold'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <item.icon className="w-5 h-5 mb-2" />
                            <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
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
                  <div className="border-b border-slate-100 pb-3 mb-5">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Privacy & Data Management</h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">Export your trade logs or manage personal data access permissions.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-slate-200 rounded bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Download Account & Purchase History</p>
                        <p className="text-[11px] font-mono text-slate-500 mt-0.5">Get a JSON archive of your orders, saved addresses, and farm inquiries.</p>
                      </div>
                      <button
                        onClick={() => toast.success('Data export initiated! Check your email soon.')}
                        className="px-4 py-2 bg-slate-800 text-white rounded text-[10px] font-bold uppercase tracking-wider border border-slate-900 hover:bg-slate-700 transition-colors whitespace-nowrap flex-shrink-0"
                      >
                        Export Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => toast.error('Changes discarded')}
                  className="px-4 py-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(tabs.find(t => t.id === activeTab)?.label || 'Settings')}
                  className="px-4 py-2 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider border border-emerald-800 hover:bg-emerald-600 transition-colors flex items-center"
                >
                  <Check size={14} className="mr-1.5" />
                  Save Changes
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
