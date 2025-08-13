import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, Search, List, DollarSign, X, Scan } from 'lucide-react';
import { Button } from './ui/button';
import OrderLookupModal from './OrderLookupModal';
import CatalogModal from './CatalogModal';
import ScanModal from './ScanModal';
import { getTippingEnabled, getOrderOptionEnabled, getCatalogOptionEnabled, getMemoEnabled, getScanOptionEnabled } from '../lib/settings';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0.00');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [memoText, setMemoText] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  const handleNumberClick = (num) => {
    // Convert current amount to cents (remove commas first)
    const cleanAmount = amount.replace(/,/g, '');
    const currentCents = Math.floor(parseFloat(cleanAmount) * 100);
    // Shift left and add new digit
    const newCents = currentCents * 10 + parseInt(num);
    
    // Check if the new amount would exceed $9,999.99
    if (newCents > 999999) {
      // Show subtle feedback by briefly changing the amount color
      const originalAmount = amount;
      setAmount('MAX');
      setTimeout(() => setAmount(originalAmount), 300);
      return;
    }
    
    // Convert back to dollars with 2 decimal places
    const rawAmount = (newCents / 100).toFixed(2);
    // Add comma formatting
    const formattedAmount = parseFloat(rawAmount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    setAmount(formattedAmount);
  };

  const handleClear = () => {
    setAmount('0.00');
    setSelectedOrder(null);
    setSelectedCatalog(null);
    setMemoText('');
  };

  const handleBackspace = () => {
    // Convert current amount to cents (remove commas first)
    const cleanAmount = amount.replace(/,/g, '');
    const currentCents = Math.floor(parseFloat(cleanAmount) * 100);
    // Remove rightmost digit
    const newCents = Math.floor(currentCents / 10);
    // Convert back to dollars
    if (newCents === 0) {
      setAmount('0.00');
      setSelectedOrder(null);
      setSelectedCatalog(null);
      setMemoText('');
    } else {
      const rawAmount = (newCents / 100).toFixed(2);
      // Add comma formatting
      const formattedAmount = parseFloat(rawAmount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      setAmount(formattedAmount);
    }
  };

  const handleOrderSelect = (order) => {
    if (!getOrderOptionEnabled()) return;
    setSelectedOrder(order);
    setSelectedCatalog(null);
    setMemoText('');
    // Format the order amount
    const formattedAmount = parseFloat(order.amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    setAmount(formattedAmount);
  };

  const handleCatalogComplete = (total) => {
    if (!getCatalogOptionEnabled()) return;
    setSelectedCatalog({ total });
    setSelectedOrder(null);
    setMemoText('');
    // Format the catalog total
    const formattedAmount = parseFloat(total).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    setAmount(formattedAmount);
  };

  const handleScanComplete = (data) => {
    console.log('Debug PaymentScreen handleScanComplete called with:', data);
    setScannedData(data);
    // Automatically set the amount from the scanned down payment data
    if (data.downPayment) {
      // Remove commas and parse the amount properly
      const cleanAmount = data.downPayment.replace(/,/g, '');
      const formattedAmount = parseFloat(cleanAmount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      setAmount(formattedAmount);
    } else {
      setAmount('0.00');
    }
    setSelectedOrder(null);
    setSelectedCatalog(null);
    setMemoText('');
    console.log('Debug PaymentScreen after handleScanComplete - scannedData:', data, 'amount:', data.downPayment);
  };


  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['C', '0', '<']
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-slate-200/60 dark:border-gray-700/60 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-700 dark:text-gray-200 tracking-wide">New Payment</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Premium Amount Display */}
        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-4 border border-slate-200/50 dark:border-gray-600/50 shadow-lg shadow-slate-200/20 dark:shadow-gray-900/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-gray-400 font-semibold uppercase tracking-wider">Amount</p>
                </div>
                <p className="text-xs text-slate-400 dark:text-gray-500 bg-slate-100 dark:bg-gray-700 px-2 py-1 rounded-full">Max: $9,999.99</p>
              </div>
              <div className="relative">
                <span className={`font-light text-slate-900 dark:text-gray-100 tracking-tight ${
                  amount.length > 8 ? 'text-3xl' : 
                  amount.length > 6 ? 'text-4xl' : 'text-5xl'
                }`}>${amount}</span>
                {amount !== '0.00' && (
                  <div className="absolute -top-1 -right-2 w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse shadow-sm"></div>
                )}
              </div>
              {selectedOrder && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">{selectedOrder.orderNumber}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-300">{selectedOrder.customerName}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(null)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              {selectedCatalog && (
                <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Service Catalog</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-300">Parts & Labor</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCatalog(null)}
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              {scannedData && (
                <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">✓</span>
                      </div>
                      <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">Scanned Document</span>
                    </div>
                    <button
                      onClick={() => setShowScanModal(true)}
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium underline"
                    >
                      view
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Premium Action Buttons */}
        <div className="space-y-2">
          {getOrderOptionEnabled() || getCatalogOptionEnabled() || getScanOptionEnabled() ? (
            <div className={`grid gap-2 ${
              [getOrderOptionEnabled(), getCatalogOptionEnabled(), getScanOptionEnabled()].filter(Boolean).length === 3 
                ? 'grid-cols-3' 
                : [getOrderOptionEnabled(), getCatalogOptionEnabled(), getScanOptionEnabled()].filter(Boolean).length === 2 
                ? 'grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {getOrderOptionEnabled() && (
                <Button
                  variant="outline"
                  onClick={() => setShowOrderModal(true)}
                  className="h-12 bg-gradient-to-r from-slate-50 to-white dark:from-gray-700 dark:to-gray-600 hover:from-slate-100 hover:to-slate-50 dark:hover:from-gray-600 dark:hover:to-gray-500 border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Search className="w-4 h-4 mr-2 text-slate-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Order</span>
                </Button>
              )}
              {getCatalogOptionEnabled() && (
                <Button
                  variant="outline"
                  onClick={() => setShowCatalogModal(true)}
                  className="h-12 bg-gradient-to-r from-slate-50 to-white dark:from-gray-700 dark:to-gray-600 hover:from-slate-100 hover:to-slate-50 dark:hover:from-gray-600 dark:hover:to-gray-500 border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <List className="w-4 h-4 mr-2 text-slate-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Catalog</span>
                </Button>
              )}
              {getScanOptionEnabled() && (
                <Button
                  variant="outline"
                  onClick={() => setShowScanModal(true)}
                  className="h-12 bg-gradient-to-r from-slate-50 to-white dark:from-gray-700 dark:to-gray-600 hover:from-slate-100 hover:to-slate-50 dark:hover:from-gray-600 dark:hover:to-gray-500 border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Scan className="w-4 h-4 mr-2 text-slate-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Scan</span>
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-4 px-6 bg-slate-50 dark:bg-gray-700 rounded-xl border border-slate-200 dark:border-gray-600">
              <p className="text-sm text-slate-600 dark:text-gray-400">
                All payment options are currently hidden. 
                <br />
                <span className="text-xs text-slate-500 dark:text-gray-500">
                  Enable them in Settings to use these features.
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Premium Numeric Keypad */}
        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-4 border border-slate-200/50 dark:border-gray-600/50 shadow-lg shadow-slate-200/20 dark:shadow-gray-900/20">
          <div className="grid grid-cols-3 gap-3">
            {keypadNumbers.map((row, rowIndex) => (
              row.map((key, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => {
                    if (key === 'C') {
                      handleClear();
                    } else if (key === '<') {
                      handleBackspace();
                    } else if (key !== 'C' && key !== '<') {
                      handleNumberClick(key);
                    }
                  }}
                  className={`h-14 rounded-2xl font-semibold text-xl transition-all duration-200 active:scale-95 ${
                    key === 'C' || key === '<'
                      ? 'bg-gradient-to-r from-slate-100 to-slate-200 dark:from-gray-600 dark:to-gray-500 text-slate-600 dark:text-gray-400 hover:from-slate-200 hover:to-slate-300 dark:hover:from-gray-500 dark:hover:to-gray-400 hover:shadow-md border border-slate-200 dark:border-gray-600'
                      : 'bg-gradient-to-r from-white to-slate-50 dark:from-gray-700 dark:to-gray-600 text-slate-900 dark:text-gray-100 hover:from-slate-100 hover:to-slate-200 dark:hover:from-gray-600 dark:hover:to-gray-500 hover:shadow-md border border-slate-200 dark:border-gray-600'
                  }`}
                >
                  {key === '<' ? <ChevronLeft className="w-6 h-6 mx-auto" /> : key}
                </button>
              ))
            ))}
          </div>
        </div>

        {/* Memo Input Field */}
        {getMemoEnabled() && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-gray-200">
              Memo (Optional)
            </label>
            <input
              type="text"
              placeholder="Add a note about this payment..."
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        )}

        {/* Premium Action Button */}
        <Button
          onClick={() => {
            // Build URL with selected items
            const params = new URLSearchParams();
            // Pass the amount as a clean number without commas to avoid URL parsing issues
            const cleanAmount = amount.replace(/,/g, '');
            params.set('amount', cleanAmount);
            
            if (selectedOrder) {
              params.set('order', encodeURIComponent(JSON.stringify(selectedOrder)));
            }
            if (selectedCatalog) {
              params.set('catalog', encodeURIComponent(JSON.stringify(selectedCatalog)));
            }
            if (scannedData) {
              params.set('scanned', encodeURIComponent(JSON.stringify(scannedData)));
            }
            if (memoText.trim()) {
              params.set('memo', encodeURIComponent(JSON.stringify({ text: memoText.trim() })));
            }
            
            // Debug logging to see what's being passed (AFTER all parameters are set)
            console.log('Debug PaymentScreen final params:', { amount, cleanAmount, scannedData, finalParams: params.toString() });
            console.log('Debug PaymentScreen scannedData state at click:', scannedData);
            
            // Check tipping setting to determine navigation
            if (getTippingEnabled()) {
              // Tipping enabled - go to tip screen
              navigate(`/tip?${params.toString()}`);
            } else {
              // Tipping disabled - go directly to confirmation
              navigate(`/confirm?${params.toString()}`);
            }
          }}
          disabled={amount === '0.00' && !scannedData}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 disabled:shadow-none transform hover:scale-[1.01] disabled:transform-none"
        >
          {amount === '0.00' && !scannedData ? 'Enter Amount' : 
           `Pay $${amount}`}
        </Button>
      </div>

      {/* Order Lookup Modal */}
      {getOrderOptionEnabled() && (
        <OrderLookupModal
          isOpen={showOrderModal}
          onClose={() => setShowOrderModal(false)}
          onOrderSelect={handleOrderSelect}
        />
      )}

      {/* Catalog Modal */}
      {getCatalogOptionEnabled() && (
        <CatalogModal
          isOpen={showCatalogModal}
          onClose={() => setShowCatalogModal(false)}
          onCatalogComplete={handleCatalogComplete}
        />
      )}

      {/* Scan Modal */}
      {getScanOptionEnabled() && (
        <ScanModal
          isOpen={showScanModal}
          onClose={() => {
            console.log('Debug PaymentScreen: ScanModal onClose called');
            setShowScanModal(false);
          }}
          onScanComplete={(data) => {
            console.log('Debug PaymentScreen: ScanModal onScanComplete called with:', data);
            handleScanComplete(data);
          }}
          existingData={scannedData}
        />
      )}


    </div>
  );
};

export default PaymentScreen; 