import React, { useState } from 'react';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import ExitPositionModal from '../components/position/ExitPositionModal';

export default function PositionPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  // Sample data - in a real app this would come from an API
  const [positions, setPositions] = useState([
    { id: 1, name: 'Reliance Industries', type: 'equity', quantity: 10, avgPrice: 2500.50, currentPrice: 2650.75, pnl: 1502.50 },
    { id: 2, name: 'HDFC Bank', type: 'equity', quantity: 15, avgPrice: 1450.25, currentPrice: 1425.50, pnl: -371.25 },
    { id: 3, name: 'TCS', type: 'equity', quantity: 5, avgPrice: 3200.00, currentPrice: 3350.25, pnl: 751.25 },
    { id: 4, name: 'Nifty 50 Jun 21500 CE', type: 'fno', quantity: 25, avgPrice: 150.75, currentPrice: 185.50, pnl: 868.75 },
    { id: 5, name: 'Infosys', type: 'intraday', quantity: 20, avgPrice: 1350.25, currentPrice: 1375.50, pnl: 505.00 },
    { id: 6, name: 'SBI', type: 'intraday', quantity: 30, avgPrice: 550.75, currentPrice: 545.25, pnl: -165.00 },
    { id: 7, name: 'Bajaj Finance', type: 'equity', quantity: 8, avgPrice: 5800.00, currentPrice: 6050.50, pnl: 2004.00 },
    { id: 8, name: 'Bank Nifty Jun 46000 PE', type: 'fno', quantity: 15, avgPrice: 200.50, currentPrice: 175.25, pnl: -378.75 }
  ]);

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

  // Function to simulate closing a position
  const handleExitPosition = (id, quantity) => {
    setPositions(prevPositions => 
      prevPositions.filter(position => position.id !== id)
    );
    setIsModalOpen(false);
  };

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
                        {(((position.currentPrice - position.avgPrice) / position.avgPrice) * 100).toFixed(2)}%
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
                    ₹{position.pnl.toFixed(2)} ({(((position.currentPrice - position.avgPrice) / position.avgPrice) * 100).toFixed(2)}%)
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
