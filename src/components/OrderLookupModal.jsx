import React, { useState, useCallback, useMemo } from 'react';
import { X, Search, Clock, FileText, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

const OrderLookupModal = ({ isOpen, onClose, onOrderSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Mock order data
  const mockOrders = useMemo(() => [
    {
      id: 'ORD-001',
      orderNumber: 'ORD-001',
      customerNumber: 'CUST-001',
      customerName: 'John Smith',
      firstName: 'John',
      lastName: 'Smith',
      amount: 45.99,
      status: 'Pending',
      date: '2024-01-15'
    },
    {
      id: 'ORD-002',
      orderNumber: 'ORD-002',
      customerNumber: 'CUST-002',
      customerName: 'Sarah Johnson',
      firstName: 'Sarah',
      lastName: 'Johnson',
      amount: 127.50,
      status: 'Pending',
      date: '2024-01-15'
    },
    {
      id: 'ORD-003',
      orderNumber: 'ORD-003',
      customerNumber: 'CUST-003',
      customerName: 'Mike Davis',
      firstName: 'Mike',
      lastName: 'Davis',
      amount: 89.99,
      status: 'Pending',
      date: '2024-01-14'
    },
    {
      id: 'ORD-004',
      orderNumber: 'ORD-004',
      customerNumber: 'CUST-004',
      customerName: 'Emily Wilson',
      firstName: 'Emily',
      lastName: 'Wilson',
      amount: 234.75,
      status: 'Pending',
      date: '2024-01-14'
    },
    {
      id: 'ORD-005',
      orderNumber: 'ORD-005',
      customerNumber: 'CUST-005',
      customerName: 'David Brown',
      firstName: 'David',
      lastName: 'Brown',
      amount: 67.25,
      status: 'Pending',
      date: '2024-01-13'
    },
    {
      id: 'ORD-006',
      orderNumber: 'ORD-006',
      customerNumber: 'CUST-006',
      customerName: 'Lisa Garcia',
      firstName: 'Lisa',
      lastName: 'Garcia',
      amount: 156.80,
      status: 'Pending',
      date: '2024-01-13'
    }
  ], []);

  // Mock recently viewed orders (in a real app, this would come from localStorage or API)
  const recentlyViewedOrders = useMemo(() => [
    {
      id: 'ORD-001',
      orderNumber: 'ORD-001',
      customerNumber: 'CUST-001',
      customerName: 'John Smith',
      firstName: 'John',
      lastName: 'Smith',
      amount: 45.99,
      status: 'Pending',
      date: '2024-01-15',
      lastViewed: '2 minutes ago'
    },
    {
      id: 'ORD-003',
      orderNumber: 'ORD-003',
      customerNumber: 'CUST-003',
      customerName: 'Mike Davis',
      firstName: 'Mike',
      lastName: 'Davis',
      amount: 89.99,
      status: 'Pending',
      date: '2024-01-14',
      lastViewed: '5 minutes ago'
    },
    {
      id: 'ORD-002',
      orderNumber: 'ORD-002',
      customerNumber: 'CUST-002',
      customerName: 'Sarah Johnson',
      firstName: 'Sarah',
      lastName: 'Johnson',
      amount: 127.50,
      status: 'Pending',
      date: '2024-01-15',
      lastViewed: '10 minutes ago'
    }
  ], []);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const searchValue = searchTerm.toLowerCase();
      const results = mockOrders.filter(order => {
        // Wildcard search across all fields
        return (
          order.orderNumber.toLowerCase().includes(searchValue) ||
          order.customerNumber.toLowerCase().includes(searchValue) ||
          order.customerName.toLowerCase().includes(searchValue) ||
          order.firstName.toLowerCase().includes(searchValue) ||
          order.lastName.toLowerCase().includes(searchValue) ||
          order.amount.toString().includes(searchValue)
        );
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  }, [searchTerm, mockOrders]);

  const handleOrderSelect = (order) => {
    onOrderSelect(order);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Auto-search as user types (with debounce)
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, handleSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-2">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full h-full max-w-sm max-h-[95vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-gray-200">Order Lookup</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-gray-400" />
          </Button>
        </div>

        {/* Search Section */}
        <div className="p-4 space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Search Orders</label>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search by order number, customer name, amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white dark:bg-gray-700 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-gray-500"
              />
              <Button
                onClick={handleSearch}
                disabled={!searchTerm.trim() || isSearching}
                className="px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400">
              Search across order numbers, customer names, and amounts
            </p>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="px-4 pb-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-gray-400 mb-3">
              Found {searchResults.length} order{searchResults.length !== 1 ? 's' : ''}
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {searchResults.map((order) => (
                <Card
                  key={order.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-700 border-slate-200 dark:border-gray-600"
                  onClick={() => handleOrderSelect(order)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                          <span className="font-semibold text-slate-700 dark:text-gray-200 text-sm">{order.orderNumber}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-gray-400">{order.customerName}</p>
                        <p className="text-xs text-slate-500 dark:text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-700 dark:text-gray-200 text-sm">${order.amount}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-xs text-slate-500 dark:text-gray-400">Select</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 dark:text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchResults.length === 0 && searchTerm && !isSearching && (
          <div className="px-4 pb-4">
            <div className="text-center py-6">
              <Search className="w-10 h-10 text-slate-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-gray-400">No orders found</p>
              <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">Try a different search term</p>
            </div>
          </div>
        )}

        {/* Recently Viewed Orders */}
        {!searchTerm && (
          <div className="px-4 pb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-4 h-4 text-slate-500 dark:text-gray-400" />
              <h3 className="text-sm font-medium text-slate-600 dark:text-gray-400">Recently Viewed</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentlyViewedOrders.map((order) => (
                <Card
                  key={order.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-700 border-slate-200 dark:border-gray-600"
                  onClick={() => handleOrderSelect(order)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                          <span className="font-semibold text-slate-700 dark:text-gray-200 text-sm">{order.orderNumber}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-gray-400">{order.customerName}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-3 h-3 text-slate-400 dark:text-gray-500" />
                          <span className="text-xs text-slate-500 dark:text-gray-500">{order.lastViewed}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-700 dark:text-gray-200 text-sm">${order.amount}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-xs text-slate-500 dark:text-gray-400">Select</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 dark:text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderLookupModal; 