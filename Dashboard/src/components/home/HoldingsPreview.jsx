import React from 'react';
import { Link } from 'react-router-dom';

const HoldingsPreview = () => {
  // Sample holdings data
  const holdings = [
    { 
      id: 1,
      name: 'Reliance Industries',
      symbol: 'RELIANCE',
      quantity: 10,
      avgPrice: 2540.75,
      ltp: 2650.30,
      investedValue: 25407.50,
      currentValue: 26503.00,
      pnl: 1095.50,
      pnlPercent: 4.31,
      dayChange: 0.75
    },
    { 
      id: 2,
      name: 'Tata Consultancy Services',
      symbol: 'TCS',
      quantity: 5,
      avgPrice: 3210.50,
      ltp: 3350.75,
      investedValue: 16052.50,
      currentValue: 16753.75,
      pnl: 701.25,
      pnlPercent: 4.37,
      dayChange: 1.25
    },
    { 
      id: 3,
      name: 'HDFC Bank',
      symbol: 'HDFCBANK',
      quantity: 15,
      avgPrice: 1680.25,
      ltp: 1648.50,
      investedValue: 25203.75,
      currentValue: 24727.50,
      pnl: -476.25,
      pnlPercent: -1.89,
      dayChange: -0.50
    }
  ];

  // Format currency values
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Holdings</h2>
        <Link to="/holding" className="text-sm text-blue-600 hover:underline">View All</Link>
      </div>
      
      <div className="space-y-3">
        {holdings.map((holding) => (
          <div key={holding.id} className="p-3 border border-gray-400 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{holding.symbol}</h3>
                <p className="text-xs text-gray-500">{holding.quantity} shares</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(holding.ltp)}</p>
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
                  {holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)} ({Math.abs(holding.pnlPercent)}%)
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {holdings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You don't have any holdings yet.</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Explore Stocks
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsPreview;
