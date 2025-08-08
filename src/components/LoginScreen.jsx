import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

const LoginScreen = () => {
  const [siteId, setSiteId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!siteId || !accessCode) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
                {/* Logo and Branding */}
        <div className="text-center mb-6">
          <div className="relative w-64 h-64 mx-auto">
            <img src="/paynearme-logo.png" alt="PayNearMe" className="w-full h-full object-contain" />
            <p className="absolute bottom-0 left-0 right-0 text-blue-300 text-xs font-semibold tracking-[0.1em] uppercase pb-1">
              Now Supporting In-Person Payments
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="PayNearMe Site ID"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                className="h-14 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 rounded-xl text-base font-medium"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Access Code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="h-14 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 rounded-xl text-base font-medium"
                required
              />
            </div>

                          <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                disabled={isLoading || !siteId || !accessCode}
              >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
                              ) : (
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5" />
                    <span>Login</span>
                  </div>
                )}
            </Button>
          </form>
        </div>

        {/* Security Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
            <Shield className="w-4 h-4" />
            <span className="font-medium">PCI DSS Compliant • End-to-End Encrypted</span>
          </div>
        </div>

        {/* Demo Mode Indicator */}
        <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
          <p className="text-xs text-gray-400 text-center">
            <span className="text-blue-400 font-semibold">DEMO MODE:</span> Use any credentials to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 