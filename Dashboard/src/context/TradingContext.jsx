import React, { createContext, useReducer, useEffect } from 'react';
import TradingService from '../services/tradingService.js';

// Initial state
const initialState = {
  // Loading states
  loading: {
    orders: false,
    holdings: false,
    positions: false,
    portfolio: false
  },
  
  // Data
  orders: [],
  recentOrders: [],
  holdings: [],
  positions: [],
  portfolioSummary: {
    totalInvestedValue: 0,
    totalCurrentValue: 0,
    totalPnL: 0,
    totalPnLPercent: 0,
    totalHoldings: 0
  },
  positionStats: {
    totalPositions: 0,
    activePositions: 0,
    totalPnL: 0,
    profitablePositions: 0
  },
  
  // Pagination
  ordersPagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalOrders: 0,
    hasNextPage: false,
    hasPrevPage: false
  },
  
  // Error states
  errors: {
    orders: null,
    holdings: null,
    positions: null,
    portfolio: null
  },
  
  // Last updated timestamps
  lastUpdated: {
    orders: null,
    holdings: null,
    positions: null,
    portfolio: null
  }
};

// Action types
const ActionTypes = {
  // Loading actions
  SET_LOADING: 'SET_LOADING',
  
  // Orders
  SET_ORDERS: 'SET_ORDERS',
  SET_RECENT_ORDERS: 'SET_RECENT_ORDERS',
  ADD_ORDER: 'ADD_ORDER',
  
  // Holdings
  SET_HOLDINGS: 'SET_HOLDINGS',
  UPDATE_HOLDING: 'UPDATE_HOLDING',
  
  // Positions
  SET_POSITIONS: 'SET_POSITIONS',
  UPDATE_POSITION: 'UPDATE_POSITION',
  REMOVE_POSITION: 'REMOVE_POSITION',
  
  // Portfolio
  SET_PORTFOLIO_SUMMARY: 'SET_PORTFOLIO_SUMMARY',
  SET_POSITION_STATS: 'SET_POSITION_STATS',
  
  // Error handling
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // Misc
  REFRESH_ALL: 'REFRESH_ALL',
  UPDATE_PAGINATION: 'UPDATE_PAGINATION'
};

// Reducer function
function tradingReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.isLoading
        }
      };

    case ActionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        ordersPagination: action.payload.pagination || state.ordersPagination,
        lastUpdated: {
          ...state.lastUpdated,
          orders: Date.now()
        },
        errors: {
          ...state.errors,
          orders: null
        }
      };

    case ActionTypes.SET_RECENT_ORDERS:
      return {
        ...state,
        recentOrders: action.payload.orders,
        lastUpdated: {
          ...state.lastUpdated,
          orders: Date.now()
        }
      };

    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload.order, ...state.orders],
        recentOrders: [action.payload.order, ...state.recentOrders.slice(0, 4)] // Keep only 5 recent
      };

    case ActionTypes.SET_HOLDINGS:
      return {
        ...state,
        holdings: action.payload.holdings,
        portfolioSummary: action.payload.summary || state.portfolioSummary,
        lastUpdated: {
          ...state.lastUpdated,
          holdings: Date.now(),
          portfolio: Date.now()
        },
        errors: {
          ...state.errors,
          holdings: null
        }
      };

    case ActionTypes.UPDATE_HOLDING:
      return {
        ...state,
        holdings: state.holdings.map(holding =>
          holding._id === action.payload.id || holding.stock === action.payload.stock
            ? { ...holding, ...action.payload.updates }
            : holding
        )
      };

    case ActionTypes.SET_POSITIONS:
      return {
        ...state,
        positions: action.payload.positions,
        lastUpdated: {
          ...state.lastUpdated,
          positions: Date.now()
        },
        errors: {
          ...state.errors,
          positions: null
        }
      };

    case ActionTypes.UPDATE_POSITION:
      return {
        ...state,
        positions: state.positions.map(position =>
          position._id === action.payload.id
            ? { ...position, ...action.payload.updates }
            : position
        )
      };

    case ActionTypes.REMOVE_POSITION:
      return {
        ...state,
        positions: state.positions.filter(position => position._id !== action.payload.id)
      };

    case ActionTypes.SET_PORTFOLIO_SUMMARY:
      return {
        ...state,
        portfolioSummary: action.payload.summary,
        lastUpdated: {
          ...state.lastUpdated,
          portfolio: Date.now()
        }
      };

    case ActionTypes.SET_POSITION_STATS:
      return {
        ...state,
        positionStats: action.payload.stats,
        lastUpdated: {
          ...state.lastUpdated,
          positions: Date.now()
        }
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.type]: action.payload.error
        }
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.type]: null
        }
      };

    case ActionTypes.UPDATE_PAGINATION:
      return {
        ...state,
        ordersPagination: {
          ...state.ordersPagination,
          ...action.payload
        }
      };

    default:
      return state;
  }
}

// Create contexts
const TradingStateContext = createContext();
const TradingDispatchContext = createContext();

// Export contexts for hooks
export { TradingStateContext, TradingDispatchContext };

