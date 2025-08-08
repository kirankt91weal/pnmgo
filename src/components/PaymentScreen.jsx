import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0.00');

  const handleNumberClick = (num) => {
    // Convert current amount to cents (remove commas first)
    const cleanAmount = amount.replace(/,/g, '');
    const currentCents = Math.floor(parseFloat(cleanAmount) * 100);
    // Shift left and add new digit
    const newCents = currentCents * 10 + parseInt(num);
    
    // Check if the new amount would exceed $9,999.99
    if (newCents > 999999) {
      // Show subtle feedback by briefly changing the amount color
      const originalAmount = amount;
      setAmount('MAX');
      setTimeout(() => setAmount(originalAmount), 300);
      return;
    }
    
    // Convert back to dollars with 2 decimal places
    const rawAmount = (newCents / 100).toFixed(2);
    // Add comma formatting
    const formattedAmount = parseFloat(rawAmount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    setAmount(formattedAmount);
  };

  const handleClear = () => {
    setAmount('0.00');
  };

  const handleBackspace = () => {
    // Convert current amount to cents (remove commas first)
    const cleanAmount = amount.replace(/,/g, '');
    const currentCents = Math.floor(parseFloat(cleanAmount) * 100);
    // Remove rightmost digit
    const newCents = Math.floor(currentCents / 10);
    // Convert back to dollars
    if (newCents === 0) {
      setAmount('0.00');
    } else {
      const rawAmount = (newCents / 100).toFixed(2);
      // Add comma formatting
      const formattedAmount = parseFloat(rawAmount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      setAmount(formattedAmount);
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
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800 tracking-wide">New Payment</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* Amount Display */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Amount</p>
                <p className="text-xs text-gray-400">Max: $9,999.99</p>
              </div>
              <div className="relative">
                <span className={`font-light text-gray-900 tracking-tight ${
                  amount.length > 8 ? 'text-4xl' : 
                  amount.length > 6 ? 'text-5xl' : 'text-6xl'
                }`}>${amount}</span>
                {amount !== '0.00' && (
                  <div className="absolute -top-1 -right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Numeric Keypad */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
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
                  className={`h-16 rounded-xl font-semibold text-xl transition-all duration-200 active:scale-95 ${
                    key === 'C' || key === '<'
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100 hover:shadow-sm'
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
          className="w-full h-16 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.01] disabled:transform-none"
        >
          {amount === '0.00' ? 'Enter Amount' : `Pay $${amount}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentScreen; 