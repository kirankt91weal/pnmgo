import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Mail, MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';

const ConfirmScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for receipt sharing modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [shareContacts, setShareContacts] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Get amount from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const rawAmount = urlParams.get('amount') || '150.00';
  const tipAmount = parseFloat(urlParams.get('tip') || '0');
  const fromTransactions = urlParams.get('from') === 'transactions';
  
  // Auto-open modal for new payments (not from transactions view)
  React.useEffect(() => {
    if (!fromTransactions) {
      // Small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        setShowShareModal(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [fromTransactions]);


  
  // Get selected items from URL parameters
  const selectedOrder = urlParams.get('order') ? JSON.parse(decodeURIComponent(urlParams.get('order'))) : null;
  const selectedCatalog = urlParams.get('catalog') ? JSON.parse(decodeURIComponent(urlParams.get('catalog'))) : null;
  const selectedMemo = urlParams.get('memo') ? JSON.parse(decodeURIComponent(urlParams.get('memo'))) : null;
  
  // Clean the amount and ensure proper formatting
  const cleanAmount = rawAmount.replace(/^\$+/, '').replace(/,/g, ''); // Remove any existing $ symbols and commas
  const baseAmount = parseFloat(cleanAmount);
  const amount = `$${baseAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  // Debug logging to see what's happening
  console.log('Debug amount parsing:', { rawAmount, cleanAmount, baseAmount, amount });
  
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

  // Handle receipt sharing
  const handleShareReceipt = () => {
    setShowShareModal(true);
  };

  const handleSendReceipt = async () => {
    if (!shareContacts.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending receipt (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSending(false);
    setShowConfirmation(true);
    
    // Close confirmation after 2 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      setShowShareModal(false);
      setShareContacts('');
    }, 2000);
  };

  const handleCancelShare = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowShareModal(false);
      setIsClosingModal(false);
      setShareContacts('');
    }, 200);
  };

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

        {/* Selected Items or Custom Fields */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md shadow-gray-200/30 dark:shadow-gray-900/30">
          <CardContent className="p-5">
            <div className="space-y-3">
              {selectedOrder ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Order Number:</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{selectedOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Customer:</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Customer ID:</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{selectedOrder.customerNumber}</span>
                  </div>
                </div>
              ) : selectedCatalog ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Service Type:</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Parts & Labor</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Catalog Total:</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">${selectedCatalog.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Service Category:</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Automotive</span>
                  </div>
                </div>
              ) : selectedMemo ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Memo:</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200 text-right max-w-xs break-words">{selectedMemo.text}</span>
                  </div>
                </div>
              ) : (
                // Fallback to placeholder custom fields if no items selected
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
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <Button
            onClick={() => navigate('/payment')}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5 mr-3" />
            New Payment
          </Button>
          
          <Button
            onClick={handleShareReceipt}
            variant="outline"
            className="w-full h-12 bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-300 dark:hover:border-gray-500 font-medium rounded-xl transition-all duration-200"
          >
            <Mail className="w-4 h-4 mr-2" />
            Share Receipt
          </Button>
        </div>
      </div>

      {/* Receipt Sharing Modal */}
      {showShareModal && (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ${
          isClosingModal ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transition-all duration-300 ease-out transform ${
            isClosingModal ? 'translate-y-4 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
          }`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200">Share Receipt</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelShare}
                className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-200">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={shareContacts}
                    onChange={(e) => setShareContacts(e.target.value)}
                    placeholder="Enter email or phone number (separate multiple with commas)"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Supports multiple contacts separated by commas
                </p>
              </div>

              {/* Receipt Preview */}
              <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-gray-400">Amount:</span>
                  <span className="font-medium text-slate-700 dark:text-gray-200">{amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-gray-400">Total:</span>
                  <span className="font-medium text-slate-700 dark:text-gray-200">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-gray-400">Date:</span>
                  <span className="font-medium text-slate-700 dark:text-gray-200">{dateString}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-gray-700">
              <Button
                onClick={handleCancelShare}
                variant="outline"
                className="flex-1 h-12 bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-300 dark:hover:border-gray-500 font-medium rounded-xl transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendReceipt}
                disabled={!shareContacts.trim() || isSending}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {isSending ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-in slide-in-from-bottom-4 duration-300 ease-out">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200 mb-2">Receipt Sent!</h3>
            <p className="text-slate-600 dark:text-gray-400">Your receipt has been sent successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmScreen; 