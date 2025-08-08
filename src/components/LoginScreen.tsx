import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Site } from '../types';
import { payNearMeApi } from '../services/api';

const LoginScreen: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      setLoading(true);
      const response = await payNearMeApi.getSites();
      
      if (response.success && response.data) {
        setSites(response.data);
      } else {
        setError('Failed to load sites');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSiteSelect = (site: Site) => {
    // Store selected site in localStorage for session management
    localStorage.setItem('selectedSite', JSON.stringify(site));
    navigate('/lookup');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={loadSites}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-700 mb-2">PayNearMe Go</h1>
            <p className="text-gray-600">Select your location to begin</p>
          </div>
        </div>
      </div>

      {/* Site Selection */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="space-y-4">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => handleSiteSelect(site)}
              className="w-full bg-white rounded-lg border border-gray-200 p-6 text-left hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">{site.name}</h3>
                  <p className="text-sm text-gray-600">{site.location}</p>
                </div>
                <div className="text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Demo Mode</h4>
          <p className="text-sm text-blue-800">
            This is a prototype. All data is simulated. Try order numbers: <strong>ORD-001</strong> or <strong>ORD-002</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 