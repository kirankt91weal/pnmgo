import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, FileText, CreditCard, Settings, TrendingUp, DollarSign, Percent, Hash } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('1W');

  const timeRanges = [
    { key: '1D', label: '1D' },
    { key: '1W', label: '1W' },
    { key: '1M', label: '1M' },
    { key: '1Y', label: '1Y' },
  ];

  const metrics = [
    {
      title: 'Transactions',
      value: '1,359',
      icon: Hash,
      color: 'bg-green-100 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      title: 'Volume',
      value: '$150,769.80',
      icon: DollarSign,
      color: 'bg-purple-100 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Success Rate',
      value: '94.8%',
      icon: Percent,
      color: 'bg-orange-100 border-orange-200',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Average Tender',
      value: '$110.94',
      icon: TrendingUp,
      color: 'bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600'
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="p-4 space-y-6">
        {/* Time Range Selector */}
        <div className="flex bg-white rounded-lg p-1 border border-gray-200">
          {timeRanges.map((range) => (
            <button
              key={range.key}
              onClick={() => setSelectedTimeRange(range.key)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                selectedTimeRange === range.key
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Chart Placeholder */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium">Chart Placeholder</p>
                <p className="text-xs text-gray-400">Transaction data visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className={`${metric.color} border`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>


    </div>
  );
};

export default HomeScreen; 