// Provider component
export function TradingProvider({ children }) {
  const [state, dispatch] = useReducer(tradingReducer, initialState);

  // Subscribe to data refresh events from TradingService
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        loadOrders(),
        loadRecentOrders(),
        loadHoldings(),
        loadPositions(),
        loadPositionStats()
      ]);
    };

    const unsubscribe = TradingService.subscribeToDataRefresh(() => {
      // Refresh all data when trading service triggers refresh
      loadData();
    });

    // Start periodic price updates for demo
    TradingService.startPriceUpdates();

    return () => {
      unsubscribe();
      // Stop price updates on cleanup
      TradingService.stopPriceUpdates();
    };
  }, []);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        loadOrders(),
        loadRecentOrders(),
        loadHoldings(),
        loadPositions(),
        loadPositionStats()
      ]);
    };

    loadInitialData();
  }, []);

  // Orders operations
  const loadOrders = async (page = 1, limit = 10) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: { type: 'orders', isLoading: true } });
    
    try {
      const result = await TradingService.getUserOrders(page, limit);
      if (result.success) {
        dispatch({
          type: ActionTypes.SET_ORDERS,
          payload: {
            orders: result.orders,
            pagination: result.pagination
          }
        });
      } else {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: { type: 'orders', error: result.error }
        });
      }
    } catch {
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: { type: 'orders', error: 'Failed to load orders' }
      });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: { type: 'orders', isLoading: false } });
    }
  };

  const loadRecentOrders = async () => {
    try {
      const result = await TradingService.getRecentOrders();
      if (result.success) {
        dispatch({
          type: ActionTypes.SET_RECENT_ORDERS,
          payload: { orders: result.orders }
        });
      }
    } catch {
      console.error('Failed to load recent orders');
    }
  };

  const createOrder = async (orderData) => {
    try {
      console.log('TradingContext: Creating order...', orderData);
      const result = await TradingService.createOrder(orderData);
      
      console.log('TradingContext: Order creation result:', result);
      
      if (result.success && result.order) {
        dispatch({
          type: ActionTypes.ADD_ORDER,
          payload: { order: result.order }
        });
        console.log('TradingContext: Order added to state, triggering refresh...');
        // Data will auto-refresh via event subscription
      } else if (!result.success) {
        console.error('TradingContext: Order creation failed:', result.error);
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: { type: 'orders', error: result.error }
        });
      }
      
      return result;
    } catch (error) {
      console.error('TradingContext: Exception during order creation:', error);
      const errorResult = {
        success: false,
        error: 'Failed to create order: ' + (error.message || 'Unknown error')
      };
      
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: { type: 'orders', error: errorResult.error }
      });
      
      return errorResult;
    }
  };

  // Holdings operations
  const loadHoldings = async () => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: { type: 'holdings', isLoading: true } });
    
    try {
      const result = await TradingService.getHoldings();
      if (result.success) {
        dispatch({
          type: ActionTypes.SET_HOLDINGS,
          payload: {
            holdings: result.holdings,
            summary: result.summary
          }
        });
      } else {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: { type: 'holdings', error: result.error }
        });
      }
    } catch {
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: { type: 'holdings', error: 'Failed to load holdings' }
      });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: { type: 'holdings', isLoading: false } });
    }
  };

  const loadPortfolioSummary = async () => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: { type: 'portfolio', isLoading: true } });
    
    try {
      const result = await TradingService.getPortfolioSummary();
      if (result.success) {
        dispatch({
          type: ActionTypes.SET_PORTFOLIO_SUMMARY,
          payload: { summary: result.summary }
        });
      } else {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: { type: 'portfolio', error: result.error }
        });
      }
    } catch {
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: { type: 'portfolio', error: 'Failed to load portfolio summary' }
      });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: { type: 'portfolio', isLoading: false } });
    }
  };

  // Positions operations
  const loadPositions = async () => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: { type: 'positions', isLoading: true } });
    
    try {
      const result = await TradingService.getPositions();
      if (result.success) {
        dispatch({
          type: ActionTypes.SET_POSITIONS,
          payload: { positions: result.positions }
        });
      } else {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: { type: 'positions', error: result.error }
        });
      }
    } catch {
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: { type: 'positions', error: 'Failed to load positions' }
      });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: { type: 'positions', isLoading: false } });
    }
  };

  const loadPositionStats = async () => {
    try {
      const result = await TradingService.getPositionStats();
      if (result.success) {
        dispatch({
          type: ActionTypes.SET_POSITION_STATS,
          payload: { stats: result.stats }
        });
      }
    } catch {
      console.error('Failed to load position stats');
    }
  };

  const exitPosition = async (positionId, exitData) => {
    try {
      const result = await TradingService.exitPosition(positionId, exitData);
      if (result.success) {
        // Remove or update position based on whether it's fully closed
        if (result.position && result.position.status === 'closed') {
          dispatch({
            type: ActionTypes.REMOVE_POSITION,
            payload: { id: positionId }
          });
        } else if (result.position) {
          dispatch({
            type: ActionTypes.UPDATE_POSITION,
            payload: {
              id: positionId,
              updates: result.position
            }
          });
        }
        // Data will auto-refresh via event subscription
      }
      return result;
    } catch {
      return {
        success: false,
        error: 'Failed to exit position'
      };
    }
  };

  // Price update operations
  const updateStockPrices = async (priceUpdates) => {
    try {
      await Promise.all([
        TradingService.updateHoldingPrices(priceUpdates),
        TradingService.updatePositionPrices(priceUpdates)
      ]);
      
      // Refresh holdings and positions to get updated calculations
      await Promise.all([
        loadHoldings(),
        loadPositions()
      ]);
    } catch {
      console.error('Failed to update stock prices');
    }
  };

  // Refresh all data function
  const refreshAllData = async () => {
    await Promise.all([
      loadOrders(),
      loadRecentOrders(),
      loadHoldings(),
      loadPositions(),
      loadPositionStats()
    ]);
  };

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    loadOrders,
    createOrder,
    loadHoldings,
    loadPortfolioSummary,
    loadPositions,
    exitPosition,
    updateStockPrices,
    refreshAllData
  };

  return (
    <TradingStateContext.Provider value={value}>
      <TradingDispatchContext.Provider value={dispatch}>
        {children}
      </TradingDispatchContext.Provider>
    </TradingStateContext.Provider>
  );
}