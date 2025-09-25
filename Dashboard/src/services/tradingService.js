import axios from 'axios';
import { handleAuthFailure } from '../utils/authRedirect';

const API_BASE_URL = 'https://financy-6bzf.onrender.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      handleAuthFailure('Token expired or invalid (from tradingService)');
    }
    return Promise.reject(error);
  }
);

/**
 * Centralized Trading Service
 * Manages all trading-related operations including orders, holdings, and positions
 */
export class TradingService {
  
  // ========== ORDER OPERATIONS ==========
  
  /**
   * Create a new order (buy/sell)
   */
  static async createOrder(orderData) {
    try {
      console.log('=== FRONTEND ORDER CREATION DEBUG ===');
      console.log('Raw order data received:', orderData);
      
      // Validate and sanitize the payload
      const sanitizedPayload = {
        stock: String(orderData.stock || '').trim(),
        type: String(orderData.type || '').trim(),
        quantity: parseInt(orderData.quantity) || 0,
        price: parseFloat(orderData.price) || 0,
        orderType: String(orderData.orderType || 'market').trim(),
        limitPrice: orderData.limitPrice ? parseFloat(orderData.limitPrice) : undefined,
        triggerPrice: orderData.triggerPrice ? parseFloat(orderData.triggerPrice) : undefined,
        total: parseFloat(orderData.total) || 0
      };
      
      // Auto-calculate total if not provided or validate existing total
      const calculatedTotal = parseFloat((sanitizedPayload.quantity * sanitizedPayload.price).toFixed(2));
      if (!sanitizedPayload.total || Math.abs(sanitizedPayload.total - calculatedTotal) > 0.02) {
        sanitizedPayload.total = calculatedTotal;
        console.log('Auto-calculated total:', calculatedTotal);
      }
      
      console.log('Sanitized payload:', sanitizedPayload);
      console.log('Payload types:', Object.keys(sanitizedPayload).reduce((acc, key) => {
        acc[key] = typeof sanitizedPayload[key];
        return acc;
      }, {}));
      
      // Validate required fields
      const validation = this.validateOrderData(sanitizedPayload);
      if (!validation.isValid) {
        console.error('Frontend validation failed:', validation.errors);
        return {
          success: false,
          error: validation.errors.join(', '),
          details: { validationErrors: validation.errors }
        };
      }
      
      console.log('Sending to backend:', sanitizedPayload);
      
      const response = await api.post('/orders/create', sanitizedPayload);
      
      console.log('Backend response status:', response.status);
      console.log('Backend response data:', response.data);
      
      // Check if backend response indicates success
      if (response.data && response.data.success) {
        console.log('Order successful, refreshing data...');
        try {
          await this.refreshAllData();
          console.log('Data refresh completed');
        } catch (refreshError) {
          console.warn('Data refresh failed, but order was successful:', refreshError);
        }
        
        return {
          success: true,
          data: response.data,
          order: response.data.order,
          message: response.data.message || 'Order created successfully'
        };
      } else {
        // Backend returned success status but data.success is false
        console.error('Backend returned non-success data:', response.data);
        return {
          success: false,
          error: response.data.message || response.data.error || 'Order creation failed',
          details: response.data
        };
      }
    } catch (error) {
      console.error('Order creation error:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error response data:', error.response?.data);
      
      let errorMessage = 'Failed to create order';
      let errorDetails = {};
      
      if (error.response?.data) {
        errorMessage = error.response.data.message || error.response.data.error || errorMessage;
        errorDetails = error.response.data;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage,
        details: errorDetails
      };
    }
  }

  /**
   * Get user orders with pagination
   */
  static async getUserOrders(page = 1, limit = 10) {
    try {
      const response = await api.get(`/orders?page=${page}&limit=${limit}`);
      return {
        success: true,
        orders: response.data.orders,
        pagination: response.data.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch orders',
        orders: []
      };
    }
  }

  /**
   * Get recent orders (last 5)
   */
  static async getRecentOrders() {
    try {
      const response = await api.get('/orders?limit=5');
      return {
        success: true,
        orders: response.data.orders
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch recent orders',
        orders: []
      };
    }
  }

