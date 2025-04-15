import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <Link to="/orders" className="flex flex-col items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-green-700">Buy</span>
        </Link>
        
        <Link to="/orders" className="flex flex-col items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-red-700">Sell</span>
        </Link>
        
        <Link to="/account" className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-blue-700">Add Funds</span>
        </Link>
        
        <Link to="/account" className="flex flex-col items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-purple-700">Withdraw</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
