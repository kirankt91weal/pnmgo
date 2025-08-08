import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, Search, List, DollarSign } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 px-6 py-3 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-900 tracking-wide">New Payment</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Premium Amount Display */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 border border-slate-200/50 shadow-lg shadow-slate-200/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-slate-600 font-semibold uppercase tracking-wider">Amount</p>
                </div>
                <p className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Max: $9,999.99</p>
              </div>
              <div className="relative">
                <span className={`font-light text-slate-900 tracking-tight ${
                  amount.length > 8 ? 'text-4xl' : 
                  amount.length > 6 ? 'text-5xl' : 'text-6xl'
                }`}>${amount}</span>
                {amount !== '0.00' && (
                  <div className="absolute -top-1 -right-2 w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse shadow-sm"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Action Buttons */}
        <div className="flex border border-slate-200 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/20">
          <Button
            variant="outline"
            className="flex-1 h-12 border-0 border-r border-slate-200 bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <Search className="w-4 h-4 mr-2 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Order</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 border-0 border-l border-slate-200 bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <List className="w-4 h-4 mr-2 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Catalog</span>
          </Button>
        </div>

        {/* Premium Numeric Keypad */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-4 border border-slate-200/50 shadow-lg shadow-slate-200/20">
          <div className="grid grid-cols-3 gap-3">
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
                  className={`h-14 rounded-2xl font-semibold text-xl transition-all duration-200 active:scale-95 ${
                    key === 'C' || key === '<'
                      ? 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 hover:from-slate-200 hover:to-slate-300 hover:shadow-md border border-slate-200'
                      : 'bg-gradient-to-r from-white to-slate-50 text-slate-900 hover:from-slate-100 hover:to-slate-200 hover:shadow-md border border-slate-200'
                  }`}
                >
                  {key === '<' ? <ChevronLeft className="w-6 h-6 mx-auto" /> : key}
                </button>
              ))
            ))}
          </div>
        </div>

        {/* Premium Action Button */}
        <Button
          onClick={() => navigate(`/pay/123?amount=${amount}`)}
          disabled={amount === '0.00'}
          className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/30 disabled:shadow-none transform hover:scale-[1.01] disabled:transform-none"
        >
          {amount === '0.00' ? 'Enter Amount' : `Pay $${amount}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentScreen; 