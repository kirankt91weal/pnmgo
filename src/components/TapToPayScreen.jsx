import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ShoppingCart, SmartphoneNfc, Check } from 'lucide-react';
import { Button } from './ui/button';

const TapToPayScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dots, setDots] = useState([]);
  const [showCheck, setShowCheck] = useState(false);
  const [isKeyInMode, setIsKeyInMode] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Get amount from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const amount = urlParams.get('amount') || '$17.25';

  // Generate animated dots
  useEffect(() => {
    const generateDots = () => {
      const newDots = [];
      for (let i = 0; i < 50; i++) {
        newDots.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 3
        });
      }
      setDots(newDots);
    };
    generateDots();
  }, []);

  // Navigate to receipt after 3 seconds of showing check
  useEffect(() => {
    if (showCheck) {
      const receiptTimer = setTimeout(() => {
        navigate(`/confirm?amount=${amount}`);
      }, 3000);

      return () => {
        clearTimeout(receiptTimer);
      };
    }
  }, [showCheck, navigate, amount]);

  const handleSimulate = () => {
    setShowCheck(true);
  };

  const handleKeyIn = () => {
    setIsKeyInMode(true);
  };

  const handleCancel = () => {
    if (isKeyInMode) {
      setIsKeyInMode(false);
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
    } else {
      navigate('/payment');
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCompletePayment = () => {
    // Navigate to confirmation with card info
    navigate(`/confirm?amount=${amount}&method=keyin`);
  };

  return (
    <div className="h-screen bg-black relative overflow-hidden" style={{ overflow: 'hidden', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Animated Background Dots */}
      <div className="absolute inset-0">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              animationDelay: `${dot.animationDelay}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full pb-20">
        {/* Top Section - Only show if not in key-in mode */}
        {!isKeyInMode && (
          <div className="flex flex-col items-center px-6 pt-4">
            {/* NFC Icon */}
            <div className="relative mb-2">
              {showCheck ? (
                <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center border-2 border-green-400 animate-pulse">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <SmartphoneNfc className="w-8 h-8 text-white" />
                </div>
              )}
              {/* NFC Signal Lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 border border-blue-400/30 rounded-full animate-ping" />
                <div className="absolute w-36 h-36 border border-blue-400/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute w-44 h-44 border border-blue-400/10 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Instructions */}
            <h2 className="text-white text-lg font-medium text-center">
              {showCheck ? "Card Tapped" : "Hold Here to Pay"}
            </h2>
          </div>
        )}

        {/* Payment Details Card */}
        <div className="px-6 flex-1 flex items-center justify-center">
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 w-full max-w-sm">
            {/* Merchant Icon */}
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Merchant Name */}
            <h3 className="text-white text-center text-base font-medium mb-2">
              Pay Grapner's Greenhouse
            </h3>
            
            {/* Payment Amount */}
            <div className="text-center mb-6">
              <span className="text-white text-2xl font-bold">
                ${amount}
              </span>
            </div>

            {/* Action Buttons */}
            {!isKeyInMode ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleSimulate}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
                >
                  Simulate
                </Button>
                <Button
                  onClick={handleKeyIn}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
                >
                  Key In
                </Button>
              </div>
            ) : (
              /* Card Input Fields */
              <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                {/* Hidden dummy form to trick browser */}
                <div style={{ display: 'none' }}>
                  <input type="text" name="cc-number" autoComplete="off" />
                  <input type="text" name="cc-exp" autoComplete="off" />
                  <input type="text" name="cc-cvv" autoComplete="off" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                    <input
                      type="url"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      maxLength="19"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      data-form-type="other"
                      inputMode="numeric"
                      name="url-field-1"
                      data-lpignore="true"
                      data-1p-ignore="true"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Exp Date</label>
                      <input
                        type="url"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        maxLength="5"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        data-form-type="other"
                        inputMode="numeric"
                        name="url-field-2"
                        data-lpignore="true"
                        data-1p-ignore="true"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                      <input
                        type="url"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        maxLength="4"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        data-form-type="other"
                        inputMode="numeric"
                        name="url-field-3"
                        data-lpignore="true"
                        data-1p-ignore="true"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCompletePayment}
                    disabled={!cardNumber || !expiryDate || !cvv}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-200"
                  >
                    Complete Payment
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Cancel Button */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleCancel}
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-600 hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TapToPayScreen; 