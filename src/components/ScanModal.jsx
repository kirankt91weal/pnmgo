import React, { useState, useEffect } from 'react';
import { Camera, FileText, CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const ScanModal = ({ isOpen, onClose, onScanComplete, existingData = null }) => {
  const [scanStep, setScanStep] = useState('scanning'); // scanning, extracting, verifying
  const [extractedData, setExtractedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample loan document data for demo - randomized each time
  const generateRandomLoanData = () => {
    const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Amanda', 'James', 'Nicole'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const dealers = ['Premium Auto Sales', 'Elite Motors', 'Drive Time Auto', 'CarMax Express', 'AutoNation Plus', 'Enterprise Auto', 'Hertz Car Sales', 'Budget Auto Group'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const dealer = dealers[Math.floor(Math.random() * dealers.length)];
    
    // Generate random VIN (17 characters)
    const vinChars = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
    let vin = '';
    for (let i = 0; i < 17; i++) {
      vin += vinChars.charAt(Math.floor(Math.random() * vinChars.length));
    }
    
    // Generate random SSN
    const ssn = `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    // Generate random loan amount between $15k and $45k
    const loanAmount = Math.floor(Math.random() * 30000 + 15000);
    
    // Generate random down payment (10-20% of loan amount)
    const downPaymentPercent = Math.random() * 0.1 + 0.1;
    const downPayment = Math.floor(loanAmount * downPaymentPercent);
    
    // Generate random interest rate between 8% and 18%
    const interestRate = (Math.random() * 10 + 8).toFixed(2);
    
    // Generate random loan term (36, 48, 60, or 72 months)
    const loanTerms = [36, 48, 60, 72];
    const loanTerm = loanTerms[Math.floor(Math.random() * loanTerms.length)];
    
    // Calculate monthly payment using simplified formula
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    return {
      customerName: `${firstName} ${lastName}`,
      ssn: ssn,
      vin: vin,
      loanAmount: loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      dealerName: dealer,
      loanDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      interestRate: interestRate,
      loanTerm: loanTerm,
      monthlyPayment: monthlyPayment.toFixed(2),
      downPayment: downPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    };
  };

  const [sampleLoanData, setSampleLoanData] = useState(generateRandomLoanData());

  // Function to generate complete loan data from existing scanned data
  const generateCompleteDataFromExisting = (existingData) => {
    // Start with existing data
    const completeData = { ...existingData };
    
    // Generate missing SSN if not present
    if (!completeData.ssn) {
      const ssn = `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000) + 1000}`;
      completeData.ssn = ssn;
    }
    
    // Generate missing loan amount if not present
    if (!completeData.loanAmount) {
      // Estimate loan amount based on down payment (assuming 10-20% down)
      const downPayment = parseFloat(completeData.downPayment?.replace(/[$,]/g, '') || '3000');
      const downPaymentPercent = Math.random() * 0.1 + 0.1; // 10-20%
      const estimatedLoanAmount = Math.floor(downPayment / downPaymentPercent);
      completeData.loanAmount = estimatedLoanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    // Generate missing interest rate if not present
    if (!completeData.interestRate) {
      completeData.interestRate = (Math.random() * 10 + 8).toFixed(2); // 8-18%
    }
    
    // Generate missing loan term if not present
    if (!completeData.loanTerm) {
      const loanTerms = [36, 48, 60, 72];
      completeData.loanTerm = loanTerms[Math.floor(Math.random() * loanTerms.length)];
    }
    
    // Generate missing monthly payment if not present
    if (!completeData.monthlyPayment) {
      const loanAmount = parseFloat(completeData.loanAmount?.replace(/[$,]/g, '') || '25000');
      const monthlyRate = parseFloat(completeData.interestRate || '12') / 100 / 12;
      const loanTerm = completeData.loanTerm || 60;
      const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
      completeData.monthlyPayment = monthlyPayment.toFixed(2);
    }
    
    // Generate missing loan date if not present
    if (!completeData.loanDate) {
      completeData.loanDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
    
    return completeData;
  };

  useEffect(() => {
    if (isOpen) {
      if (existingData) {
        // View mode - generate complete data by filling in missing fields
        const completeData = generateCompleteDataFromExisting(existingData);
        setExtractedData(completeData);
        setScanStep('viewing');
      } else {
        // New scan mode
        setScanStep('scanning');
        setExtractedData(null);
        setSampleLoanData(generateRandomLoanData());
      }
    }
  }, [isOpen, existingData]);

  const simulateScanning = () => {
    setIsProcessing(true);
    // Simulate scanning process
    setTimeout(() => {
      setExtractedData(sampleLoanData);
      setScanStep('extracting');
      setIsProcessing(false);
    }, 2000);
  };

  const handleDataVerification = () => {
    if (existingData) {
      // In view mode, just close
      onClose();
    } else {
      // In scan mode, complete the scan and return data to parent
      onScanComplete(extractedData);
      onClose();
    }
  };

  const formatSSN = (ssn) => {
    // Handle undefined or null SSN
    if (!ssn) return '***-**-****';
    
    // Remove any non-digit characters and ensure we have exactly 9 digits
    const cleanSSN = ssn.replace(/\D/g, '');
    
    if (cleanSSN.length === 9) {
      // Format as ***-**-1234 (first 5 digits masked, last 4 visible)
      return `***-**-${cleanSSN.slice(-4)}`;
    } else if (cleanSSN.length > 0) {
      // If we have some digits but not exactly 9, mask all but last 4
      const visibleDigits = cleanSSN.slice(-4);
      const maskedDigits = '*'.repeat(Math.max(0, cleanSSN.length - 4));
      return `${maskedDigits}-${visibleDigits}`;
    }
    
    // Fallback for unexpected formats
    return '***-**-****';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button - only visible on scanning step */}
        {scanStep === 'scanning' && (
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="p-6 space-y-6 pb-8">
          {/* Scanning Step */}
          {scanStep === 'scanning' && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-200 mb-2">
                  Scan Loan Document
                </h3>
                <p className="text-slate-600 dark:text-gray-400">
                  Position the loan agreement or purchase contract under the scanner
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 border border-slate-200 dark:border-gray-600">
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-3">
                  <strong>Demo Mode:</strong> This will simulate scanning a sample loan document
                </p>
                <Button
                  onClick={simulateScanning}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isProcessing ? 'Scanning...' : 'Start Scan'}
                </Button>
              </div>
            </div>
          )}

          {/* Data Extraction Step */}
          {scanStep === 'extracting' && extractedData && (
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 text-slate-600 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-200">
                  Review Data
                </h3>
              </div>
              
              <Card className="bg-slate-50 dark:bg-gray-700 border-slate-200 dark:border-gray-600">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Customer Name
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {extractedData.customerName}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        SSN
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {formatSSN(extractedData.ssn)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        VIN
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200 font-mono">
                        {extractedData.vin}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Loan Amount
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        ${extractedData.loanAmount}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Down Payment
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        ${extractedData.downPayment}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Interest Rate
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {extractedData.interestRate}%
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Loan Term
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {extractedData.loanTerm} months
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Monthly Payment
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        ${extractedData.monthlyPayment}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Dealer
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {extractedData.dealerName}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setScanStep('scanning')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDataVerification}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Verify & Continue
                </Button>
              </div>
            </div>
          )}

          {/* Viewing Step - for viewing existing scanned data */}
          {scanStep === 'viewing' && extractedData && (
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 text-slate-600 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-200">
                  Scanned Document Details
                </h3>
              </div>
              
              <Card className="bg-slate-50 dark:bg-gray-700 border-slate-200 dark:border-gray-600">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Customer Name
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {extractedData.customerName}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        SSN
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {formatSSN(extractedData.ssn)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        VIN
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200 font-mono">
                        {extractedData.vin}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Loan Amount
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        ${extractedData.loanAmount}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Down Payment
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        ${extractedData.downPayment}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Interest Rate
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {extractedData.interestRate}%
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Loan Term
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {extractedData.loanTerm} months
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Monthly Payment
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        ${extractedData.monthlyPayment}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                        Dealer
                      </label>
                      <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                        {extractedData.dealerName}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button
                  onClick={onClose}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Verification Step */}
          {scanStep === 'verifying' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-200 mb-2">
                  Data Verification Complete
                </h3>
                <p className="text-slate-600 dark:text-gray-400">
                  The extracted data has been verified and is ready for payment processing
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Ready for Payment Processing
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      Customer: {extractedData.customerName} | VIN: {extractedData.vin}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDataVerification}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {existingData ? 'Close' : 'Complete Scan & Continue to Payment'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanModal; 