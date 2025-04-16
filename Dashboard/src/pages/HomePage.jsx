import React, { useState} from 'react';

// Components
import MarketOverview from '../components/home/MarketOverview';
import PortfolioSummary from '../components/home/PortfolioSummary';
import HoldingsPreview from '../components/home/HoldingsPreview';
import PositionsPreview from '../components/home/PositionsPreview';
import RecentOrdersPreview from '../components/home/RecentOrdersPreview';
import Watchlist from '../components/home/Watchlist';
import QuickActions from '../components/home/QuickActions';
import NewsFeed from '../components/home/NewsFeed';
// Import ChatbotWidget
import { ChatbotWidget } from '../components/common';

export default function HomePage() {
  const [userData, setUserData] = useState({
    name: 'Ananta',
    profileImg: '/images/Avatar.png',
    lastLogin: '2023-06-19T08:30:00'
  });

  // Format the date to a readable string
  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Check if market is open (9:30 AM to 3:30 PM)
  const isMarketOpen = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    const marketOpenTime = 9 * 60 + 30; // 9:30 AM
    const marketCloseTime = 15 * 60 + 30; // 3:30 PM
    
    return currentTime >= marketOpenTime && currentTime <= marketCloseTime;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header with greeting and user info */}
      <div className="bg-white mx-2 my-2">
        <div className="container mx-auto px-4 py-4 sm:px-6 md:px-8 lg:px-22 xl:px-26">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Hello, {userData.name}!</h1>
              <p className="text-gray-500 text-sm mt-1">Last login: {formatDate(userData.lastLogin)}</p>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <div className="ml-4 hidden md:block">
                <div className="flex items-center space-x-2">
                  {isMarketOpen() ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md font-medium">
                      Market Open
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md font-medium">
                      Market Closed
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 sm:px-6 md:px-8 lg:px-22 xl:px-26">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Summary */}
            <PortfolioSummary />
            
            {/* Market Overview */}
            <MarketOverview />

            {/* Holdings + Positions (side by side on larger screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Holdings Preview */}
              <HoldingsPreview />
              
              {/* Positions Preview */}
              <PositionsPreview />
            </div>
            
            {/* Recent Orders */}
            <RecentOrdersPreview />
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            {/* Quick Action Cards */}
            <QuickActions />
            
            {/* Watchlist */}
            <Watchlist />
            
            {/* News Feed */}
            <NewsFeed />
          </div>
        </div>
      </div>
      
      {/* Add ChatbotWidget */}
      <ChatbotWidget />
    </div>
  );
}
