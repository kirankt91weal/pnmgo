import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, CreditCard, Settings, Zap } from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/home',
      activeColor: 'from-blue-500 to-blue-600',
      inactiveColor: 'text-gray-400'
    },
    { 
      icon: FileText, 
      label: 'Transactions', 
      path: '/transactions',
      activeColor: 'from-blue-500 to-blue-600',
      inactiveColor: 'text-gray-400'
    },
    { 
      icon: CreditCard, 
      label: 'Payment', 
      path: '/payment',
      activeColor: 'from-purple-500 to-purple-600',
      inactiveColor: 'text-gray-400'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      activeColor: 'from-gray-500 to-gray-600',
      inactiveColor: 'text-gray-400'
    }
  ];

  // Don't show navigation on login page
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="pb-20">
        {children}
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-700 rounded-t-xl shadow-sm">
          <div className="flex justify-around items-center py-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition-all duration-150 ease-out ${
                    isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <div className="w-7 h-7 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout; 