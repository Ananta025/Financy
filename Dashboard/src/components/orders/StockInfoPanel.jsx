import React from 'react';

const StockInfoPanel = ({ stock }) => {
  // Generate random day data for high/low/open
  const dayHigh = stock.price * (1 + Math.random() * 0.05);
  const dayLow = stock.price * (1 - Math.random() * 0.05);
  const open = stock.price * (1 + (Math.random() * 0.04 - 0.02));
  const volume = Math.floor(Math.random() * 1000000) + 500000;
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">{stock.name}</h2>
          <p className="text-gray-500 text-sm">NSE: {stock.name}</p>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-semibold">₹{stock.price.toFixed(2)}</div>
          <div className={`flex items-center justify-end ${stock.isDown ? 'text-red-500' : 'text-green-500'}`}>
            <span>{stock.percent}%</span>
            {stock.isDown ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Open</p>
          <p className="font-medium">₹{open.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">Day High</p>
          <p className="font-medium">₹{dayHigh.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">Day Low</p>
          <p className="font-medium">₹{dayLow.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">Volume</p>
          <p className="font-medium">{volume.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t text-xs text-gray-500 flex justify-between">
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
        <div className="flex items-center">
          <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live
        </div>
      </div>
    </div>
  );
};

export default StockInfoPanel;
