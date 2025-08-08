import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Bell, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Load theme preference from localStorage and current document state
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem('theme');
    // Navigate to login page
    navigate('/');
  };

  const settingsOptions = [
    {
      icon: isDarkMode ? Sun : Moon,
      title: 'Appearance',
      subtitle: 'Light or dark mode',
      action: (
        <button
          onClick={toggleTheme}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
              isDarkMode ? 'transform translate-x-6' : 'transform translate-x-0.5'
            }`}
          />
        </button>
      )
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Enable/disable notifications',
      action: (
        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
              notificationsEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
            }`}
          />
        </button>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-slate-200/60 dark:border-gray-700/60 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-700 dark:text-gray-200 tracking-wide">Settings</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* Settings Options */}
        <div className="space-y-4">
          {settingsOptions.map((option, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-slate-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700 dark:text-gray-200">{option.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-gray-400">{option.subtitle}</p>
                    </div>
                  </div>
                  {option.action}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout Section */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-gray-200">Logout</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Sign out of your account</p>
                </div>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-slate-700 dark:text-gray-200">PayNearMe Go</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">Version 1.0.0</p>
              <p className="text-xs text-slate-400 dark:text-gray-500">© 2025 PayNearMe. All rights reserved.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen; 