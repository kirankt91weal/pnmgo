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

  // Dynamic chart data based on selected time range
  const getChartData = () => {
    switch (selectedTimeRange) {
      case '1D':
        return [
          { label: '00:00', volume: 1200, previous: 1100 },
          { label: '04:00', volume: 800, previous: 700 },
          { label: '08:00', volume: 2100, previous: 1800 },
          { label: '12:00', volume: 3400, previous: 3200 },
          { label: '16:00', volume: 2800, previous: 2500 },
          { label: '20:00', volume: 1800, previous: 1600 },
          { label: '23:59', volume: 900, previous: 800 }
        ];
      case '1W':
        return [
          { label: 'Mon', volume: 3200, previous: 2800 },
          { label: 'Tue', volume: 4100, previous: 3500 },
          { label: 'Wed', volume: 3800, previous: 3200 },
          { label: 'Thu', volume: 5200, previous: 4800 },
          { label: 'Fri', volume: 6100, previous: 5200 },
          { label: 'Sat', volume: 5800, previous: 4900 },
          { label: 'Sun', volume: 4500, previous: 3800 }
        ];
      case '1M':
        return [
          { label: 'Week 1', volume: 18500, previous: 16200 },
          { label: 'Week 2', volume: 22100, previous: 19800 },
          { label: 'Week 3', volume: 19800, previous: 17500 },
          { label: 'Week 4', volume: 25600, previous: 23100 }
        ];
      case '1Y':
        return [
          { label: 'Jan', volume: 85000, previous: 72000 },
          { label: 'Feb', volume: 92000, previous: 78000 },
          { label: 'Mar', volume: 88000, previous: 75000 },
          { label: 'Apr', volume: 95000, previous: 82000 },
          { label: 'May', volume: 102000, previous: 88000 },
          { label: 'Jun', volume: 98000, previous: 84000 },
          { label: 'Jul', volume: 105000, previous: 91000 },
          { label: 'Aug', volume: 112000, previous: 96000 },
          { label: 'Sep', volume: 108000, previous: 93000 },
          { label: 'Oct', volume: 115000, previous: 99000 },
          { label: 'Nov', volume: 118000, previous: 102000 },
          { label: 'Dec', volume: 125000, previous: 108000 }
        ];
      default:
        return [];
    }
  };

  // Dynamic metrics data based on selected time range
  const getMetricsData = () => {
    const chartData = getChartData();
    const totalVolume = chartData.reduce((sum, data) => sum + data.volume, 0);
    const volumeFormatted = totalVolume.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
    switch (selectedTimeRange) {
      case '1D':
        return [
          {
            title: 'Transactions',
            value: '156',
            icon: Hash,
            color: 'bg-green-100 border-green-200',
            iconColor: 'text-green-600',
            change: '+12.3%'
          },
          {
            title: 'Volume',
            value: volumeFormatted,
            icon: DollarSign,
            color: 'bg-purple-100 border-purple-200',
            iconColor: 'text-purple-600',
            change: '+8.7%'
          },
          {
            title: 'Success Rate',
            value: '96.2%',
            icon: Percent,
            color: 'bg-orange-100 border-orange-200',
            iconColor: 'text-orange-600',
            change: '+1.4%'
          },
          {
            title: 'Average Tender',
            value: '$79.81',
            icon: TrendingUp,
            color: 'bg-blue-100 border-blue-200',
            iconColor: 'text-blue-600',
            change: '+5.2%'
          }
        ];
      case '1W':
        return [
          {
            title: 'Transactions',
            value: '1,359',
            icon: Hash,
            color: 'bg-green-100 border-green-200',
            iconColor: 'text-green-600',
            change: '+15.2%'
          },
          {
            title: 'Volume',
            value: volumeFormatted,
            icon: DollarSign,
            color: 'bg-purple-100 border-purple-200',
            iconColor: 'text-purple-600',
            change: '+12.8%'
          },
          {
            title: 'Success Rate',
            value: '94.8%',
            icon: Percent,
            color: 'bg-orange-100 border-orange-200',
            iconColor: 'text-orange-600',
            change: '+2.1%'
          },
          {
            title: 'Average Tender',
            value: '$110.94',
            icon: TrendingUp,
            color: 'bg-blue-100 border-blue-200',
            iconColor: 'text-blue-600',
            change: '+7.6%'
          }
        ];
      case '1M':
        return [
          {
            title: 'Transactions',
            value: '5,847',
            icon: Hash,
            color: 'bg-green-100 border-green-200',
            iconColor: 'text-green-600',
            change: '+18.7%'
          },
          {
            title: 'Volume',
            value: volumeFormatted,
            icon: DollarSign,
            color: 'bg-purple-100 border-purple-200',
            iconColor: 'text-purple-600',
            change: '+14.3%'
          },
          {
            title: 'Success Rate',
            value: '95.1%',
            icon: Percent,
            color: 'bg-orange-100 border-orange-200',
            iconColor: 'text-orange-600',
            change: '+1.8%'
          },
          {
            title: 'Average Tender',
            value: '$147.12',
            icon: TrendingUp,
            color: 'bg-blue-100 border-blue-200',
            iconColor: 'text-blue-600',
            change: '+9.2%'
          }
        ];
      case '1Y':
        return [
          {
            title: 'Transactions',
            value: '68,432',
            icon: Hash,
            color: 'bg-green-100 border-green-200',
            iconColor: 'text-green-600',
            change: '+22.4%'
          },
          {
            title: 'Volume',
            value: volumeFormatted,
            icon: DollarSign,
            color: 'bg-purple-100 border-purple-200',
            iconColor: 'text-purple-600',
            change: '+19.8%'
          },
          {
            title: 'Success Rate',
            value: '96.5%',
            icon: Percent,
            color: 'bg-orange-100 border-orange-200',
            iconColor: 'text-orange-600',
            change: '+2.7%'
          },
          {
            title: 'Average Tender',
            value: '$181.89',
            icon: TrendingUp,
            color: 'bg-blue-100 border-blue-200',
            iconColor: 'text-blue-600',
            change: '+12.3%'
          }
        ];
      default:
        return [];
    }
  };

  const metrics = getMetricsData();
  const chartData = getChartData();
  const maxVolume = Math.max(...chartData.map(d => Math.max(d.volume, d.previous)));

  // Dynamic summary data based on time range
  const getSummaryData = () => {
    const totalVolume = chartData.reduce((sum, data) => sum + data.volume, 0);
    const previousTotal = chartData.reduce((sum, data) => sum + data.previous, 0);
    const growth = ((totalVolume - previousTotal) / previousTotal * 100).toFixed(1);
    
    return {
      total: totalVolume.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      growth: growth,
      isPositive: parseFloat(growth) >= 0
    };
  };

  const summary = getSummaryData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-3 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-medium text-gray-700 tracking-wide">Dashboard</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-5 space-y-5">
        {/* Time Range Selector */}
        <div className="flex bg-white rounded-xl p-1 border-0 shadow-md shadow-gray-200/30">
          {timeRanges.map((range) => (
            <button
              key={range.key}
              onClick={() => setSelectedTimeRange(range.key)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedTimeRange === range.key
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Volume Chart */}
        <Card className="bg-white border-0 shadow-lg shadow-gray-200/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Volume</h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xl font-bold text-gray-700">{summary.total}</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    summary.isPositive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {summary.isPositive ? '+' : ''}{summary.growth}%
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-48 relative">
              <svg width="100%" height="100%" viewBox={`0 0 ${chartData.length * 50 + 50} 160`} className="overflow-visible">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="50" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 32" fill="none" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="2,2"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Previous period area */}
                <path
                  d={`M 25,${160 - (chartData[0].previous / maxVolume) * 120} ${chartData.map((data, index) => {
                    const x = (index * 50) + 25;
                    const y = 160 - ((data.previous / maxVolume) * 120);
                    return `L ${x},${y}`;
                  }).join(' ')} L ${(chartData.length * 50) + 25},160 Z`}
                  fill="url(#previousGradient)"
                  opacity="0.2"
                />
                
                {/* Current period area */}
                <path
                  d={`M 25,${160 - (chartData[0].volume / maxVolume) * 120} ${chartData.map((data, index) => {
                    const x = (index * 50) + 25;
                    const y = 160 - ((data.volume / maxVolume) * 120);
                    return `L ${x},${y}`;
                  }).join(' ')} L ${(chartData.length * 50) + 25},160 Z`}
                  fill="url(#currentGradient)"
                  opacity="0.3"
                />
                
                {/* Previous period line */}
                <polyline
                  points={chartData.map((data, index) => {
                    const x = (index * 50) + 25;
                    const y = 160 - ((data.previous / maxVolume) * 120);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Current period line */}
                <polyline
                  points={chartData.map((data, index) => {
                    const x = (index * 50) + 25;
                    const y = 160 - ((data.volume / maxVolume) * 120);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {chartData.map((data, index) => {
                  const x = (index * 50) + 25;
                  const y = 160 - ((data.volume / maxVolume) * 120);
                  
                  return (
                    <g key={`point-${index}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r="3"
                        fill="white"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        className="transition-all duration-300 hover:r-5"
                      />
                    </g>
                  );
                })}
                
                {/* Labels */}
                {chartData.map((data, index) => {
                  const x = (index * 50) + 25;
                  
                  return (
                    <text
                      key={`label-${index}`}
                      x={x}
                      y="155"
                      textAnchor="middle"
                      className="text-xs fill-gray-500"
                      fontSize="9"
                    >
                      {data.label}
                    </text>
                  );
                })}
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="currentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
                  </linearGradient>
                  <linearGradient id="previousGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Chart legend */}
            <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Current Period</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                <span className="text-xs text-gray-600">Previous Period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className={`${metric.color} border-0 shadow-md shadow-gray-200/30 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                  <div className="text-green-700 px-2 py-1 rounded text-xs font-medium">
                    {metric.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-xl font-bold text-gray-700">{metric.value}</p>
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