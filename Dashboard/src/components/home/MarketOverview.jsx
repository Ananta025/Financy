import React from 'react';

const MarketOverview = () => {
  // Sample market data
  const marketIndices = [
    { 
      name: 'NIFTY 50',
      value: 19294.65,
      change: 142.85,
      changePercent: 0.75,
      isUp: true
    },
    { 
      name: 'SENSEX',
      value: 64874.12,
      change: 425.78,
      changePercent: 0.66,
      isUp: true
    },
    { 
      name: 'NIFTY BANK',
      value: 43984.30,
      change: -156.40,
      changePercent: -0.35,
      isUp: false
    },
    { 
      name: 'NIFTY IT',
      value: 32417.75,
      change: 398.45,
      changePercent: 1.24,
      isUp: true
    }
  ];
  
  // Top gainers and losers
  const topGainers = [
    { name: 'HDFC Bank', change: 3.45 },
    { name: 'Reliance', change: 2.87 },
    { name: 'Infosys', change: 2.56 },
  ];
  
  const topLosers = [
    { name: 'Tata Motors', change: -1.23 },
    { name: 'SBI', change: -0.98 },
    { name: 'Bharti Airtel', change: -0.76 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Market Overview</h2>
      
      {/* Market Indices */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {marketIndices.map((index, i) => (
          <div key={i} className="p-3 border rounded-lg">
            <p className="text-sm text-gray-500">{index.name}</p>
            <p className="text-lg font-semibold">{index.value.toLocaleString()}</p>
            <div className={`flex items-center mt-1 ${index.isUp ? 'text-green-600' : 'text-red-600'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${index.isUp ? '' : 'transform rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                {Math.abs(index.change)} ({Math.abs(index.changePercent)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Gainers and Losers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            Top Gainers
          </h3>
          <div className="space-y-2">
            {topGainers.map((stock, i) => (
              <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="font-medium">{stock.name}</span>
                <span className="text-green-600 font-medium">+{stock.change}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Losers */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            Top Losers
          </h3>
          <div className="space-y-2">
            {topLosers.map((stock, i) => (
              <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="font-medium">{stock.name}</span>
                <span className="text-red-600 font-medium">{stock.change}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
