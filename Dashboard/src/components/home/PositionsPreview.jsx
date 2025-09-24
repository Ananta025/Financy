import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrading } from '../../context/tradingHooks.js';
import TradingService from '../../services/tradingService.js';
import ExitPositionModal from '../position/ExitPositionModal';

const PositionsPreview = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  const { positions, loading, errors, exitPosition } = useTrading();
  
  const isLoading = loading.positions;
  const error = errors.positions;

  // Format currency values
  const formatCurrency = (value) => {
    return TradingService.formatCurrency(value);
  };
  
  const handleOpenExitModal = (position) => {
    setSelectedPosition(position);
    setShowExitModal(true);
  };
  
  const handleCloseExitModal = () => {
    setShowExitModal(false);
    setSelectedPosition(null);
  };
  
  const handleExitPosition = async (positionId, exitData) => {
    try {
      const result = await exitPosition(positionId, exitData);
      if (result.success) {
        console.log('Position exited successfully');
        handleCloseExitModal();
      } else {
        console.error('Failed to exit position:', result.error);
        // TODO: Show error notification
      }
    } catch (err) {
      console.error('Error exiting position:', err);
      // TODO: Show error notification
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Open Positions</h2>
          <Link to="/position" className="text-sm text-blue-600 hover:underline">View All</Link>
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
          <h2 className="text-lg font-semibold text-gray-800">Open Positions</h2>
          <Link to="/position" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">Failed to load positions</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Open Positions</h2>
        <Link to="/position" className="text-sm text-blue-600 hover:underline">View All</Link>
      </div>
      
      <div className="space-y-3">
        {positions.map((position) => (
          <div key={position._id} className="p-3 border border-gray-400 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{position.stock}</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                    {position.type || 'MIS'}
                  </span>
                  <span className="text-xs text-gray-500">{position.quantity} qty</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(position.currentPrice)}</p>
                <p className={`text-xs font-medium ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {position.pnl >= 0 ? '+' : ''}{formatCurrency(Math.abs(position.pnl))} ({Math.abs(position.pnlPercent).toFixed(2)}%)
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
