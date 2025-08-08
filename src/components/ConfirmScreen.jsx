import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';

const ConfirmScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get amount from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const rawAmount = urlParams.get('amount') || '150.00';
  const tipAmount = parseFloat(urlParams.get('tip') || '0');
  const fromTransactions = urlParams.get('from') === 'transactions';
  
  // Clean the amount and ensure proper formatting
  const cleanAmount = rawAmount.replace(/^\$+/, ''); // Remove any existing $ symbols
  const baseAmount = parseFloat(cleanAmount);
  const amount = `$${baseAmount.toFixed(2)}`;
  
  // Calculate service fee and total
  const paymentAmount = baseAmount;
  const serviceFee = 3.99;
  const total = paymentAmount + serviceFee + tipAmount;
  
  // Randomize card details
  const cardBrands = [
    { 
      name: 'Visa', 
      icon: <FontAwesomeIcon icon={faCcVisa} className="w-5 h-5" />,
      color: 'text-blue-600' 
    },
    { 
      name: 'Mastercard', 
      icon: <FontAwesomeIcon icon={faCcMastercard} className="w-5 h-5" />,
      color: 'text-red-600' 
    },
    { 
      name: 'American Express', 
      icon: <FontAwesomeIcon icon={faCcAmex} className="w-5 h-5" />,
      color: 'text-blue-800' 
    },
    { 
      name: 'Discover', 
      icon: <FontAwesomeIcon icon={faCcDiscover} className="w-5 h-5" />,
      color: 'text-orange-600' 
    }
  ];
  const randomCard = cardBrands[Math.floor(Math.random() * cardBrands.length)];
  const lastFour = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number
  
  // Generate current date and time
  const now = new Date();
  const dateString = now.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(fromTransactions ? '/transactions' : '/home')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-lg font-medium text-gray-700 dark:text-gray-200 tracking-wide">
          {dateString} - {timeString}
        </h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="p-5 space-y-4">
        {/* Payment Summary */}
        <div className="space-y-3">
          {/* Large Amount Card */}
          <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-700 dark:text-gray-100 tracking-tight">{amount}</p>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md shadow-gray-200/30 dark:shadow-gray-900/30">
            <CardContent className="p-4">
              <div className="grid grid-cols-5 gap-4">
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Citi Bank - Debit</span>
                </div>
                <div className="flex items-center justify-end space-x-1">
                  <span className={`${randomCard.color} dark:text-gray-300`}>{randomCard.icon}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{lastFour}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Specifics */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md shadow-gray-200/30 dark:shadow-gray-900/30">
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Payment Amount:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">{amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Service Fee:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">${serviceFee.toFixed(2)}</span>
              </div>
              {tipAmount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Tip:</span>
                  <span className="font-semibold text-emerald-600">+${tipAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3">
                <span className="font-bold text-gray-700 dark:text-gray-200">Total:</span>
                <span className="font-bold text-gray-700 dark:text-gray-200">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identifiers */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md shadow-gray-200/30 dark:shadow-gray-900/30">
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-medium">PNM Identifier:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">1254892535</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Customer Identifier:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">123691112</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Order Identifier:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">125569412</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Fields */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md shadow-gray-200/30 dark:shadow-gray-900/30">
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Custom Field 1:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">23s983j</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Custom Field 2:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">23s983j</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Custom Field 3:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">23s983j</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Payment Button */}
        <div className="pt-4">
          <Button
            onClick={() => navigate('/payment')}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5 mr-3" />
            New Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmScreen; 