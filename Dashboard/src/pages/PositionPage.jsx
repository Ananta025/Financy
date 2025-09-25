import React, { useState, useEffect } from 'react';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import ExitPositionModal from '../components/position/ExitPositionModal';
import { positionManager } from '../Data/Data';
import { TradingService } from '../services/tradingService';
import { useAuth } from '../context/AuthContext';

export default function PositionPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  
  // Load positions data
  useEffect(() => {
    if (isAuthenticated && user) {
      loadPositions();
    } else {
      // Clear positions if user is not authenticated
      setPositions([]);
      setIsLoading(false);
    }
    
    // Subscribe to data refresh events
    const unsubscribe = TradingService.subscribeToDataRefresh(() => {
      if (isAuthenticated && user) {
        loadPositions();
      }
    });
    
    return unsubscribe;
  }, [isAuthenticated, user]);

  const loadPositions = async () => {
    try {
      setIsLoading(true);
      
      // Get positions from mock data
      const mockPositions = positionManager.getPositions();
      
      // Transform data to match component expectations
      const transformedPositions = mockPositions.map(position => ({
        id: position.id,
        name: position.name,
        type: position.type,
        quantity: position.qty,
        avgPrice: position.avg,
        currentPrice: position.price,
        pnl: position.pnl,
        pnlPercent: parseFloat(position.net.replace(/[+%]/g, '')),
        dayChange: position.day,
        product: position.product,
        isLoss: position.isLoss
      }));
      
      setPositions(transformedPositions);
    } catch (error) {
      console.error('Error loading positions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate summary values
  const summary = positions.reduce((acc, position) => {
    acc.invested += position.avgPrice * position.quantity;
    acc.current += position.currentPrice * position.quantity;
    acc.pnl += position.pnl;
    return acc;
  }, { invested: 0, current: 0, pnl: 0 });

  const filteredPositions = positions.filter(position => {
    if (activeTab === 'all') return true;
    return position.type === activeTab;
  });

  const handleExitClick = (position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  // Function to exit a position
  const handleExitPosition = (positionId, quantity) => {
    try {
      // Exit position using position manager
      const success = positionManager.exitPosition(positionId, quantity);
      
      if (success) {
        // Reload positions to reflect the change
        loadPositions();
        
        // Dispatch refresh event for other components
        TradingService.refreshAllData();
      }
      
      setIsModalOpen(false);
      setSelectedPosition(null);
    } catch (error) {
      console.error('Error exiting position:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 sm:px-2 md:px-8 lg:px-28 xl:px-32">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading positions...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-6 sm:px-2 md:px-8 lg:px-28 xl:px-32">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please log in to view your positions</p>
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:px-2 md:px-8 lg:px-28 xl:px-32">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-gray-500 text-sm">Total Invested</p>
          <p className="text-xl font-semibold">₹{summary.invested.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-gray-500 text-sm">Current Value</p>
          <p className="text-xl font-semibold">₹{summary.current.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-gray-500 text-sm">Total P&L</p>
          <div className="flex items-center">
            <p className={`text-xl font-semibold ${summary.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{summary.pnl.toFixed(2)}
            </p>
            {summary.pnl >= 0 ? (
              <TrendingUpIcon className="h-5 w-5 text-green-600 ml-1" />
            ) : (
              <TrendingDownIcon className="h-5 w-5 text-red-600 ml-1" />
            )}
          </div>
          <p className={`text-sm ${summary.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {((summary.pnl / summary.invested) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Filters/Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('all')} 
            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'all' ? 
              'text-blue-600 border-b-2 border-blue-600 font-medium' : 
              'text-gray-500 hover:text-gray-700'}`}
          >
            All Positions
          </button>
          <button 
            onClick={() => setActiveTab('equity')} 
            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'equity' ? 
              'text-blue-600 border-b-2 border-blue-600 font-medium' : 
              'text-gray-500 hover:text-gray-700'}`}
          >
            Equity
          </button>
          <button 
            onClick={() => setActiveTab('fno')} 
            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'fno' ? 
              'text-blue-600 border-b-2 border-blue-600 font-medium' : 
              'text-gray-500 hover:text-gray-700'}`}
          >
            F&O
          </button>
          <button 
            onClick={() => setActiveTab('intraday')} 
            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'intraday' ? 
              'text-blue-600 border-b-2 border-blue-600 font-medium' : 
              'text-gray-500 hover:text-gray-700'}`}
          >
            Intraday
          </button>
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">Open Positions ({filteredPositions.length})</h2>
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <FilterListIcon className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
        
        {/* Table for desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P&L
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPositions.map((position) => (
                <tr key={position.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {position.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {position.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {position.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{position.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{position.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className={position.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                      ₹{position.pnl.toFixed(2)}
                      <br />
                      <span className="text-xs">
                        {position.pnlPercent >= 0 ? "+" : ""}{position.pnlPercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button 
                      onClick={() => handleExitClick(position)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Exit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for mobile */}
        <div className="md:hidden">
          {filteredPositions.map((position) => (
            <div key={position.id} className="px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{position.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{position.type}</p>
                </div>
                <button 
                  onClick={() => handleExitClick(position)}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"
                >
                  Exit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Quantity</p>
                  <p>{position.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-500">Avg. Price</p>
                  <p>₹{position.avgPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Current Price</p>
                  <p>₹{position.currentPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">P&L</p>
                  <p className={position.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                    ₹{position.pnl.toFixed(2)} ({position.pnlPercent >= 0 ? "+" : ""}{position.pnlPercent.toFixed(2)}%)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPositions.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No positions found for the selected filter.
          </div>
        )}
      </div>

      {/* Exit Position Modal */}
      {selectedPosition && (
        <ExitPositionModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          position={selectedPosition}
          handleExit={handleExitPosition}
        />
      )}
    </div>
  );
}
