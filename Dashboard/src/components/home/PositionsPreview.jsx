import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExitPositionModal from '../position/ExitPositionModal';

const PositionsPreview = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  // Sample positions data
  const positions = [
    { 
      id: 1,
      name: 'Infosys',
      symbol: 'INFY',
      type: 'MIS',
      quantity: 10,
      entryPrice: 1475.50,
      currentPrice: 1498.25,
      pnl: 227.50,
      pnlPercent: 1.54
    },
    { 
      id: 2,
      name: 'Bharti Airtel',
      symbol: 'BHARTIARTL',
      type: 'MIS',
      quantity: 20,
      entryPrice: 875.25,
      currentPrice: 868.75,
      pnl: -130.00,
      pnlPercent: -0.74
    },
    { 
      id: 3,
      name: 'State Bank of India',
      symbol: 'SBIN',
      type: 'MIS',
      quantity: 25,
      entryPrice: 580.50,
      currentPrice: 590.25,
      pnl: 243.75,
      pnlPercent: 1.68
    }
  ];

  // Format currency values
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString();
  };
  
  const handleOpenExitModal = (position) => {
    setSelectedPosition(position);
    setShowExitModal(true);
  };
  
  const handleCloseExitModal = () => {
    setShowExitModal(false);
    setSelectedPosition(null);
  };
  
  const handleExitPosition = (id, qty, options) => {
    console.log(`Exiting position ${id}, quantity: ${qty}, options:`, options);
    // This would call an API in a real app
    handleCloseExitModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Open Positions</h2>
        <Link to="/position" className="text-sm text-blue-600 hover:underline">View All</Link>
      </div>
      
      <div className="space-y-3">
        {positions.map((position) => (
          <div key={position.id} className="p-3 border border-gray-400 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{position.symbol}</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                    {position.type}
                  </span>
                  <span className="text-xs text-gray-500">{position.quantity} qty</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(position.currentPrice)}</p>
                <p className={`text-xs font-medium ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)} ({Math.abs(position.pnlPercent)}%)
                </p>
              </div>
            </div>
            
            <div className="mt-3 flex justify-end space-x-2">
              <button 
                onClick={() => handleOpenExitModal(position)}
                className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
              >
                Exit
              </button>
              <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                Modify
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {positions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You don't have any open positions.</p>
          <Link to="/orders" className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Start Trading
          </Link>
        </div>
      )}
      
      {showExitModal && selectedPosition && (
        <ExitPositionModal 
          open={showExitModal}
          handleClose={handleCloseExitModal}
          position={selectedPosition}
          handleExit={handleExitPosition}
        />
      )}
    </div>
  );
};

export default PositionsPreview;
