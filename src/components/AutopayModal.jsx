import React, { useState, useEffect, useCallback } from 'react';
import { X, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCashApp } from '@fortawesome/free-brands-svg-icons';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import VenmoIcon from './VenmoIcon';

const AutopayModal = ({ isOpen, onClose, onSetupComplete, scannedData, paymentMethod, downPaymentAmount }) => {
  const [frequency, setFrequency] = useState('bi-weekly');
  const [startDate, setStartDate] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get loan data from scanned document
  const loanAmount = scannedData?.loanAmount ? parseFloat(scannedData.loanAmount.replace(/[$,]/g, '')) : 0;
  const monthlyPayment = scannedData?.monthlyPayment ? parseFloat(scannedData.monthlyPayment) : 0;
  const customerName = scannedData?.customerName || 'Customer';
  const vin = scannedData?.vin || 'N/A';

  // Calculate payment amounts based on frequency
  const getPaymentAmount = () => {
    switch (frequency) {
      case 'weekly':
        return monthlyPayment / 4;
      case 'bi-weekly':
        return monthlyPayment / 2;
      case 'monthly':
        return monthlyPayment;
      default:
        return monthlyPayment / 2;
    }
  };

  // Calculate next payment date
  const getNextPaymentDate = useCallback(() => {
    const today = new Date();
    let nextDate = new Date(today);
    
    switch (frequency) {
      case 'weekly':
        nextDate.setDate(today.getDate() + 7);
        break;
      case 'bi-weekly':
        nextDate.setDate(today.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(today.getMonth() + 1);
        break;
      default:
        nextDate.setDate(today.getDate() + 14);
    }
    
    return nextDate.toISOString().split('T')[0];
  }, [frequency]);

  // Set default start date on component mount
  useEffect(() => {
    if (isOpen && !startDate) {
      setStartDate(getNextPaymentDate());
    }
  }, [isOpen, startDate, getNextPaymentDate]);

  // Get payment method icon and details
  const getPaymentMethodDisplay = () => {
    switch (paymentMethod) {
      case 'ach':
        return {
          icon: <FontAwesomeIcon icon={faBuildingColumns} className="w-6 h-6 text-emerald-600" />,
          name: 'Bank Account',
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50'
        };
      case 'cashapp':
        return {
          icon: <FontAwesomeIcon icon={faCashApp} className="w-6 h-6 text-emerald-600" />,
          name: 'Cash App Pay',
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50'
        };
      case 'venmo':
        return {
          icon: <VenmoIcon className="w-6 h-6 text-blue-500" />,
          name: 'Venmo',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50'
        };
      case 'keyin':
      case 'tap':
      default:
        return {
          icon: <FontAwesomeIcon icon={faCcVisa} className="w-6 h-6 text-blue-600" />,
          name: 'Credit/Debit Card',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        };
    }
  };

  const paymentMethodDisplay = getPaymentMethodDisplay();

  const handleSetupAutopay = async () => {
    if (!acceptedTerms) return;
    
    setIsProcessing(true);
    
    // Simulate API call to setup autopay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setShowSuccess(true);
    
    // Show success for 3 seconds then complete
    setTimeout(() => {
      onSetupComplete({
        frequency,
        startDate,
        paymentAmount: getPaymentAmount(),
        nextPaymentDate: startDate
      });
    }, 3000);
  };

  const handleSkip = () => {
    onSetupComplete(null); // No autopay setup
  };

  const handleClose = () => {
    onClose(); // Just close the modal, don't trigger completion flow
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200">Setup AutoPay</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Success State */}
        {showSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-700 dark:text-gray-200 mb-2">
                AutoPay Setup Complete!
              </h4>
              <p className="text-slate-600 dark:text-gray-400">
                Your automatic payments have been configured successfully.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                First payment scheduled for {new Date(startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Loan Summary */}
            <Card className="bg-slate-50 dark:bg-gray-700 border-slate-200 dark:border-gray-600">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-slate-500 dark:text-gray-400 mb-1">Loan Amount</div>
                    <div className="font-medium text-slate-700 dark:text-gray-200">${loanAmount.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-500 dark:text-gray-400 mb-1">Monthly Payment</div>
                    <div className="font-medium text-slate-700 dark:text-gray-200">${monthlyPayment.toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-500 dark:text-gray-400 mb-1">Loan Term</div>
                    <div className="font-medium text-slate-700 dark:text-gray-200">{scannedData?.loanTerm || 60} months</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-500 dark:text-gray-400 mb-1">AutoPay Discount</div>
                    <div className="font-medium text-green-600 dark:text-green-400">-0.25% APR</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-slate-50 dark:bg-gray-700 border-slate-200 dark:border-gray-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-7 h-7 ${paymentMethodDisplay.bgColor} rounded-lg flex items-center justify-center`}>
                      {paymentMethodDisplay.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-gray-200">{paymentMethodDisplay.name}</span>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-slate-500 dark:text-gray-400">Down: <span className="font-medium text-slate-700 dark:text-gray-200">${downPaymentAmount}</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AutoPay Configuration */}
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-slate-700 dark:text-gray-200">Payment Frequency</span>
              </div>
              
              {/* Frequency Selection */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'weekly', label: 'Weekly', amount: monthlyPayment / 4 },
                  { value: 'bi-weekly', label: 'Bi-Weekly', amount: monthlyPayment / 2 },
                  { value: 'monthly', label: 'Monthly', amount: monthlyPayment }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFrequency(option.value)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      frequency === option.value
                        ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:border-blue-400 dark:text-blue-300'
                        : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:border-slate-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                        ${option.amount.toFixed(2)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>



            {/* Terms and Conditions */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="terms" className="text-sm text-slate-600 dark:text-gray-400 leading-tight">
                  I agree to AutoPay terms and automatic deductions from my payment method.
                </label>
              </div>
              

            </div>

            {/* Action Buttons */}
            <div className="pt-4">
              <Button
                onClick={handleSetupAutopay}
                disabled={!acceptedTerms || isProcessing}
                size="sm"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Setting up...
                  </div>
                ) : (
                  'Setup AutoPay'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutopayModal; 