  // ========== HOLDINGS OPERATIONS ==========

  /**
   * Get user holdings
   */
  static async getHoldings() {
    try {
      const response = await api.get('/holdings');
      return {
        success: true,
        holdings: response.data.holdings,
        summary: response.data.portfolioSummary // Backend returns 'portfolioSummary'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch holdings',
        holdings: []
      };
    }
  }

  /**
   * Get portfolio summary
   */
  static async getPortfolioSummary() {
    try {
      const response = await api.get('/holdings/stats'); // Use correct endpoint
      return {
        success: true,
        summary: response.data.stats // Backend returns 'stats'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch portfolio summary',
        summary: {
          totalInvestedValue: 0,
          totalCurrentValue: 0,
          totalPnL: 0,
          totalPnLPercent: 0,
          totalHoldings: 0
        }
      };
    }
  }

  /**
   * Update stock prices for holdings
   */
  static async updateHoldingPrices(priceUpdates) {
    try {
      const response = await api.put('/holdings/prices', { priceUpdates });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update holding prices'
      };
    }
  }

  // ========== POSITIONS OPERATIONS ==========

  /**
   * Get user positions
   */
  static async getPositions() {
    try {
      const response = await api.get('/positions');
      return {
        success: true,
        positions: response.data.positions
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch positions',
        positions: []
      };
    }
  }

  /**
   * Get positions statistics
   */
  static async getPositionStats() {
    try {
      const response = await api.get('/positions/stats');
      return {
        success: true,
        stats: response.data.stats
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch position stats',
        stats: {
          totalPositions: 0,
          activePositions: 0,
          totalPnL: 0,
          profitablePositions: 0
        }
      };
    }
  }

  /**
   * Exit a position (full or partial)
   */
  static async exitPosition(positionId, exitData) {
    try {
      const response = await api.post(`/positions/${positionId}/exit`, exitData);
      
      // Trigger data refresh after successful exit
      if (response.data.success) {
        await this.refreshAllData();
      }
      
      return {
        success: true,
        data: response.data,
        position: response.data.position
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to exit position',
        details: error.response?.data
      };
    }
  }

  /**
   * Update position prices
   */
  static async updatePositionPrices(priceUpdates) {
    try {
      const response = await api.put('/positions/prices', { priceUpdates });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update position prices'
      };
    }
  }

  // ========== MARKET DATA ==========

  /**
   * Get stock quote (mock for now - replace with real market data API)
   */
  static async getStockQuote(symbol) {
    try {
      // TODO: Replace with real market data API (Alpha Vantage, Yahoo Finance, etc.)
      // For now, return mock data
      const mockPrice = Math.random() * 1000 + 100; // Random price between 100-1100
      const mockChange = (Math.random() - 0.5) * 20; // Random change between -10 to +10
      
      return {
        success: true,
        quote: {
          symbol: symbol,
          price: parseFloat(mockPrice.toFixed(2)),
          change: parseFloat(mockChange.toFixed(2)),
          changePercent: parseFloat(((mockChange / mockPrice) * 100).toFixed(2)),
          timestamp: new Date().toISOString()
        }
      };
    } catch (err) {
      console.error('Error fetching stock quote:', err);
      return {
        success: false,
        error: 'Failed to fetch stock quote',
        quote: null
      };
    }
  }

  /**
   * Get multiple stock quotes
   */
  static async getMultipleStockQuotes(symbols) {
    try {
      const promises = symbols.map(symbol => this.getStockQuote(symbol));
      const results = await Promise.allSettled(promises);
      
      const quotes = {};
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success) {
          quotes[symbols[index]] = result.value.quote;
        }
      });
      
      return {
        success: true,
        quotes
      };
    } catch (err) {
      console.error('Error fetching multiple stock quotes:', err);
      return {
        success: false,
        error: 'Failed to fetch multiple stock quotes',
        quotes: {}
      };
    }
  }

  // ========== DATA REFRESH OPERATIONS ==========

  /**
   * Refresh all trading data (orders, holdings, positions)
   * This ensures all components have the latest data after transactions
   */
  static async refreshAllData() {
    try {
      // Trigger custom events that components can listen to
      const refreshEvent = new CustomEvent('tradingDataRefresh', {
        detail: {
          timestamp: Date.now(),
          source: 'tradingService'
        }
      });
      
      window.dispatchEvent(refreshEvent);
      
      return { success: true };
    } catch (err) {
      console.error('Error refreshing trading data:', err);
      return { success: false, error: 'Failed to refresh trading data' };
    }
  }

  /**
   * Subscribe to data refresh events
   */
  static subscribeToDataRefresh(callback) {
    const handler = (event) => {
      callback(event.detail);
    };
    
    window.addEventListener('tradingDataRefresh', handler);
    
    // Return unsubscribe function
    return () => {
      window.removeEventListener('tradingDataRefresh', handler);
    };
  }

  // ========== UTILITY METHODS ==========

  /**
   * Calculate portfolio metrics
   */
  static calculatePortfolioMetrics(holdings) {
    if (!holdings || holdings.length === 0) {
      return {
        totalInvestment: 0,
        currentValue: 0,
        totalPnL: 0,
        totalPnLPercent: 0,
        dayChange: 0,
        dayChangePercent: 0
      };
    }

    const totalInvestment = holdings.reduce((sum, holding) => 
      sum + (holding.averagePrice * holding.quantity), 0);
    
    const currentValue = holdings.reduce((sum, holding) => 
      sum + (holding.currentPrice * holding.quantity), 0);
    
    const totalPnL = currentValue - totalInvestment;
    const totalPnLPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
    
    // Calculate day change (this would need previous day's closing prices)
    const dayChange = holdings.reduce((sum, holding) => {
      const dayPnL = holding.dayChange ? parseFloat(holding.dayChange.replace('%', '')) : 0;
      return sum + ((dayPnL / 100) * holding.currentPrice * holding.quantity);
    }, 0);
    
    const dayChangePercent = currentValue > 0 ? (dayChange / currentValue) * 100 : 0;

    return {
      totalInvestment: parseFloat(totalInvestment.toFixed(2)),
      currentValue: parseFloat(currentValue.toFixed(2)),
      totalPnL: parseFloat(totalPnL.toFixed(2)),
      totalPnLPercent: parseFloat(totalPnLPercent.toFixed(2)),
      dayChange: parseFloat(dayChange.toFixed(2)),
      dayChangePercent: parseFloat(dayChangePercent.toFixed(2))
    };
  }

  /**
   * Format currency values
   */
  static formatCurrency(value, currency = '₹') {
    if (typeof value !== 'number') {
      value = parseFloat(value) || 0;
    }
    
    return `${currency}${value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  /**
   * Format percentage values
   */
  static formatPercentage(value) {
    if (typeof value !== 'number') {
      value = parseFloat(value) || 0;
    }
    
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  }

  /**
   * Validate order data before submission
   */
  static validateOrderData(orderData) {
    const errors = [];
    
    if (!orderData.stock || orderData.stock.trim().length === 0) {
      errors.push('Stock symbol is required');
    }
    
    if (!orderData.type || !['Buy', 'Sell'].includes(orderData.type)) {
      errors.push('Order type must be Buy or Sell');
    }
    
    if (!orderData.quantity || orderData.quantity <= 0) {
      errors.push('Quantity must be a positive number');
    }
    
    if (!orderData.price || orderData.price <= 0) {
      errors.push('Price must be a positive number');
    }
    
    if (!orderData.total || orderData.total <= 0) {
      errors.push('Total amount must be a positive number');
    }
    
    // Validate that total = quantity * price (with some tolerance for rounding)
    const expectedTotal = parseFloat((orderData.quantity * orderData.price).toFixed(2));
    const actualTotal = parseFloat(orderData.total.toFixed(2));
    const tolerance = 0.02; // Increased tolerance for floating point precision
    if (Math.abs(actualTotal - expectedTotal) > tolerance) {
      console.warn(`Total validation: Expected: ${expectedTotal}, Got: ${actualTotal}, Diff: ${Math.abs(actualTotal - expectedTotal)}`);
      errors.push(`Total amount does not match quantity × price (Expected: ${expectedTotal}, Got: ${actualTotal})`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Export default for convenience
export default TradingService;