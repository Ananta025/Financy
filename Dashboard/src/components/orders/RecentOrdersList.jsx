import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/tradingHooks.js';
import { useAuth } from '../../context/AuthContext';
import { positionManager } from '../../Data/Data';
import { TradingService } from '../../services/tradingService';

const RecentOrdersList = ({ refreshTrigger }) => {
  const { recentOrders: rawOrders, loading, errors, refreshAllData } = useTrading();
  const { isAuthenticated } = useAuth();
  const [localOrders, setLocalOrders] = useState([]);
  
  const isLoading = loading?.orders || false;
  const error = errors?.orders;

  // Load orders from local mock data
  useEffect(() => {
    loadLocalOrders();
    
    // Subscribe to data refresh events
    const unsubscribe = TradingService.subscribeToDataRefresh(() => {
      loadLocalOrders();
    });
    
    return unsubscribe;
  }, [refreshTrigger]);

  const loadLocalOrders = () => {
    try {
      const orders = positionManager.getRecentOrders(10);
      setLocalOrders(orders);
    } catch (error) {
      console.error('Error loading local orders:', error);
    }
  };

  // Use local orders as primary data source, fall back to server orders
  const recentOrders = localOrders.length > 0 
    ? localOrders.map(order => ({
        id: order.id,
        stock: order.stock,
        type: order.type,
        quantity: order.quantity,
        price: order.price,
        orderType: order.orderType === 'market' ? 'Market' : 
                   order.orderType === 'limit' ? 'Limit' : 'Stop Loss',
        status: order.status || 'Executed',
        time: order.timestamp || order.time
      }))
    : (rawOrders || []).map(order => ({
        id: order._id || order.id,
        stock: order.stock,
        type: order.type,
        quantity: order.quantity,
        price: order.price,
        orderType: order.orderType === 'market' ? 'Market' : 
                   order.orderType === 'limit' ? 'Limit' : 'Stop Loss',
        status: order.status || 'Pending',
        time: order.createdAt || order.time
      }));

  // Function to manually refresh data
  const handleRefresh = () => {
    loadLocalOrders();
    if (refreshAllData) {
      refreshAllData();
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-medium text-gray-700 mb-4">Recent Orders</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
          <button 
            onClick={handleRefresh}
            className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
          >
            Try again
          </button>
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {!isLoading && !error && !isAuthenticated && (
        <div className="text-center py-8">
          <p className="text-gray-500">Please log in to view your recent orders</p>
        </div>
      )}
      
      {!isLoading && !error && isAuthenticated && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          order.type === 'Buy' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {order.type === 'Buy' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{order.stock}</div>
                          <div className="text-xs text-gray-500">{order.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.quantity} × ₹{order.price}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.orderType} • {formatDate(order.time)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {recentOrders.length === 0 && (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500">Start trading to see your recent orders here</p>
            </div>
          )}
          
          <div className="mt-4">
            <button 
              onClick={handleRefresh}
              className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none border border-blue-200 rounded-md hover:bg-blue-50"
            >
              Refresh Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentOrdersList;
