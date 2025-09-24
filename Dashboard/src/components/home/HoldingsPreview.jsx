import React from 'react';
import { Link } from 'react-router-dom';
import { useTrading } from '../../context/tradingHooks.js';
import TradingService from '../../services/tradingService.js';

const HoldingsPreview = () => {
  const { holdings, loading, errors } = useTrading();
  
  const isLoading = loading.holdings;
  const error = errors.holdings;

  // Format currency values
  const formatCurrency = (value) => {
    return TradingService.formatCurrency(value);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Holdings</h2>
          <Link to="/holding" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Holdings</h2>
          <Link to="/holding" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">Failed to load holdings</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Holdings</h2>
        <Link to="/holding" className="text-sm text-blue-600 hover:underline">View All</Link>
      </div>
      
      <div className="space-y-3">
        {holdings.map((holding) => (
          <div key={holding._id} className="p-3 border border-gray-400 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{holding.stock}</h3>
                <p className="text-xs text-gray-500">{holding.quantity} shares</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(holding.currentPrice)}</p>
                <p className={`text-xs ${holding.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {holding.dayChange >= 0 ? '+' : ''}{holding.dayChange}%
                </p>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-gray-300 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Invested</p>
                <p className="font-medium text-sm">{formatCurrency(holding.investedValue)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Current</p>
                <p className="font-medium text-sm">{formatCurrency(holding.currentValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">P&L</p>
                <p className={`font-medium text-sm ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {holding.pnl >= 0 ? '+' : ''}{formatCurrency(Math.abs(holding.pnl))} ({Math.abs(holding.pnlPercent).toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {holdings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You don't have any holdings yet.</p>
          <Link to="/orders" className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Start Trading
          </Link>
        </div>
      )}
    </div>
  );
};

export default HoldingsPreview;
