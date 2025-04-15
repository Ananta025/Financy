import React from 'react';
import { Link } from 'react-router-dom';

const RecentOrdersPreview = () => {
  // Sample recent orders
  const recentOrders = [
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
    }
  ];

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

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        <Link to="/orders" className="text-sm text-blue-600 hover:underline">View All Orders</Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty × Price
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.stock}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.type === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {order.type}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {order.quantity} × ₹{order.price}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {formatTime(order.time)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
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
          <p className="text-gray-500">No recent orders</p>
        </div>
      )}
    </div>
  );
};

export default RecentOrdersPreview;
