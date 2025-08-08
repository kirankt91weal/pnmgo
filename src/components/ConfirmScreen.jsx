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
  const fromTransactions = urlParams.get('from') === 'transactions';
  
  // Clean the amount and ensure proper formatting
  const cleanAmount = rawAmount.replace(/^\$+/, ''); // Remove any existing $ symbols
  const amount = `$${parseFloat(cleanAmount).toFixed(2)}`;
  
  // Calculate service fee and total
  const paymentAmount = parseFloat(cleanAmount);
  const serviceFee = 3.99;
  const total = paymentAmount + serviceFee;
  
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(fromTransactions ? '/transactions' : '/home')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-medium text-gray-700 tracking-wide">
          {dateString} - {timeString}
        </h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="p-5 space-y-4">
        {/* Payment Summary */}
        <div className="space-y-3">
          {/* Large Amount Card */}
          <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg shadow-gray-200/50">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-700 tracking-tight">{amount}</p>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-white border-0 shadow-md shadow-gray-200/30">
            <CardContent className="p-4">
              <div className="grid grid-cols-5 gap-4">
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-sm text-gray-600">Citi Bank - Debit</span>
                </div>
                <div className="flex items-center justify-end space-x-1">
                  <span className={`${randomCard.color}`}>{randomCard.icon}</span>
                  <span className="text-sm text-gray-600">{lastFour}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Specifics */}
        <Card className="bg-white border-0 shadow-md shadow-gray-200/30">
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Payment Amount:</span>
                <span className="font-semibold text-gray-700">{amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Service Fee:</span>
                <span className="font-semibold text-gray-700">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                <span className="font-bold text-gray-700">Total:</span>
                <span className="font-bold text-gray-700">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identifiers */}
        <Card className="bg-white border-0 shadow-md shadow-gray-200/30">
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">PNM Identifier:</span>
                <span className="font-semibold text-gray-700">1254892535</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Customer Identifier:</span>
                <span className="font-semibold text-gray-700">123691112</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Order Identifier:</span>
                <span className="font-semibold text-gray-700">125569412</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Fields */}
        <Card className="bg-white border-0 shadow-md shadow-gray-200/30">
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Custom Field 1:</span>
                <span className="font-semibold text-gray-700">23s983j</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Custom Field 2:</span>
                <span className="font-semibold text-gray-700">23s983j</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Custom Field 3:</span>
                <span className="font-semibold text-gray-700">23s983j</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Payment Button */}
        <div className="pt-4">
          <Button
            onClick={() => navigate('/payment')}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/30 transform hover:scale-[1.02]"
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