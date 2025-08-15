import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCcApplePay,
  faCashApp
} from '@fortawesome/free-brands-svg-icons';
import {
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';
import { Button } from './ui/button';

// Venmo Icon Component
const VenmoIcon = ({ className = "w-6 h-6" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 512 512"
    className={className}
    fill="currentColor"
  >
    <path d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.6C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.8,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM278,387H174.32L132.75,138.44l90.75-8.62,22,176.87c20.53-33.45,45.88-86,45.88-121.87,0-19.62-3.36-33-8.61-44L365.4,124.1c9.56,15.78,13.86,32,13.86,52.57C379.25,242.17,323.34,327.26,278,387Z"/>
  </svg>
);

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
      icon: faCcApplePay,
      color: 'from-gray-900 via-gray-800 to-black',
      bgColor: 'bg-black',
      popular: true
    },
    {
      id: 'ach',
      name: 'ACH Transfer',
      description: 'Bank Account',
      icon: faBuildingColumns,
      color: 'from-emerald-500 via-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-500'
    },
    {
      id: 'cashapp',
      name: 'Cash App Pay',
      description: 'Mobile Payment',
      icon: faCashApp,
      color: 'from-emerald-500 via-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-500'
    },
    {
      id: 'venmo',
      name: 'Venmo',
      description: 'Social Payment',
      icon: VenmoIcon,
      color: 'from-blue-500 via-blue-600 to-indigo-600',
      bgColor: 'bg-blue-500'
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
      case 'venmo':
        navigate(`/venmo-payment?${params.toString()}`);
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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-slate-200/30 dark:border-gray-700/30 px-6 py-5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-gray-300 group-hover:text-slate-800 dark:group-hover:text-gray-100 transition-colors" />
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-slate-800 dark:text-gray-100 tracking-tight">Payment Method</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Select how to process payment</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 flex flex-col">
        {/* Amount Display */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center justify-center mb-3">
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

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => {
            // Check if it's a Font Awesome icon or Lucide icon
            const isFontAwesome = typeof method.icon === 'string' || method.icon?.iconName;

            return (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method)}
                className="group relative w-full bg-white dark:bg-gray-800 rounded-2xl p-4 border border-slate-200/40 dark:border-gray-700/40 hover:border-slate-300 dark:hover:border-gray-600 hover:shadow-xl hover:shadow-slate-200/30 dark:hover:shadow-gray-900/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

                {/* Popular Badge */}
                {method.popular && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold shadow-lg transform scale-90">
                    Fast
                  </div>
                )}

                <div className="relative flex flex-col items-center space-y-3">
                  <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    {isFontAwesome ? (
                      <FontAwesomeIcon icon={method.icon} className="w-6 h-6 text-white" />
                    ) : (
                      <method.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-slate-900 dark:text-gray-100 font-semibold text-sm group-hover:text-slate-700 dark:group-hover:text-gray-50 transition-colors">
                      {method.name}
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 text-xs group-hover:text-slate-600 dark:group-hover:text-gray-300 transition-colors mt-1 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* TapNearMe QR Code Section */}
        <div className="mt-6">
          <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-slate-200/40 dark:border-gray-700/40 shadow-lg p-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              {/* Left Column - QR Code */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center">
                  <img 
                    src="/paynearme-qr.png" 
                    alt="TapNearMe QR Code"
                    className="w-full h-full rounded-xl object-contain"
                  />
                </div>
              </div>
              
              {/* Right Column - Logo and Text */}
              <div className="flex flex-col items-center justify-center space-y-3">
                <img 
                  src="/logo-top.png" 
                  alt="TapNearMe Logo"
                  className="w-auto h-auto max-h-8"
                />
                <p className="text-sm text-slate-600 dark:text-gray-400 text-center">
                  Scan for more payment options
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodScreen; 