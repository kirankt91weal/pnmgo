import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, QrCode, Smartphone, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashApp } from '@fortawesome/free-brands-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const CashAppPaymentScreen = () => {
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

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowComplete(true);
      
      // Show complete state for 2 seconds, then navigate to tip screen
      setTimeout(() => {
        const params = new URLSearchParams();
        params.set('amount', amount);
        params.set('method', 'cashapp');
        
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
            <h1 className="text-xl font-semibold text-slate-800 dark:text-gray-100 tracking-tight">Cash App Pay</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Scan QR code to pay</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 flex flex-col">
        {/* Amount Display */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center justify-center mb-2">
              <DollarSign className="w-8 h-8 text-white" />
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

        {/* QR Code Display */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 -mt-24">
          <div className="text-center space-y-3">
            <div className="relative">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-2xl shadow-slate-200/30 dark:shadow-gray-900/30 p-6">
                <CardContent className="p-0">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className="text-2xl">$</span>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-gray-100">Cash App Pay</h3>
                    </div>
                    
                    {/* QR Code Container */}
                    <div className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center relative mx-auto">
                      {!showComplete ? (
                        <>
                          <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
                            <img 
                              src="/cashapp-qr.png" 
                              alt="Cash App QR Code"
                              className="w-full h-full rounded-xl object-contain"
                              onError={(e) => {
                                // Fallback to placeholder if image doesn't exist
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            {/* Fallback Placeholder */}
                            <div className="w-full h-full bg-slate-100 dark:bg-gray-700 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-gray-600" style={{display: 'none'}}>
                              <div className="text-center space-y-2">
                                <QrCode className="w-12 h-12 text-slate-400 dark:text-gray-500 mx-auto" />
                                <p className="text-xs text-slate-500 dark:text-gray-400">Upload QR Code Image</p>
                              </div>
                            </div>
                          </div>
                          {/* Cash App Icon Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                              <FontAwesomeIcon icon={faCashApp} className="w-12 h-12 text-emerald-500" />
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Complete State */
                        <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
                          <FontAwesomeIcon icon={faCircleCheck} className="w-16 h-16 text-emerald-500" />
                        </div>
                      )}
                    </div>
                    
                    {!showComplete ? (
                      <div className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
                        <p>1. Open Cash App on your phone</p>
                        <p>2. Scan this QR code</p>
                        <p>3. Approve the payment</p>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 dark:text-gray-400">
                        <p className="text-center">Complete</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Simulate Button for Demo */}
          <div className="text-center space-y-2">
            <p className="text-xs text-slate-500 dark:text-gray-400">Demo Mode</p>
            <Button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full max-w-sm h-12 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Simulate Payment</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Success Message */}
        {/* showSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-in slide-in-from-bottom-4 duration-300 ease-out">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200 mb-2">Payment Successful!</h3>
              <p className="text-slate-600 dark:text-gray-400">Redirecting to tip screen...</p>
            </div>
          </div>
        ) */}
      </div>
    </div>
  );
};

export default CashAppPaymentScreen; 