'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Download, Upload, Filter, X, Calendar, 
  TrendingUp, BarChart3, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { 
  Trade, TradeType, Platform, SecurityType, ViewMode, 
  DailyStats, FilterOptions 
} from '@/lib/types';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, 
         addDays, addMonths, subMonths, isSameDay, parseISO, startOfYear, endOfYear } from 'date-fns';
import Sidebar from '@/components/Sidebar';

export default function TradingJournalPage() {
  // State
  const [trades, setTrades] = useState<Trade[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({ type: 'all', securityType: 'all', platform: 'all' });
  const [showAddTrade, setShowAddTrade] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCSVImport, setShowCSVImport] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Trade>>({
    type: 'BUY',
    volume: 0,
    symbol: '',
    dateTime: new Date().toISOString(),
    profitLoss: 0,
    broker: '',
    platform: 'MT5',
    securityType: 'Forex',
    comments: '',
  });

  // Load trades from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mql5-trading-journal');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setTrades(data.trades || []);
      } catch (e) {
        console.error('Failed to load trades:', e);
      }
    } else {
      // Add sample data for testing
      const now = new Date();
      const sampleTrades: Trade[] = [
        {
          id: 'sample-1',
          type: 'BUY',
          volume: 1.0,
          symbol: 'EURUSD',
          dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30).toISOString(),
          profitLoss: 150.50,
          broker: 'IC Markets',
          platform: 'MT5',
          securityType: 'Forex',
          comments: 'Sample winning trade',
          createdAt: now.toISOString()
        },
        {
          id: 'sample-2',
          type: 'SELL',
          volume: 0.5,
          symbol: 'GBPUSD',
          dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 15).toISOString(),
          profitLoss: -75.25,
          broker: 'IC Markets',
          platform: 'MT5',
          securityType: 'Forex',
          comments: 'Sample losing trade',
          createdAt: now.toISOString()
        },
        {
          id: 'sample-3',
          type: 'BUY',
          volume: 2.0,
          symbol: 'USDJPY',
          dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 9, 0).toISOString(),
          profitLoss: 230.00,
          broker: 'IC Markets',
          platform: 'MT5',
          securityType: 'Forex',
          comments: 'Sample trade from yesterday',
          createdAt: now.toISOString()
        }
      ];
      setTrades(sampleTrades);
    }
  }, []);

  // Save trades to localStorage
  useEffect(() => {
    if (trades.length > 0) {
      localStorage.setItem('mql5-trading-journal', JSON.stringify({ trades }));
    }
  }, [trades]);

  // Calculate daily statistics
  const calculateDailyStats = (date: string): DailyStats => {
    const dayTrades = getFilteredTrades().filter(trade => 
      format(parseISO(trade.dateTime), 'yyyy-MM-dd') === date
    );

    const winCount = dayTrades.filter(t => t.profitLoss > 0).length;
    const lossCount = dayTrades.filter(t => t.profitLoss < 0).length;
    const totalVolume = dayTrades.reduce((sum, t) => sum + t.volume, 0);
    const totalProfitLoss = dayTrades.reduce((sum, t) => sum + t.profitLoss, 0);
    const winRate = dayTrades.length > 0 ? (winCount / dayTrades.length) * 100 : 0;
    const comments = dayTrades.map(t => t.comments).filter(c => c).join('; ').substring(0, 50);

    return {
      date,
      totalVolume,
      tradeCount: dayTrades.length,
      winCount,
      lossCount,
      winRate,
      totalProfitLoss,
      comments,
    };
  };

  // Get filtered trades
  const getFilteredTrades = (): Trade[] => {
    return trades.filter(trade => {
      if (filters.symbol && !trade.symbol.toLowerCase().includes(filters.symbol.toLowerCase())) return false;
      if (filters.type && filters.type !== 'all' && trade.type !== filters.type) return false;
      if (filters.securityType && filters.securityType !== 'all' && trade.securityType !== filters.securityType) return false;
      if (filters.broker && !trade.broker.toLowerCase().includes(filters.broker.toLowerCase())) return false;
      if (filters.platform && filters.platform !== 'all' && trade.platform !== filters.platform) return false;
      if (filters.startDate && format(parseISO(trade.dateTime), 'yyyy-MM-dd') < filters.startDate) return false;
      if (filters.endDate && format(parseISO(trade.dateTime), 'yyyy-MM-dd') > filters.endDate) return false;
      return true;
    });
  };

  // Add trade handler
  const handleAddTrade = () => {
    if (!formData.symbol || !formData.volume || !formData.broker) {
      alert('Please fill in all required fields');
      return;
    }

    const newTrade: Trade = {
      id: `trade-${Date.now()}`,
      type: formData.type as TradeType,
      volume: formData.volume,
      symbol: formData.symbol.toUpperCase(),
      dateTime: formData.dateTime || new Date().toISOString(),
      profitLoss: formData.profitLoss || 0,
      broker: formData.broker,
      platform: formData.platform as Platform,
      securityType: formData.securityType as SecurityType,
      comments: formData.comments || '',
      createdAt: new Date().toISOString(),
    };

    setTrades([...trades, newTrade]);
    setShowAddTrade(false);
    setFormData({
      type: 'BUY',
      volume: 0,
      symbol: '',
      dateTime: new Date().toISOString(),
      profitLoss: 0,
      broker: '',
      platform: 'MT5',
      securityType: 'Forex',
      comments: '',
    });
  };

  // CSV Export
  const handleExportCSV = () => {
    const csv = [
      ['Type', 'Volume', 'Symbol', 'DateTime', 'P/L', 'Broker', 'Platform', 'SecurityType', 'Comments'].join(','),
      ...getFilteredTrades().map(t => 
        [t.type, t.volume, t.symbol, t.dateTime, t.profitLoss, t.broker, t.platform, t.securityType, t.comments].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trading_journal_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  // Get tile color based on P/L
  const getTileColor = (stats: DailyStats): string => {
    if (stats.tradeCount === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (stats.totalProfitLoss > 0) return 'bg-green-100 dark:bg-green-900/30 border-green-500';
    if (stats.totalProfitLoss < 0) return 'bg-red-100 dark:bg-red-900/30 border-red-500';
    return 'bg-gray-100 dark:bg-gray-800';
  };

  // Month view calendar
  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = [];
    
    for (let d = start; d <= end; d = addDays(d, 1)) {
      days.push(d);
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-sm text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        {Array.from({ length: start.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const stats = calculateDailyStats(dateStr);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`aspect-square border-2 rounded-lg p-2 cursor-pointer transition-all hover:shadow-lg ${
                getTileColor(stats)
              } ${isToday ? 'ring-2 ring-blue-500' : ''} ${
                selectedDate === dateStr ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="text-sm font-semibold">{format(day, 'd')}</div>
              {stats.tradeCount > 0 && (
                <div className="mt-1 text-xs space-y-0.5">
                  <div className="font-semibold">
                    {stats.totalProfitLoss >= 0 ? '+' : ''}${stats.totalProfitLoss.toFixed(2)}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{stats.tradeCount} trades</div>
                  <div className="text-gray-500 dark:text-gray-500">{stats.winRate.toFixed(0)}% WR</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Week view
  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    const days = [];
    
    for (let d = start; d <= end; d = addDays(d, 1)) {
      days.push(d);
    }

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const stats = calculateDailyStats(dateStr);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg min-h-[200px] ${
                getTileColor(stats)
              } ${isToday ? 'ring-2 ring-blue-500' : ''} ${
                selectedDate === dateStr ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="text-lg font-bold">{format(day, 'EEE')}</div>
              <div className="text-2xl font-semibold">{format(day, 'd')}</div>
              {stats.tradeCount > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="text-lg font-bold">
                    {stats.totalProfitLoss >= 0 ? '+' : ''}${stats.totalProfitLoss.toFixed(2)}
                  </div>
                  <div className="text-sm">{stats.tradeCount} trades</div>
                  <div className="text-sm">Vol: {stats.totalVolume.toFixed(2)}</div>
                  <div className="text-sm">{stats.winRate.toFixed(0)}% Win Rate</div>
                  {stats.comments && (
                    <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {stats.comments}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Year view
  const renderYearView = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(currentDate.getFullYear(), i, 1));
    }

    return (
      <div className="grid grid-cols-3 gap-4">
        {months.map(month => {
          const start = startOfMonth(month);
          const end = endOfMonth(month);
          const monthTrades = getFilteredTrades().filter(trade => {
            const tradeDate = parseISO(trade.dateTime);
            return tradeDate >= start && tradeDate <= end;
          });

          const totalPL = monthTrades.reduce((sum, t) => sum + t.profitLoss, 0);
          const winCount = monthTrades.filter(t => t.profitLoss > 0).length;
          const winRate = monthTrades.length > 0 ? (winCount / monthTrades.length) * 100 : 0;

          return (
            <div
              key={month.getMonth()}
              onClick={() => {
                setCurrentDate(month);
                setViewMode('month');
              }}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                monthTrades.length === 0 ? 'bg-gray-100 dark:bg-gray-800' :
                totalPL > 0 ? 'bg-green-100 dark:bg-green-900/30 border-green-500' :
                totalPL < 0 ? 'bg-red-100 dark:bg-red-900/30 border-red-500' :
                'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <div className="text-lg font-bold">{format(month, 'MMMM')}</div>
              {monthTrades.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="text-xl font-bold">
                    {totalPL >= 0 ? '+' : ''}${totalPL.toFixed(2)}
                  </div>
                  <div className="text-sm">{monthTrades.length} trades</div>
                  <div className="text-sm">{winRate.toFixed(0)}% Win Rate</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Day view with hourly breakdown
  const renderDayView = () => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const dayTrades = getFilteredTrades().filter(trade => 
      format(parseISO(trade.dateTime), 'yyyy-MM-dd') === dateStr
    ).sort((a, b) => a.dateTime.localeCompare(b.dateTime));

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Volume</div>
            <div className="text-xl font-bold">{dayTrades.reduce((sum, t) => sum + t.volume, 0).toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400"># Trades</div>
            <div className="text-xl font-bold">{dayTrades.length}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Win Rate</div>
            <div className="text-xl font-bold">
              {dayTrades.length > 0 
                ? `${((dayTrades.filter(t => t.profitLoss > 0).length / dayTrades.length) * 100).toFixed(0)}%`
                : '0%'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total P/L</div>
            <div className={`text-xl font-bold ${
              dayTrades.reduce((sum, t) => sum + t.profitLoss, 0) >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {dayTrades.reduce((sum, t) => sum + t.profitLoss, 0) >= 0 ? '+' : ''}
              ${dayTrades.reduce((sum, t) => sum + t.profitLoss, 0).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">W/L</div>
            <div className="text-xl font-bold">
              {dayTrades.filter(t => t.profitLoss > 0).length}/
              {dayTrades.filter(t => t.profitLoss < 0).length}
            </div>
          </div>
        </div>

        {/* Trade list */}
        <div className="space-y-2">
          {dayTrades.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No trades on this day
            </div>
          ) : (
            dayTrades.map(trade => (
              <div
                key={trade.id}
                className={`p-4 border-2 rounded-lg ${
                  trade.profitLoss > 0 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${
                        trade.type === 'BUY' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {trade.type}
                      </span>
                      <span className="font-bold text-lg">{trade.symbol}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {format(parseISO(trade.dateTime), 'HH:mm:ss')}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Volume:</span> {trade.volume}
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Broker:</span> {trade.broker}
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Platform:</span> {trade.platform}
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Type:</span> {trade.securityType}
                      </div>
                    </div>
                    {trade.comments && (
                      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        {trade.comments}
                      </div>
                    )}
                  </div>
                  <div className={`text-right text-xl font-bold ${
                    trade.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss.toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 ml-16 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-8 h-8" />
              Trading Journal
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track and analyze your trading performance
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-6">
            {/* View mode selector */}
            <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
              {(['day', 'week', 'month', 'year'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded transition-colors ${
                    viewMode === mode
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* Date navigation */}
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  if (viewMode === 'year') setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1));
                  else setCurrentDate(subMonths(currentDate, 1));
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 font-semibold min-w-[150px] text-center">
                {viewMode === 'year' && format(currentDate, 'yyyy')}
                {viewMode === 'month' && format(currentDate, 'MMMM yyyy')}
                {viewMode === 'week' && `Week of ${format(startOfWeek(currentDate), 'MMM d')}`}
                {viewMode === 'day' && format(currentDate, 'MMMM d, yyyy')}
              </span>
              <button
                onClick={() => {
                  if (viewMode === 'year') setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
                  else setCurrentDate(addMonths(currentDate, 1));
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="ml-2 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Today
              </button>
            </div>

            {/* Action buttons */}
            <button
              onClick={() => setShowAddTrade(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Trade
            </button>

            <button
              onClick={() => setShowCSVImport(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Upload className="w-5 h-5" />
              Import CSV
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              Export
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Symbol</label>
                  <input
                    type="text"
                    value={filters.symbol || ''}
                    onChange={e => setFilters({ ...filters, symbol: e.target.value })}
                    placeholder="e.g. EURUSD"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={filters.type || 'all'}
                    onChange={e => setFilters({ ...filters, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="all">All</option>
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Security Type</label>
                  <select
                    value={filters.securityType || 'all'}
                    onChange={e => setFilters({ ...filters, securityType: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="all">All</option>
                    <option value="Forex">Forex</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Futures">Futures</option>
                    <option value="Crypto">Crypto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Broker</label>
                  <input
                    type="text"
                    value={filters.broker || ''}
                    onChange={e => setFilters({ ...filters, broker: e.target.value })}
                    placeholder="e.g. IC Markets"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setFilters({ type: 'all', securityType: 'all', platform: 'all' })}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          {/* Calendar views */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'year' && renderYearView()}
            {viewMode === 'day' && renderDayView()}
          </div>

          {/* Add Trade Modal */}
          {showAddTrade && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Add New Trade</h2>
                  <button onClick={() => setShowAddTrade(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type *</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as TradeType })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="BUY">BUY</option>
                      <option value="SELL">SELL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Volume *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.volume}
                      onChange={e => setFormData({ ...formData, volume: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Symbol *</label>
                    <input
                      type="text"
                      value={formData.symbol}
                      onChange={e => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                      placeholder="e.g. EURUSD"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date & Time</label>
                    <input
                      type="datetime-local"
                      value={formData.dateTime ? format(parseISO(formData.dateTime), "yyyy-MM-dd'T'HH:mm") : ''}
                      onChange={e => setFormData({ ...formData, dateTime: new Date(e.target.value).toISOString() })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Profit/Loss ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.profitLoss}
                      onChange={e => setFormData({ ...formData, profitLoss: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Broker *</label>
                    <input
                      type="text"
                      value={formData.broker}
                      onChange={e => setFormData({ ...formData, broker: e.target.value })}
                      placeholder="e.g. IC Markets"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Platform</label>
                    <select
                      value={formData.platform}
                      onChange={e => setFormData({ ...formData, platform: e.target.value as Platform })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="MT5">MT5</option>
                      <option value="MT4">MT4</option>
                      <option value="cTrader">cTrader</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Security Type</label>
                    <select
                      value={formData.securityType}
                      onChange={e => setFormData({ ...formData, securityType: e.target.value as SecurityType })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="Forex">Forex</option>
                      <option value="Stocks">Stocks</option>
                      <option value="Futures">Futures</option>
                      <option value="Crypto">Crypto</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Comments</label>
                    <textarea
                      value={formData.comments}
                      onChange={e => setFormData({ ...formData, comments: e.target.value })}
                      placeholder="Add notes about this trade..."
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowAddTrade(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTrade}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Add Trade
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CSV Import Modal Placeholder */}
          {showCSVImport && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Import CSV</h2>
                  <button onClick={() => setShowCSVImport(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-center py-12">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">CSV Import functionality coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">Will support MT5, IC Markets, and other broker formats</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
