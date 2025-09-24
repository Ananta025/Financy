import React, { useState, useEffect } from 'react'
import { Tooltip, Grow } from "@mui/material";
import { watchlist } from '../Data/Data';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import TradeModal from '../components/TradeModel';
import { DoughnoutChart } from '../components/DoughnoutChart';
import StockInfoPanel from '../components/orders/StockInfoPanel';
import OrderForm from '../components/orders/OrderForm';
import RecentOrdersList from '../components/orders/RecentOrdersList';
import SearchBar from '../components/orders/SearchBar';

export default function OrdersPage() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [filteredWatchlist, setFilteredWatchlist] = useState(watchlist);
  const [searchQuery, setSearchQuery] = useState('');
  const [openTradeModal, setOpenTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState('Buy');
  const [orderPreview, setOrderPreview] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Function to handle successful order creation
  const handleOrderSuccess = (newOrder) => {
    console.log('Order created successfully:', newOrder);
    // Trigger refresh of recent orders list
    setRefreshTrigger(prev => prev + 1);
  };
  
  // Simulated live price update
  useEffect(() => {
    if (selectedStock) {
      const interval = setInterval(() => {
        const priceChange = (Math.random() * 2 - 1) * 0.5; // Random price change between -0.5 and 0.5
        setSelectedStock(prev => ({
          ...prev,
          price: parseFloat((prev.price + priceChange).toFixed(2)),
          percent: parseFloat((parseFloat(prev.percent) + priceChange / 10).toFixed(2)),
          isDown: priceChange < 0
        }));
      }, 5000); // Update every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [selectedStock]);
  
  // Chart data setup
  const labels = watchlist.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      }
    ]
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredWatchlist(
      watchlist.filter(stock => 
        stock.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  
  const handleSelectStock = (stock) => {
    setSelectedStock(stock);
  };
  
  const handleTradeTypeChange = (type) => {
    setTradeType(type);
  };
  
  const handleOpenTradeModal = (orderData) => {
    setOrderPreview(orderData);
    setOpenTradeModal(true);
  };
  
  const handleTradeModalClose = () => {
    setOpenTradeModal(false);
    setOrderPreview(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 md:px-8 lg:px-22 xl:px-26">
      <h1 className="text-2xl font-semibold mb-6">Stock Trading</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Watchlist and Search */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <SearchBar onSearch={handleSearch} watchlistCount={filteredWatchlist.length} />
            
            <div className="mt-4">
              <h2 className="font-medium text-gray-700 mb-2">Watchlist</h2>
              <ul className="divide-y divide-gray-200">
                {filteredWatchlist.map((stock, index) => (
                  <WatchListItem 
                    key={index} 
                    stock={stock} 
                    onSelect={() => handleSelectStock(stock)}
                    isSelected={selectedStock && selectedStock.name === stock.name}
                  />
                ))}
                {filteredWatchlist.length === 0 && (
                  <li className="py-3 text-gray-500 text-center">No stocks found</li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 h-64">
            <h2 className="font-medium text-gray-700 mb-2">Portfolio Allocation</h2>
            <div className="h-52">
              <DoughnoutChart data={data} />
            </div>
          </div>
        </div>
        
        {/* Center Column - Selected Stock Info and Order Form */}
        <div className="lg:col-span-1">
          {selectedStock ? (
            <>
              <StockInfoPanel stock={selectedStock} />
              <OrderForm 
                stock={selectedStock}
                tradeType={tradeType}
                onTradeTypeChange={handleTradeTypeChange}
                onSubmit={handleOpenTradeModal}
              />
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h3 className="mt-4 text-lg font-medium">No stock selected</h3>
              <p className="mt-1 text-gray-500">Select a stock from your watchlist to start trading</p>
            </div>
          )}
        </div>
        
        {/* Right Column - Recent Orders */}
        <div className="lg:col-span-1">
          <RecentOrdersList refreshTrigger={refreshTrigger} />
        </div>
      </div>
      
      {/* Trade Confirmation Modal */}
      {selectedStock && (
        <TradeModal 
          open={openTradeModal} 
          handleClose={handleTradeModalClose} 
          tradeType={tradeType} 
          stockName={selectedStock.name}
          stockPrice={selectedStock.price}
          orderDetails={orderPreview}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
    </div>
  );
}

const WatchListItem = ({ stock, onSelect, isSelected }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchListActions(true);
  };
  
  const handleMouseLeave = () => {
    setShowWatchListActions(false);
  };

  return (
    <li 
      className={`py-3 cursor-pointer hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium">{stock.name}</p>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${stock.isDown ? 'text-red-500' : 'text-green-500'}`}>
            {stock.percent}%
          </span>
          {stock.isDown ? (
            <KeyboardArrowDownIcon className="text-red-500" fontSize="small" />
          ) : (
            <KeyboardArrowUpIcon className="text-green-500" fontSize="small" />
          )}
          <span className="font-medium">₹{stock.price}</span>
        </div>
      </div>
      
      {showWatchListActions && (
        <div className="mt-2 flex justify-end space-x-1">
          <Tooltip title="Buy (B)" placement='top' arrow TransitionComponent={Grow}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            >
              Buy
            </button>
          </Tooltip>
          <Tooltip title="Sell (S)" placement='top' arrow TransitionComponent={Grow}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Sell
            </button>
          </Tooltip>
          <Tooltip title="Analytics (A)" placement='top' arrow TransitionComponent={Grow}>
            <button className="p-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
              <BarChartIcon fontSize="small" />
            </button>
          </Tooltip>
          <Tooltip title="More" placement='top' arrow TransitionComponent={Grow}>
            <button className="p-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              <MoreHoriz fontSize="small" />
            </button>
          </Tooltip>
        </div>
      )}
    </li>
  );
};