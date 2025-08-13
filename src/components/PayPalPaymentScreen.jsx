import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, DollarSign, Smartphone, CheckCircle, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';

const PayPalPaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get parameters from URL
  const urlParams = new URLSearchParams(location.search);
  const amount = urlParams.get('amount') || '$0.00';
  const selectedOrder = urlParams.get('order');
  const selectedCatalog = urlParams.get('catalog');
  const selectedMemo = urlParams.get('memo');
  const scannedData = urlParams.get('scanned');

  const [isProcessing, setIsProcessing] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const formatAmount = (amountStr) => {
    const cleanAmount = amountStr.replace('$', '');
    return parseFloat(cleanAmount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handlePayPalCheckout = () => {
    setIsProcessing(true);
    
    // Simulate PayPal web checkout flow
    setTimeout(() => {
      setIsProcessing(false);
      setShowComplete(true);
      
      // Show complete state for 2 seconds, then navigate to tip screen
      setTimeout(() => {
        const params = new URLSearchParams();
        params.set('amount', amount);
        params.set('method', 'paypal');
        
        if (selectedOrder) params.set('order', selectedOrder);
        if (selectedCatalog) params.set('catalog', selectedCatalog);
        if (selectedMemo) params.set('memo', selectedMemo);
        if (scannedData) params.set('scanned', scannedData);
        
        navigate(`/tip?${params.toString()}`);
      }, 2000);
    }, 3000);
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
            <h1 className="text-xl font-semibold text-slate-800 dark:text-gray-100 tracking-tight">PayPal Checkout</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Complete your payment securely</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 flex flex-col">
        {/* Amount Display */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-2xl shadow-blue-500/30 flex items-center justify-center mb-3">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse shadow-lg"></div>
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

        {/* PayPal Checkout Section */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 -mt-16">
          <div className="text-center space-y-4">
            <div className="relative">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-2xl shadow-slate-200/30 dark:shadow-gray-900/30 p-8">
                <CardContent className="p-0">
                  <div className="text-center space-y-6">
                    {/* PayPal Logo */}
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faCcPaypal} className="w-8 h-8 text-blue-500" />
                      <h3 className="text-2xl font-semibold text-slate-800 dark:text-gray-100">PayPal</h3>
                    </div>
                    
                    {/* Checkout Container */}
                    <div className="w-48 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center relative mx-auto border-2 border-dashed border-blue-200 dark:border-blue-700">
                      {!showComplete ? (
                        <div className="text-center space-y-3">
                          <CreditCard className="w-12 h-12 text-blue-500 mx-auto" />
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Web Checkout</p>
                        </div>
                      ) : (
                        /* Complete State */
                        <div className="text-center space-y-3">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Complete</p>
                        </div>
                      )}
                    </div>
                    
                    {!showComplete ? (
                      <div className="text-sm text-slate-600 dark:text-gray-400 space-y-2">
                        <p>• Secure PayPal checkout</p>
                        <p>• Credit & debit cards accepted</p>
                        <p>• No account required</p>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 dark:text-gray-400">
                        <p className="text-center">Payment successful!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* PayPal Checkout Button */}
          <div className="text-center space-y-3">
            <p className="text-xs text-slate-500 dark:text-gray-400">Demo Mode</p>
            <Button
              onClick={handlePayPalCheckout}
              disabled={isProcessing}
              className="w-full max-w-sm h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <FontAwesomeIcon icon={faCcPaypal} className="w-5 h-5" />
                  <span>Pay with PayPal</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-200/50 dark:border-gray-700/50">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
              <strong>Secure:</strong> Your payment is processed securely through PayPal's encrypted servers. 
              We never store your payment information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalPaymentScreen; 