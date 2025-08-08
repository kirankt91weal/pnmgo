import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, List, X, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0.00');

  const handleNumberClick = (num) => {
    // Convert current amount to cents (remove decimal)
    const currentCents = Math.floor(parseFloat(amount) * 100);
    // Shift left and add new digit
    const newCents = currentCents * 10 + parseInt(num);
    // Convert back to dollars with 2 decimal places
    setAmount((newCents / 100).toFixed(2));
  };



  const handleClear = () => {
    setAmount('0.00');
  };

  const handleBackspace = () => {
    // Convert current amount to cents
    const currentCents = Math.floor(parseFloat(amount) * 100);
    // Remove rightmost digit
    const newCents = Math.floor(currentCents / 10);
    // Convert back to dollars
    if (newCents === 0) {
      setAmount('0.00');
    } else {
      setAmount((newCents / 100).toFixed(2));
    }
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['C', '0', '<']
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-medium text-gray-800 tracking-wide">New Payment</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="p-6 space-y-6">
        {/* Amount Display */}
        <div className="bg-white rounded-xl p-6 border-0 shadow-lg shadow-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2 font-medium">Amount</p>
              <p className="text-5xl text-gray-900 font-digital tracking-tight">${amount}</p>
            </div>
            <div className="flex flex-col space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-12 p-0 border-green-200 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <Search className="w-5 h-5 text-green-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-12 p-0 border-green-200 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <List className="w-5 h-5 text-green-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Numeric Keypad */}
        <div className="bg-white rounded-xl p-6 border-0 shadow-lg shadow-gray-200/50">
          <div className="grid grid-cols-3 gap-4">
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
                  className={`h-16 rounded-xl font-semibold text-xl transition-all duration-200 ${
                    key === 'C' || key === '<'
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  {key === '<' ? <ChevronLeft className="w-6 h-6 mx-auto" /> : key}
                </button>
              ))
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => navigate(`/pay/123?amount=${amount}`)}
          disabled={amount === '0.00'}
          className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/30 disabled:shadow-none transform hover:scale-[1.02] disabled:transform-none"
        >
          Initiate Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentScreen; 