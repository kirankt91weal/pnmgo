import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, RotateCcw, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const RefundScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get parameters from URL
  const urlParams = new URLSearchParams(location.search);
  const amount = urlParams.get('amount') || '$0.00';
  const transactionId = urlParams.get('transactionId') || '';
  const paymentMethod = urlParams.get('method') || 'card';
  const lastFour = urlParams.get('lastFour') || '';
  const selectedOrder = urlParams.get('order');
  const selectedCatalog = urlParams.get('catalog');
  const selectedMemo = urlParams.get('memo');
  const scannedData = urlParams.get('scanned');

  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formatAmount = (amountStr) => {
    const cleanAmount = amountStr.replace('$', '');
    return parseFloat(cleanAmount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleRefund = () => {
    setIsProcessing(true);
    
    // Simulate refund processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
      
      // Show confirmation for 1 second, then navigate back to receipt with refunded status
      setTimeout(() => {
        const params = new URLSearchParams();
        params.set('amount', amount);
        params.set('method', paymentMethod);
        params.set('status', 'refunded');
        params.set('transactionId', transactionId);
        params.set('lastFour', lastFour);
        
        if (selectedOrder) params.set('order', selectedOrder);
        if (selectedCatalog) params.set('catalog', selectedCatalog);
        if (selectedMemo) params.set('memo', selectedMemo);
        if (scannedData) params.set('scanned', scannedData);
        
        navigate(`/confirm?${params.toString()}`);
      }, 1000);
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/confirm');
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
            <h1 className="text-xl font-semibold text-slate-800 dark:text-gray-100 tracking-tight">Refund Payment</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Confirm refund details</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 flex flex-col">
        {/* Refund Amount Display */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-2xl shadow-blue-500/30 flex items-center justify-center mb-3">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">Refund Amount</p>
            <div className="relative inline-block">
              <span className="text-4xl font-light text-slate-800 dark:text-gray-100 tracking-tight">
                {formatAmount(amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Refund Details Card */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 -mt-16">
          <Card className="w-full max-w-md bg-white dark:bg-gray-800 border-0 shadow-2xl shadow-slate-200/30 dark:shadow-gray-900/30">
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                {!showConfirmation ? (
                  <>
                    {/* Refund Warning */}
                    <div className="flex items-center justify-center space-x-3 text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-6 h-6" />
                      <span className="text-lg font-semibold">Refund Warning</span>
                    </div>
                    
                    <div className="text-sm text-slate-600 dark:text-gray-400 space-y-3">
                      <p>You are about to refund:</p>
                      <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span className="font-semibold">{amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transaction:</span>
                          <span className="font-semibold">{transactionId}</span>
                        </div>
                        {lastFour && (
                          <div className="flex justify-between">
                            <span>Card/Account:</span>
                            <span className="font-semibold">•••• {lastFour}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-amber-600 dark:text-amber-400 font-medium">
                        This action cannot be undone.
                      </p>
                    </div>

                    {/* Refund Button */}
                    <Button
                      onClick={handleRefund}
                      disabled={isProcessing}
                      className="w-full h-14 bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing Refund...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <RotateCcw className="w-5 h-5" />
                          <span>Confirm Refund</span>
                        </div>
                      )}
                    </Button>
                  </>
                ) : (
                  /* Confirmation State */
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200">Refund Successful!</h3>
                    <p className="text-slate-600 dark:text-gray-400">Returning to receipt...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RefundScreen; 