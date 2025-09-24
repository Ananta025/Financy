import React, { useState } from 'react';
import TradeModal from '../TradeModel';

const Watchlist = () => {
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedTradeType, setSelectedTradeType] = useState('Buy');
  
  // Sample watchlist data
  const watchlistStocks = [
    { 
      id: 1, 
      name: 'Reliance Industries', 
      symbol: 'RELIANCE', 
      price: 2650.30, 
      change: 1.75, 
      isUp: true,
      sparkline: [2610, 2630, 2615, 2622, 2635, 2650]
    },
    { 
      id: 2, 
      name: 'HDFC Bank', 
      symbol: 'HDFCBANK', 
      price: 1645.80, 
      change: -0.55, 
      isUp: false,
      sparkline: [1650, 1655, 1648, 1640, 1642, 1646]
    },
    { 
      id: 3, 
      name: 'Infosys', 
      symbol: 'INFY', 
      price: 1498.25, 
      change: 1.25, 
      isUp: true,
      sparkline: [1480, 1485, 1490, 1486, 1492, 1498]
    },
    { 
      id: 4, 
      name: 'Tata Motors', 
      symbol: 'TATAMOTORS', 
      price: 630.45, 
      change: 2.15, 
      isUp: true,
      sparkline: [615, 620, 625, 622, 627, 630]
    },
    { 
      id: 5, 
      name: 'State Bank of India', 
      symbol: 'SBIN', 
      price: 590.25, 
      change: -0.85, 
      isUp: false,
      sparkline: [595, 593, 591, 588, 589, 590]
    }
  ];
  
  const handleOpenTradeModal = (stock, tradeType) => {
    setSelectedStock(stock);
    setSelectedTradeType(tradeType);
    setShowTradeModal(true);
  };
  
  const handleCloseTradeModal = () => {
    setShowTradeModal(false);
    setSelectedStock(null);
  };
  
  // Function to render mini sparkline chart
  const renderSparkline = (data, isUp) => {
    const height = 20;
    const width = 60;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    // Calculate points
    const points = data.map((value, i) => {
      const x = (width / (data.length - 1)) * i;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="ml-2">
        <polyline
          points={points}
          fill="none"
          stroke={isUp ? '#10b981' : '#ef4444'}
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Watchlist</h2>
        <button className="text-sm text-blue-600 hover:underline">Edit</button>
      </div>
      
      <div className="space-y-2">
        {watchlistStocks.map((stock) => (
          <div key={stock.id} className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{stock.symbol}</h3>
                <p className="text-xs text-gray-500">{stock.name}</p>
              </div>
              <div className="flex items-center">
                {renderSparkline(stock.sparkline, stock.isUp)}
                <div className="text-right ml-2">
                  <p className="font-medium">₹{stock.price}</p>
                  <p className={`text-xs ${stock.isUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.isUp ? '+' : ''}{stock.change}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-2 flex justify-end space-x-2">
              <button 
                onClick={() => handleOpenTradeModal(stock, 'Buy')}
                className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              >
                Buy
              </button>
              <button 
                onClick={() => handleOpenTradeModal(stock, 'Sell')}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {watchlistStocks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Your watchlist is empty.</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Stocks
          </button>
        </div>
      )}
      
      {showTradeModal && selectedStock && (
        <TradeModal
          open={showTradeModal}
          handleClose={handleCloseTradeModal}
          tradeType={selectedTradeType}
          stockName={selectedStock.name}
          stockPrice={selectedStock.price}
          orderDetails={null} // For a new order
        />
      )}
    </div>
  );
};

export default Watchlist;
