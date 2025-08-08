import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Check, ChevronRight, X, RotateCcw, CreditCard, AlertCircle, RefreshCw, ChevronLeft } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const TransactionsScreen = () => {
  const navigate = useNavigate();
  const today = new Date();
  const todayStr = `${today.getMonth() + 1}/${today.getDate()}`;
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'complete', 'declined', 'refunded'
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const dateContainerRef = useRef(null);

  // Card brand icons
  const cardBrands = [
    { icon: faCcVisa, name: 'Visa', color: 'text-[#1A1F71]' }, // Visa blue
    { icon: faCcMastercard, name: 'Mastercard', color: 'text-[#EB001B]' }, // Mastercard red
    { icon: faCcAmex, name: 'Amex', color: 'text-[#006FCF]' }, // Amex blue
    { icon: faCcDiscover, name: 'Discover', color: 'text-[#FF6000]' } // Discover orange
  ];

  // Generate dates for the last 90 days (more comprehensive range)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      dates.push({
        id: `${month}/${day}`,
        display: `${month}/${day}`,
        date: date
      });
    }
    return dates;
  };

  const dates = generateDates();

  // Function to ensure selected date is in the dates array
  const ensureDateInRange = (dateStr) => {
    const [month, day] = dateStr.split('/').map(Number);
    const selectedDate = new Date(new Date().getFullYear(), month - 1, day);
    const today = new Date();
    const daysDiff = Math.floor((today - selectedDate) / (1000 * 60 * 60 * 24));
    
    // If the date is more than 90 days ago, we need to expand the range
    if (daysDiff > 90) {
      // For now, we'll just log this - in a real app you might want to dynamically load more dates
      console.log('Selected date is outside current range:', dateStr);
    }
  };

  // Scroll to today's date when component mounts
  useEffect(() => {
    if (dateContainerRef.current) {
      const todayIndex = dates.findIndex(date => date.id === todayStr);
      if (todayIndex !== -1) {
        const scrollContainer = dateContainerRef.current;
        // Get the actual width of a date card by measuring the first one
        const firstDateCard = scrollContainer.querySelector('button');
        const dateWidth = firstDateCard ? firstDateCard.offsetWidth + 8 : 120; // 8px for gap
        
        // Calculate the scroll position to center the selected date
        const scrollPosition = todayIndex * dateWidth - scrollContainer.clientWidth / 2 + dateWidth / 2;
        
        // Ensure we don't scroll past the beginning or end
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
        
        scrollContainer.scrollTo({
          left: finalScrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [dates, todayStr]);

  // Scroll to selected date when it changes
  useEffect(() => {
    if (dateContainerRef.current && selectedDate) {
      ensureDateInRange(selectedDate);
      const selectedIndex = dates.findIndex(date => date.id === selectedDate);
      console.log('Scrolling to date:', selectedDate, 'Found at index:', selectedIndex);
      
      if (selectedIndex !== -1) {
        const scrollContainer = dateContainerRef.current;
        // Get the actual width of a date card by measuring the first one
        const firstDateCard = scrollContainer.querySelector('button');
        const dateWidth = firstDateCard ? firstDateCard.offsetWidth + 8 : 120; // 8px for gap
        
        // Calculate the scroll position to center the selected date
        const scrollPosition = selectedIndex * dateWidth - scrollContainer.clientWidth / 2 + dateWidth / 2;
        
        // Ensure we don't scroll past the beginning or end
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
        
        scrollContainer.scrollTo({
          left: finalScrollPosition,
          behavior: 'smooth'
        });
      } else {
        console.log('Date not found in range:', selectedDate);
      }
    }
  }, [selectedDate, dates]);

  // Mock transaction data with randomized card brands and statuses
  const generateTransactions = () => {
    const transactions = [];
    const today = new Date();
    
    // Generate transactions for the last 7 days
    for (let day = 6; day >= 0; day--) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - day);
      const dateStr = `${currentDate.getMonth() + 1}/${String(currentDate.getDate()).padStart(2, '0')}/23`;
      
      // Random number of transactions for this day (15-25)
      const numTransactions = Math.floor(Math.random() * 11) + 15; // 15-25
      
      // Calculate status distribution
      const completed = Math.floor(numTransactions * 0.85); // ~85% completed
      const declined = Math.min(Math.floor(Math.random() * 4), 3); // 0-3 declined
      const refunded = Math.min(Math.floor(Math.random() * 2), 1); // 0-1 refunded
      
      // Generate completed transactions
      for (let i = 0; i < completed; i++) {
        const cardBrand = cardBrands[Math.floor(Math.random() * cardBrands.length)];
        const amount = (Math.random() * 500 + 10).toFixed(2); // $10-$510
        const hour = Math.floor(Math.random() * 12) + 6; // 6 AM - 6 PM
        const minute = Math.floor(Math.random() * 60);
        const timeStr = `${hour}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        
        transactions.push({
          id: transactions.length + 1,
          cardBrand,
          lastFour: String(Math.floor(Math.random() * 9000) + 1000),
          status: 'Complete',
          statusIcon: Check,
          statusColor: 'text-green-600',
          date: dateStr,
          amount: `$${amount}`,
          transactionId: `TXN-${String(transactions.length + 1).padStart(3, '0')}`,
          time: timeStr
        });
      }
      
      // Generate declined transactions
      for (let i = 0; i < declined; i++) {
        const cardBrand = cardBrands[Math.floor(Math.random() * cardBrands.length)];
        const amount = (Math.random() * 300 + 10).toFixed(2);
        const hour = Math.floor(Math.random() * 12) + 6;
        const minute = Math.floor(Math.random() * 60);
        const timeStr = `${hour}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        
        transactions.push({
          id: transactions.length + 1,
          cardBrand,
          lastFour: String(Math.floor(Math.random() * 9000) + 1000),
          status: 'Declined',
          statusIcon: X,
          statusColor: 'text-red-600',
          date: dateStr,
          amount: `$${amount}`,
          transactionId: `TXN-${String(transactions.length + 1).padStart(3, '0')}`,
          time: timeStr
        });
      }
      
      // Generate refunded transactions
      for (let i = 0; i < refunded; i++) {
        const cardBrand = cardBrands[Math.floor(Math.random() * cardBrands.length)];
        const amount = (Math.random() * 200 + 10).toFixed(2);
        const hour = Math.floor(Math.random() * 12) + 6;
        const minute = Math.floor(Math.random() * 60);
        const timeStr = `${hour}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        
        transactions.push({
          id: transactions.length + 1,
          cardBrand,
          lastFour: String(Math.floor(Math.random() * 9000) + 1000),
          status: 'Refunded',
          statusIcon: RotateCcw,
          statusColor: 'text-blue-600',
          date: dateStr,
          amount: `$${amount}`,
          transactionId: `TXN-${String(transactions.length + 1).padStart(3, '0')}`,
          time: timeStr
        });
      }
    }
    
    return transactions;
  };

  const transactions = generateTransactions();

  const handleTransactionClick = (transaction) => {
    navigate(`/confirm?amount=${transaction.amount}&transactionId=${transaction.transactionId}&from=transactions`);
  };

  const handleCalendarSelect = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const newDateStr = `${month}/${day}`;
    
    // Only allow selecting dates that are in the available range
    const isInRange = dates.some(d => d.id === newDateStr);
    if (isInRange) {
      setSelectedDate(newDateStr);
      setShowCalendar(false);
      
      // Add a small delay to ensure the modal is closed and DOM is updated before scrolling
      setTimeout(() => {
        if (dateContainerRef.current) {
          const selectedIndex = dates.findIndex(date => date.id === newDateStr);
          if (selectedIndex !== -1) {
            const scrollContainer = dateContainerRef.current;
            const firstDateCard = scrollContainer.querySelector('button');
            const dateWidth = firstDateCard ? firstDateCard.offsetWidth + 8 : 120;
            
            const scrollPosition = selectedIndex * dateWidth - scrollContainer.clientWidth / 2 + dateWidth / 2;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
            
            scrollContainer.scrollTo({
              left: finalScrollPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    } else {
      console.log('Date not in range:', newDateStr);
    }
  };

  const generateCalendarDays = () => {
    const currentMonth = currentCalendarMonth.getMonth();
    const currentYear = currentCalendarMonth.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const days = [];
    
    // Add previous month's days to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth, -i);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Add next month's days to fill the last week
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentCalendarMonth(new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentCalendarMonth(new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentCalendarMonth(new Date());
    
    // Also select today's date and trigger scroll
    const today = new Date();
    const todayStr = `${today.getMonth() + 1}/${today.getDate()}`;
    
    // Only update if it's different from current selection
    if (todayStr !== selectedDate) {
      setSelectedDate(todayStr);
      setShowCalendar(false);
      
      // Add a small delay to ensure the modal is closed and DOM is updated before scrolling
      setTimeout(() => {
        if (dateContainerRef.current) {
          const selectedIndex = dates.findIndex(date => date.id === todayStr);
          if (selectedIndex !== -1) {
            const scrollContainer = dateContainerRef.current;
            const firstDateCard = scrollContainer.querySelector('button');
            const dateWidth = firstDateCard ? firstDateCard.offsetWidth + 8 : 120;
            
            const scrollPosition = selectedIndex * dateWidth - scrollContainer.clientWidth / 2 + dateWidth / 2;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
            
            scrollContainer.scrollTo({
              left: finalScrollPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    }
  };

  const calendarDays = generateCalendarDays();

  // Calculate summary stats
  const completedTransactions = transactions.filter(t => t.status === 'Complete').length;
  const declinedTransactions = transactions.filter(t => t.status === 'Declined').length;
  const refundedTransactions = transactions.filter(t => t.status === 'Refunded').length;
  const totalAmount = transactions
    .filter(t => t.status === 'Complete')
    .reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '')), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>
        <h1 className="text-lg font-medium text-gray-700 dark:text-gray-200 tracking-wide">Transactions</h1>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          onClick={() => setShowCalendar(true)}
        >
          <Calendar className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Date</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCalendar(false)}
                className="p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousMonth}
                className="p-1"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {currentCalendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToToday}
                  className="text-xs px-2 py-1"
                >
                  Today
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextMonth}
                className="p-1"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
              
              {calendarDays.map(({ date, isCurrentMonth }, index) => {
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = `${date.getMonth() + 1}/${date.getDate()}` === selectedDate;
                const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                const isInRange = dates.some(d => d.id === dateStr);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleCalendarSelect(date)}
                    disabled={!isInRange}
                    className={`p-1 text-sm rounded transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : isToday
                        ? 'bg-gray-100 text-gray-700'
                        : isCurrentMonth && isInRange
                        ? 'text-gray-700 hover:bg-gray-50'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCalendar(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setShowCalendar(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container space-y-6 p-6">
        {/* Date Selector */}
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide" ref={dateContainerRef}>
              {dates.map((date) => (
                <button
                  key={date.id}
                  onClick={() => setSelectedDate(date.id)}
                  className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    selectedDate === date.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-background dark:bg-gray-700 text-muted-foreground dark:text-gray-300 border-border dark:border-gray-600 hover:bg-accent dark:hover:bg-gray-600 hover:text-accent-foreground dark:hover:text-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-xs mb-1 ${
                      selectedDate === date.id 
                        ? 'text-white font-bold' 
                        : 'text-muted-foreground/70 dark:text-gray-400'
                    }`}>
                      {date.date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`text-base ${
                      selectedDate === date.id 
                        ? 'font-bold' 
                        : 'font-semibold'
                    }`}>
                      {date.date.getDate()}
                    </div>
                    <div className={`text-xs ${
                      selectedDate === date.id 
                        ? 'text-white font-bold' 
                        : 'text-muted-foreground/70 dark:text-gray-400'
                    }`}>
                      {date.date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-3">
          <Card 
            className={`border-0 shadow-sm bg-gray-800 dark:bg-gray-800 text-white cursor-pointer transition-all hover:bg-gray-700 dark:hover:bg-gray-700 ${activeFilter === 'complete' ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => setActiveFilter(activeFilter === 'complete' ? 'all' : 'complete')}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-green-400">{completedTransactions}</p>
                <p className="text-xs text-gray-400">${totalAmount.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`border-0 shadow-sm bg-gray-800 dark:bg-gray-800 text-white cursor-pointer transition-all hover:bg-gray-700 dark:hover:bg-gray-700 ${activeFilter === 'declined' ? 'ring-2 ring-red-400' : ''}`}
            onClick={() => setActiveFilter(activeFilter === 'declined' ? 'all' : 'declined')}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <p className="text-2xl font-bold text-red-400">{declinedTransactions}</p>
                <p className="text-xs text-gray-400">Failed</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`border-0 shadow-sm bg-gray-800 dark:bg-gray-800 text-white cursor-pointer transition-all hover:bg-gray-700 dark:hover:bg-gray-700 ${activeFilter === 'refunded' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setActiveFilter(activeFilter === 'refunded' ? 'all' : 'refunded')}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <RefreshCw className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-blue-400">{refundedTransactions}</p>
                <p className="text-xs text-gray-400">Returns</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`border-0 shadow-sm bg-gray-800 dark:bg-gray-800 text-white cursor-pointer transition-all hover:bg-gray-700 dark:hover:bg-gray-700 ${activeFilter === 'all' ? 'ring-2 ring-white' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{transactions.length}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions
            .filter(transaction => {
              if (activeFilter === 'all') return true;
              return transaction.status.toLowerCase() === activeFilter;
            })
            .map((transaction) => {
              const StatusIcon = transaction.statusIcon;
              return (
                <Card 
                  key={transaction.id}
                  className="cursor-pointer transition-all hover:shadow-md border-0 shadow-sm bg-white dark:bg-gray-800"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        {/* Left Side - Card Info */}
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700">
                            <FontAwesomeIcon 
                              icon={transaction.cardBrand.icon} 
                              className={`h-6 w-6 ${transaction.cardBrand.color} dark:text-gray-300`}
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">•••• {transaction.lastFour}</span>
                              <div className="flex items-center space-x-1">
                                <StatusIcon className={`h-3 w-3 ${transaction.statusColor}`} />
                                <span className={`text-xs font-medium ${transaction.statusColor}`}>{transaction.status}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date} • {transaction.time}</p>
                          </div>
                        </div>
                        
                        {/* Right Side - Amount */}
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-semibold ${transaction.status === 'Declined' ? 'text-red-600' : transaction.status === 'Refunded' ? 'text-blue-600' : 'text-gray-900 dark:text-gray-100'}`}>
                            {transaction.status === 'Declined' ? '-' : transaction.status === 'Refunded' ? '-' : ''}{transaction.amount}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TransactionsScreen; 