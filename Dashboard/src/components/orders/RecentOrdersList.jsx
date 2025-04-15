import React, { useState } from 'react';

const RecentOrdersList = () => {
  // Simulated recent orders data
  const [recentOrders] = useState([
    {
      id: '3245',
      stock: 'AAPL',
      type: 'Buy',
      quantity: 5,
      price: 182.34,
      orderType: 'Market',
      status: 'Completed',
      time: '2023-06-15T14:32:00'
    },
    {
      id: '3244',
      stock: 'GOOGL',
      type: 'Buy',
      quantity: 2,
      price: 124.18,
      orderType: 'Limit',
      status: 'Completed',
      time: '2023-06-15T13:10:00'
    },
    {
      id: '3243',
      stock: 'TSLA',
      type: 'Sell',
      quantity: 3,
      price: 246.79,
      orderType: 'Market',
      status: 'Completed',
      time: '2023-06-15T11:45:00'
    },
    {
      id: '3242',
      stock: 'MSFT',
      type: 'Buy',
      quantity: 10,
      price: 334.22,
      orderType: 'Limit',
      status: 'Pending',
      time: '2023-06-15T10:20:00'
    },
    {
      id: '3241',
      stock: 'AMZN',
      type: 'Sell',
      quantity: 4,
      price: 127.90,
      orderType: 'Stop Loss',
      status: 'Cancelled',
      time: '2023-06-14T15:55:00'
    }
  ]);

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
        <div className="text-center py-4">
          <p className="text-gray-500">No recent orders</p>
        </div>
      )}
      
      <div className="mt-4">
        <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none">
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default RecentOrdersList;
