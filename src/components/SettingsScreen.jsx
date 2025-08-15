import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, LogOut, DollarSign, Search, List, FileText, Scan } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tippingEnabled, setTippingEnabled] = useState(true);
  const [orderOptionEnabled, setOrderOptionEnabled] = useState(true);
  const [catalogOptionEnabled, setCatalogOptionEnabled] = useState(true);
  const [memoEnabled, setMemoEnabled] = useState(true);
  const [scanOptionEnabled, setScanOptionEnabled] = useState(true);

  // Load theme preference from localStorage and current document state
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Load tipping preference from localStorage
    const savedTipping = localStorage.getItem('tippingEnabled');
    if (savedTipping !== null) {
      setTippingEnabled(savedTipping === 'true');
    }

    // Load order option preference from localStorage
    const savedOrder = localStorage.getItem('orderOptionEnabled');
    if (savedOrder !== null) {
      setOrderOptionEnabled(savedOrder === 'true');
    }

    // Load catalog option preference from localStorage
    const savedCatalog = localStorage.getItem('catalogOptionEnabled');
    if (savedCatalog !== null) {
      setCatalogOptionEnabled(savedCatalog === 'true');
    }

    // Load memo preference from localStorage
    const savedMemo = localStorage.getItem('memoEnabled');
    if (savedMemo !== null) {
      setMemoEnabled(savedMemo === 'true');
    }

    // Load scan option preference from localStorage
    const savedScan = localStorage.getItem('scanOptionEnabled');
    if (savedScan !== null) {
      setScanOptionEnabled(savedScan === 'true');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTipping = () => {
    const newTippingState = !tippingEnabled;
    setTippingEnabled(newTippingState);
    localStorage.setItem('tippingEnabled', newTippingState.toString());
  };

  const toggleOrderOption = () => {
    const newOrderState = !orderOptionEnabled;
    setOrderOptionEnabled(newOrderState);
    localStorage.setItem('orderOptionEnabled', newOrderState.toString());
  };

  const toggleCatalogOption = () => {
    const newCatalogState = !catalogOptionEnabled;
    setCatalogOptionEnabled(newCatalogState);
    localStorage.setItem('catalogOptionEnabled', newCatalogState.toString());
  };

  const toggleMemo = () => {
    const newMemoState = !memoEnabled;
    setMemoEnabled(newMemoState);
    localStorage.setItem('memoEnabled', newMemoState.toString());
  };

  const toggleScanOption = () => {
    const newScanState = !scanOptionEnabled;
    setScanOptionEnabled(newScanState);
    localStorage.setItem('scanOptionEnabled', newScanState.toString());
  };

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem('theme');
    // Navigate to login page
    navigate('/');
  };

  const settingsOptions = [
    {
      icon: isDarkMode ? Sun : Moon,
      title: 'Appearance',
      subtitle: 'Light or dark mode',
      action: (
        <button
          onClick={toggleTheme}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
              isDarkMode ? 'transform translate-x-6' : 'transform translate-x-0.5'
            }`}
          />
        </button>
      )
    }
  ];

  const paymentSettingsOptions = [
    {
      icon: DollarSign,
      title: 'Tipping',
      subtitle: 'Enable/disable tipping options',
      action: (
        <button
          onClick={toggleTipping}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            tippingEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
              tippingEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
            }`}
          />
        </button>
      )
    },
    {
      icon: Search,
      title: 'Order Option',
      subtitle: 'Show/hide order lookup on payment screen',
      action: (
        <button
          onClick={toggleOrderOption}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            orderOptionEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
              orderOptionEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
            }`}
          />
        </button>
      )
    },
    {
      icon: List,
      title: 'Catalog Option',
      subtitle: 'Show/hide service catalog on payment screen',
      action: (
        <button
          onClick={toggleCatalogOption}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            catalogOptionEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
              catalogOptionEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
            }`}
          />
        </button>
      )
    },
    {
      icon: Scan,
      title: 'Scan Option',
      subtitle: 'Show/hide scan button on payment screen',
      action: (
        <button
          onClick={toggleScanOption}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            scanOptionEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
              scanOptionEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
            }`}
          />
        </button>
      )
    },
    {
      icon: FileText,
      title: 'Memo Field',
      subtitle: 'Show/hide memo input on payment screen',
      action: (
        <button
          onClick={toggleMemo}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            memoEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
              memoEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
            }`}
          />
        </button>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-slate-200/60 dark:border-gray-700/60 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-700 dark:text-gray-200 tracking-wide">Settings</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* Settings Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-slate-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-slate-700 dark:text-gray-200">General Settings</h2>
          </div>
          
          {settingsOptions.map((option, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-slate-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700 dark:text-gray-200">{option.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-gray-400">{option.subtitle}</p>
                    </div>
                  </div>
                  {option.action}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Settings Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-slate-700 dark:text-gray-200">Payment Settings</h2>
          </div>
          
          {paymentSettingsOptions.map((option, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-slate-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700 dark:text-gray-200">{option.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-gray-400">{option.subtitle}</p>
                    </div>
                  </div>
                  {option.action}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Helpful message when all payment options are disabled */}
          {!orderOptionEnabled && !catalogOptionEnabled && !memoEnabled && !scanOptionEnabled && (
            <Card className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs text-white font-bold">!</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      All payment options are disabled
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                      Users won't be able to select orders, browse services, scan items, or add memos on the payment screen. Consider enabling at least one option for better user experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Logout Section */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-gray-200">Logout</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Sign out of your account</p>
                </div>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-slate-700 dark:text-gray-200">TapNearMe</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">Version 1.0.0</p>
              <p className="text-xs text-slate-400 dark:text-gray-500">© 2025 PayNearMe. All rights reserved.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen; 