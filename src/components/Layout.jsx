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
      activeColor: 'from-green-500 to-green-600',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {children}
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-2">
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-t-xl shadow-sm">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition-all duration-150 ease-out ${
                    isActive ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 ${
                    isActive
                      ? `bg-gradient-to-r ${item.activeColor} shadow-sm`
                      : 'group-hover:bg-gray-50'
                  }`}>
                    <item.icon className={`w-4 h-4 transition-all duration-150 ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-600'
                    }`} />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-medium mt-1 ${
                    isActive ? 'font-semibold' : 'font-medium'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className={`w-1 h-1 bg-gradient-to-r ${item.activeColor} rounded-full mt-1`} />
                  )}
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