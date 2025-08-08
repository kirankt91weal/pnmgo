import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { X, ShoppingCart, CreditCard, SmartphoneNfc, Check } from 'lucide-react';

const TapToPayScreen = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();
  const [dots, setDots] = useState([]);
  const [showCheck, setShowCheck] = useState(false);
  
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

  // Simulate hand wave animation
  useEffect(() => {
    const checkTimer = setTimeout(() => {
      setShowCheck(true);
    }, 5000);

    return () => {
      clearTimeout(checkTimer);
    };
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

  const handleCancel = () => {
    navigate('/payment');
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
        {/* Top Section - NFC Icon and Instructions */}
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
            <div className="text-center">
              <span className="text-white text-2xl font-bold">
                ${amount}
              </span>
            </div>
            

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