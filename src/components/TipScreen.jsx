import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { getTippingEnabled } from '../lib/settings';

const TipScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get amount from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const baseAmount = parseFloat(urlParams.get('amount') || '0');
  const method = urlParams.get('method') || 'tap';
  const accountNumber = urlParams.get('accountNumber') || '';
  
  const [selectedTip, setSelectedTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedTipType, setSelectedTipType] = useState('none'); // 'none', 'percentage', 'custom'
  const [hasMadeSelection, setHasMadeSelection] = useState(true); // Start as true since "No Tip" is default
  const [tippingEnabled, setTippingEnabled] = useState(true);
  
  // Check tipping setting on component mount
  useEffect(() => {
    setTippingEnabled(getTippingEnabled());
  }, []);

  const tipOptions = [
    { label: 'No Tip', value: 0, percentage: 0 },
    { label: '15%', value: baseAmount * 0.15, percentage: 15 },
    { label: '20%', value: baseAmount * 0.2, percentage: 20 },
    { label: '25%', value: baseAmount * 0.25, percentage: 25 },
    { label: 'Custom', value: 0, percentage: null }
  ];



  const handleTipSelect = (tip) => {
    if (tip.percentage === null) {
      // Custom tip - show input
      setSelectedTip(0);
      setCustomTip('');
      setShowCustomInput(true);
      setSelectedTipType('custom');
      setHasMadeSelection(true);
    } else if (tip.percentage === 0) {
      // No Tip selected
      setSelectedTip(0);
      setCustomTip('');
      setShowCustomInput(false);
      setSelectedTipType('none');
      setHasMadeSelection(true);
    } else {
      // Percentage tip selected
      setSelectedTip(tip.value);
      setCustomTip('');
      setShowCustomInput(false);
      setSelectedTipType('percentage');
      setHasMadeSelection(true);
    }
  };

  const handleCustomTipChange = (value) => {
    setCustomTip(value);
    const customAmount = parseFloat(value) || 0;
    setSelectedTip(customAmount);
    setSelectedTipType('custom');
    setHasMadeSelection(true);
  };

  const handleSkipTip = () => {
    // Get selected items from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const selectedOrder = urlParams.get('order');
    const selectedCatalog = urlParams.get('catalog');
    const selectedMemo = urlParams.get('memo');
    const scannedData = urlParams.get('scanned');
    
    const params = new URLSearchParams();
    params.set('amount', baseAmount);
    params.set('tip', '0');
    params.set('method', method);
    if (accountNumber) params.set('accountNumber', accountNumber);
    
    if (selectedOrder) params.set('order', selectedOrder);
    if (selectedCatalog) params.set('catalog', selectedCatalog);
    if (selectedMemo) params.set('memo', selectedMemo);
    if (scannedData) params.set('scanned', scannedData);
    
    navigate(`/confirm?${params.toString()}`);
  };

  const handleAddTip = () => {
    // Get selected items from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const selectedOrder = urlParams.get('order');
    const selectedCatalog = urlParams.get('catalog');
    const selectedMemo = urlParams.get('memo');
    const scannedData = urlParams.get('scanned');
    
    const params = new URLSearchParams();
    params.set('amount', baseAmount);
    params.set('tip', selectedTip);
    params.set('method', method);
    if (accountNumber) params.set('accountNumber', accountNumber);
    
    if (selectedOrder) params.set('order', selectedOrder);
    if (selectedCatalog) params.set('catalog', selectedCatalog);
    if (selectedMemo) params.set('memo', selectedMemo);
    if (scannedData) params.set('scanned', scannedData);
    
    navigate(`/confirm?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-slate-200/60 dark:border-gray-700/60 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/tap-to-pay' + location.search)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-700 dark:text-gray-200 tracking-wide">
          {tippingEnabled ? 'Add Tip' : 'Confirm Payment'}
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* Amount Display with Fees */}
        <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 border border-slate-200/50 dark:border-gray-600/50 shadow-lg shadow-slate-200/20 dark:shadow-gray-900/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-slate-600 dark:text-gray-400" />
                  <span className="text-sm text-slate-600 dark:text-gray-400 font-medium">Base Amount</span>
                </div>
                <p className="text-3xl font-bold text-slate-700 dark:text-gray-100">${baseAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              
              <div className="border-t border-slate-200 dark:border-gray-600 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600 dark:text-gray-400">Service Fee:</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-gray-200">$3.99</span>
                </div>
                {tippingEnabled && selectedTip > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600 dark:text-gray-400">Tip:</span>
                    <span className="text-sm font-semibold text-emerald-600">+${selectedTip.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 dark:border-gray-600 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-700 dark:text-gray-200">Total:</span>
                    <span className="font-bold text-lg text-slate-700 dark:text-gray-200">
                      ${(baseAmount + 3.99 + (tippingEnabled ? selectedTip : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tip Options - Only show when tipping is enabled */}
        {tippingEnabled && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200">Select Tip Amount</h3>
            
            <div className="space-y-2">
              {/* Percentage options row */}
              <div className="grid grid-cols-3 gap-2">
                {tipOptions.slice(1, 4).map((tip, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handleTipSelect(tip)}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      selectedTipType === 'percentage' && selectedTip === tip.value
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:border-slate-300 dark:hover:border-gray-500 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-sm">{tip.label}</div>
                      <div className="text-xs opacity-80 mt-1">
                        ${tip.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* No Tip and Custom row */}
              <div className="grid grid-cols-2 gap-2">
                {[tipOptions[0], tipOptions[4]].map((tip, index) => (
                  <button
                    key={index === 0 ? 0 : 4}
                    onClick={() => handleTipSelect(tip)}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      (tip.percentage === null && selectedTipType === 'custom') || 
                      (tip.percentage === 0 && selectedTipType === 'none')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:border-slate-300 dark:hover:border-gray-500 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-sm">{tip.label}</div>
                      {tip.percentage === null && (
                        <div className="text-xs opacity-80 mt-1">Custom</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Tip Input */}
            {showCustomInput && (
              <Card className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-slate-600 dark:text-gray-400" />
                    <input
                      type="number"
                      placeholder="Enter custom tip"
                      value={customTip}
                      onChange={(e) => handleCustomTipChange(e.target.value)}
                      className="flex-1 text-lg font-semibold text-slate-700 dark:text-gray-100 bg-transparent border-none outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500"
                      step="0.01"
                      min="0"
                      autoFocus
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}



        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={handleAddTip}
            disabled={tippingEnabled && !hasMadeSelection}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 disabled:shadow-none transform hover:scale-[1.01] disabled:transform-none"
          >
            {tippingEnabled ? 'Complete Payment' : 'Confirm Payment'}
          </Button>
          
          {tippingEnabled && (
            <Button
              onClick={handleSkipTip}
              variant="outline"
              className="w-full h-12 bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-300 dark:hover:border-gray-500 font-medium rounded-2xl transition-all duration-200"
            >
              Skip Tip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TipScreen; 