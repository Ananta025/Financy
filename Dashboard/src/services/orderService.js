import axios from 'axios';

const API_BASE_URL = 'https://financy-6bzf.onrender.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const orderService = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders/create', orderData);
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to create order',
        errors: error.response?.data?.errors || [],
        status: error.response?.status || 500
      };
    }
  },

  // Get user's recent orders
  getUserOrders: async (page = 1, limit = 10) => {
    try {
      const response = await apiClient.get('/orders', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch orders',
        status: error.response?.status || 500
      };
    }
  },

  // Get a specific order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch order',
        status: error.response?.status || 500
      };
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to update order status',
        status: error.response?.status || 500
      };
    }
  },

  // Get order statistics
  getOrderStats: async () => {
    try {
      const response = await apiClient.get('/orders/stats');
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch order statistics',
        status: error.response?.status || 500
      };
    }
  }
};

export default orderService;