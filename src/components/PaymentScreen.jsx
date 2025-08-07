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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">New Payment</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="p-4 space-y-4">
        {/* Amount Display */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Amount</p>
              <p className="text-4xl text-gray-900 font-digital">${amount}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 border-green-200 bg-green-50 hover:bg-green-100"
              >
                <Search className="w-4 h-4 text-green-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 border-green-200 bg-green-50 hover:bg-green-100"
              >
                <List className="w-4 h-4 text-green-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Numeric Keypad */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-3 gap-6">
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
                  className={`h-20 rounded-lg font-semibold text-2xl transition-colors ${
                    key === 'C' || key === '<'
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {key === '<' ? <ChevronLeft className="w-8 h-8 mx-auto" /> : key}
                </button>
              ))
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => navigate('/pay/123')}
          disabled={amount === '0.00'}
          className="w-full h-14 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:shadow-none"
        >
          Initiate Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentScreen; 