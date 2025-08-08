import React, { useState } from 'react';
import { X, Plus, Minus, Wrench, Package, Clock, DollarSign, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

const CatalogModal = ({ isOpen, onClose, onCatalogComplete }) => {
  const [selectedCategory, setSelectedCategory] = useState('parts');
  const [selectedItems, setSelectedItems] = useState([]);
  const [laborHours, setLaborHours] = useState(0);

  // Mock catalog data
  const catalogData = {
    parts: [
      { id: 'P001', name: 'Oil Filter', price: 12.99, category: 'Maintenance' },
      { id: 'P002', name: 'Brake Pads (Front)', price: 89.99, category: 'Brakes' },
      { id: 'P003', name: 'Brake Pads (Rear)', price: 79.99, category: 'Brakes' },
      { id: 'P004', name: 'Air Filter', price: 24.99, category: 'Maintenance' },
      { id: 'P005', name: 'Spark Plugs (Set)', price: 45.99, category: 'Engine' },
      { id: 'P006', name: 'Battery', price: 129.99, category: 'Electrical' },
      { id: 'P007', name: 'Tire (Standard)', price: 89.99, category: 'Tires' },
      { id: 'P008', name: 'Wiper Blades (Set)', price: 18.99, category: 'Maintenance' },
      { id: 'P009', name: 'Radiator Hose', price: 34.99, category: 'Cooling' },
      { id: 'P010', name: 'Fuel Filter', price: 19.99, category: 'Fuel System' }
    ],
    services: [
      { id: 'S001', name: 'Oil Change', price: 29.99, hours: 0.5, category: 'Maintenance' },
      { id: 'S002', name: 'Brake Service', price: 89.99, hours: 1.5, category: 'Brakes' },
      { id: 'S003', name: 'Tire Rotation', price: 24.99, hours: 0.5, category: 'Tires' },
      { id: 'S004', name: 'Tune Up', price: 149.99, hours: 2.0, category: 'Engine' },
      { id: 'S005', name: 'AC Recharge', price: 89.99, hours: 1.0, category: 'HVAC' },
      { id: 'S006', name: 'Wheel Alignment', price: 69.99, hours: 1.0, category: 'Suspension' },
      { id: 'S007', name: 'Battery Replacement', price: 19.99, hours: 0.5, category: 'Electrical' },
      { id: 'S008', name: 'Transmission Service', price: 199.99, hours: 2.5, category: 'Transmission' }
    ]
  };

  const categories = [
    { key: 'parts', label: 'Parts', icon: Package },
    { key: 'services', label: 'Services', icon: Wrench }
  ];

  const laborRate = 85; // $85 per hour

  const handleAddItem = (item) => {
    const existingItem = selectedItems.find(selected => selected.id === item.id);
    
    if (existingItem) {
      setSelectedItems(selectedItems.map(selected => 
        selected.id === item.id 
          ? { ...selected, quantity: selected.quantity + 1 }
          : selected
      ));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      setSelectedItems(selectedItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateLaborCost = () => {
    return laborHours * laborRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateLaborCost();
  };

  const handleComplete = () => {
    const total = calculateTotal();
    onCatalogComplete(total);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-2">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full h-full max-w-sm max-h-[95vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-gray-200">Service Catalog</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-gray-400" />
          </Button>
        </div>

        <div className="flex flex-col h-[calc(95vh-80px)]">
          {/* Category Tabs */}
          <div className="flex space-x-2 p-4 border-b border-slate-200 dark:border-gray-700">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all duration-200 flex-1 ${
                    selectedCategory === category.key
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:border-slate-300 dark:hover:border-gray-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Catalog Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {catalogData[selectedCategory].map((item) => (
                    <Card
                      key={item.id}
                      className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-700 border-slate-200 dark:border-gray-600"
                      onClick={() => handleAddItem(item)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {selectedCategory === 'parts' ? (
                                <Package className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                              ) : (
                                <Wrench className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                              )}
                              <span className="font-semibold text-slate-700 dark:text-gray-200 text-sm">{item.name}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-gray-400">{item.category}</p>
                            {selectedCategory === 'services' && (
                              <p className="text-xs text-slate-500 dark:text-gray-500">{item.hours} hour{item.hours !== 1 ? 's' : ''}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-700 dark:text-gray-200 text-sm">${item.price}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <span className="text-xs text-slate-500 dark:text-gray-400">Add</span>
                              <Plus className="w-3 h-3 text-slate-400 dark:text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Bottom Section - Cart & Labor */}
              <div className="border-t border-slate-200 dark:border-gray-700 p-4 space-y-4">
                {/* Labor Hours */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-600 dark:text-gray-400" />
                    <h3 className="font-semibold text-slate-700 dark:text-gray-200 text-sm">Labor Hours</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLaborHours(Math.max(0, laborHours - 0.5))}
                      className="p-2 h-8 w-8"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Input
                      type="number"
                      value={laborHours}
                      onChange={(e) => setLaborHours(parseFloat(e.target.value) || 0)}
                      className="w-16 text-center bg-white dark:bg-gray-700 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-100 text-sm"
                      step="0.5"
                      min="0"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLaborHours(laborHours + 0.5)}
                      className="p-2 h-8 w-8"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <span className="text-xs text-slate-500 dark:text-gray-400 ml-2">
                      ${laborRate}/hr
                    </span>
                  </div>
                </div>

                {/* Selected Items */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-gray-200 text-sm mb-2">Selected Items</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedItems.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-slate-50 dark:bg-gray-700 border-slate-200 dark:border-gray-600"
                      >
                        <CardContent className="p-2">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-xs font-medium text-slate-700 dark:text-gray-200">{item.name}</p>
                              <p className="text-xs text-slate-500 dark:text-gray-500">{item.category}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 h-5 w-5"
                              >
                                <Minus className="w-2 h-2" />
                              </Button>
                              <span className="text-xs font-medium text-slate-700 dark:text-gray-200 w-6 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 h-5 w-5"
                              >
                                <Plus className="w-2 h-2" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-1 h-5 w-5 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-2 h-2" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-slate-500 dark:text-gray-500">
                              ${item.price} each
                            </span>
                            <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {selectedItems.length === 0 && (
                      <p className="text-xs text-slate-500 dark:text-gray-400 text-center py-2">
                        No items selected
                      </p>
                    )}
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-semibold text-slate-700 dark:text-gray-200 text-sm">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-gray-400">Labor ({laborHours}h):</span>
                    <span className="font-semibold text-slate-700 dark:text-gray-200 text-sm">
                      ${calculateLaborCost().toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-gray-700 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 dark:text-gray-200">Total:</span>
                      <span className="font-bold text-slate-700 dark:text-gray-200">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Complete Button */}
                <Button
                  onClick={handleComplete}
                  disabled={selectedItems.length === 0 && laborHours === 0}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Complete Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogModal; 