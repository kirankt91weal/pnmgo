import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Building2, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ACHPaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get parameters from URL
  const urlParams = new URLSearchParams(location.search);
  const amount = urlParams.get('amount') || '$0.00';
  const selectedOrder = urlParams.get('order');
  const selectedCatalog = urlParams.get('catalog');
  const selectedMemo = urlParams.get('memo');
  const scannedData = urlParams.get('scanned');

  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatAmount = (amountStr) => {
    const cleanAmount = amountStr.replace('$', '');
    return parseFloat(cleanAmount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!accountNumber || !routingNumber) {
      alert('Please enter both account number and routing number');
      return;
    }

    if (routingNumber.length !== 9) {
      alert('Routing number must be 9 digits');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to tip screen like tap to pay flow
      const params = new URLSearchParams();
      params.set('amount', amount);
      params.set('method', 'ach');
      params.set('accountNumber', accountNumber.slice(-4)); // Only show last 4 digits
      
      if (selectedOrder) params.set('order', selectedOrder);
      if (selectedCatalog) params.set('catalog', selectedCatalog);
      if (selectedMemo) params.set('memo', selectedMemo);
      if (scannedData) params.set('scanned', scannedData);
      
      navigate(`/tip?${params.toString()}`);
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/payment-method');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-slate-200/30 dark:border-gray-700/30 px-6 py-5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-gray-300 group-hover:text-slate-800 dark:group-hover:text-gray-100 transition-colors" />
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-slate-800 dark:text-gray-100 tracking-tight">ACH Transfer</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Enter bank account details</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 flex flex-col">
        {/* Amount Display */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center justify-center mb-3">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">Transaction Amount</p>
            <div className="relative inline-block">
              <span className="text-4xl font-light text-slate-800 dark:text-gray-100 tracking-tight">
                {formatAmount(amount)}
              </span>
            </div>
          </div>
        </div>

        {/* ACH Form */}
        <div className="flex-1 flex flex-col">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Number */}
            <div className="space-y-2">
              <label htmlFor="accountNumber" className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                Account Number
              </label>
              <Input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter account number"
                className="h-12 text-lg text-center font-mono tracking-wider border-slate-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-400 dark:focus:border-emerald-400"
                maxLength={17}
                required
              />
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Numbers only, no spaces or dashes
              </p>
            </div>

            {/* Routing Number */}
            <div className="space-y-2">
              <label htmlFor="routingNumber" className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                Routing Number
              </label>
              <Input
                id="routingNumber"
                type="text"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 9-digit routing number"
                className="h-12 text-lg text-center font-mono tracking-wider border-slate-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-400 dark:focus:border-emerald-400"
                maxLength={9}
                required
              />
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Must be exactly 9 digits
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isProcessing || !accountNumber || !routingNumber}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Building2 className="w-5 h-5" />
                    <span>Process ACH Transfer</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-200/50 dark:border-gray-700/50">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                <strong>Secure:</strong> Your banking information is encrypted and secure. 
                We only store the last 4 digits of your account number for verification purposes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACHPaymentScreen; 