import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Hash, DollarSign, Percent, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-medium text-gray-800 tracking-wide">Dashboard</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="p-6 space-y-6">
        {/* Time Range Selector */}
        <div className="flex bg-white rounded-xl p-1 border-0 shadow-md shadow-gray-200/30">
          {timeRanges.map((range) => (
            <button
              key={range.key}
              onClick={() => setSelectedTimeRange(range.key)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedTimeRange === range.key
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Chart Placeholder */}
        <Card className="bg-white border-0 shadow-lg shadow-gray-200/50">
          <CardContent className="p-8">
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200/30">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-600">Chart Placeholder</p>
                <p className="text-sm text-gray-400 mt-1">Transaction data visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className={`${metric.color} border-0 shadow-md shadow-gray-200/30 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
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