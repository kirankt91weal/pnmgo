import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, SmartphoneNfc, Building2, Smartphone, Wallet, CreditCard } from 'lucide-react';
import { Button } from './ui/button';

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get parameters from URL
  const urlParams = new URLSearchParams(location.search);
  const amount = urlParams.get('amount') || '$0.00';
  const selectedOrder = urlParams.get('order');
  const selectedCatalog = urlParams.get('catalog');
  const selectedMemo = urlParams.get('memo');
  const scannedData = urlParams.get('scanned');

  const paymentMethods = [
    {
      id: 'tap-to-pay',
      name: 'Tap to Pay',
      description: 'Credit & Debit Cards',
      icon: SmartphoneNfc,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
      action: 'Hold Here to Pay'
    },
    {
      id: 'ach',
      name: 'ACH Transfer',
      description: 'Bank Account',
      icon: Building2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500',
      action: 'Enter Account Details'
    },
    {
      id: 'cashapp',
      name: 'Cash App Pay',
      description: 'Mobile Payment',
      icon: Smartphone,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500',
      action: 'Scan QR Code'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Digital Wallet',
      icon: Wallet,
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-400',
      action: 'Sign In to PayPal'
    },
    {
      id: 'venmo',
      name: 'Venmo',
      description: 'Social Payment',
      icon: Smartphone,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
      action: 'Sign In to Venmo'
    },
    {
      id: 'key-in',
      name: 'Key In Card',
      description: 'Manual Entry',
      icon: CreditCard,
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-500',
      action: 'Enter Card Details'
    }
  ];

  const handlePaymentMethodSelect = (method) => {
    // Build URL with all existing parameters
    const params = new URLSearchParams();
    params.set('amount', amount);
    
    if (selectedOrder) params.set('order', selectedOrder);
    if (selectedCatalog) params.set('catalog', selectedCatalog);
    if (selectedMemo) params.set('memo', selectedMemo);
    if (scannedData) params.set('scanned', scannedData);

    // Navigate based on payment method
    switch (method.id) {
      case 'tap-to-pay':
        navigate(`/tap-to-pay?${params.toString()}`);
        break;
      case 'ach':
        navigate(`/ach-payment?${params.toString()}`);
        break;
      case 'cashapp':
        navigate(`/cashapp-payment?${params.toString()}`);
        break;
      case 'paypal':
        navigate(`/paypal-payment?${params.toString()}`);
        break;
      case 'venmo':
        navigate(`/venmo-payment?${params.toString()}`);
        break;
      case 'key-in':
        navigate(`/key-in-payment?${params.toString()}`);
        break;
      default:
        navigate(`/tap-to-pay?${params.toString()}`);
    }
  };

  const formatAmount = (amountStr) => {
    const cleanAmount = amountStr.replace('$', '');
    return parseFloat(cleanAmount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-slate-200/60 dark:border-gray-700/60 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/payment')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-700 dark:text-gray-200 tracking-wide">Choose Payment Method</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Amount Display */}
        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-4 border border-slate-200/50 dark:border-gray-600/50 shadow-lg shadow-slate-200/20 dark:shadow-gray-900/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">$</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 font-semibold uppercase tracking-wider">Payment Amount</p>
              </div>
              <div className="relative">
                <span className={`font-light text-slate-900 dark:text-gray-100 tracking-tight ${
                  amount.length > 8 ? 'text-3xl' : 
                  amount.length > 6 ? 'text-4xl' : 'text-5xl'
                }`}>${formatAmount(amount)}</span>
                <div className="absolute -top-1 -right-2 w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method)}
                className="w-full bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 border border-slate-200/50 dark:border-gray-600/50 shadow-lg shadow-slate-200/20 dark:shadow-gray-900/20 hover:shadow-xl hover:shadow-slate-200/30 dark:hover:shadow-gray-900/30 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-slate-900 dark:text-gray-100 font-semibold text-lg">{method.name}</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm">{method.description}</p>
                  </div>
                  <div className="text-slate-400 dark:text-gray-500 group-hover:text-slate-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodScreen; 