export const watchlist = [
    {
      name: "INFY",
      price: 1555.45,
      percent: "-1.60%",
      isDown: true,
    },
    {
      name: "ONGC",
      price: 116.8,
      percent: "-0.09%",
      isDown: true,
    },
    {
      name: "TCS",
      price: 3194.8,
      percent: "-0.25%",
      isDown: true,
    },
    {
      name: "KPITTECH",
      price: 266.45,
      percent: "3.54%",
      isDown: false,
    },
    {
      name: "QUICKHEAL",
      price: 308.55,
      percent: "-0.15%",
      isDown: true,
    },
    {
      name: "WIPRO",
      price: 577.75,
      percent: "0.32%",
      isDown: false,
    },
    {
      name: "M&M",
      price: 779.8,
      percent: "-0.01%",
      isDown: true,
    },
    {
      name: "RELIANCE",
      price: 2112.4,
      percent: "1.44%",
      isDown: false,
    },
    {
      name: "HUL",
      price: 512.4,
      percent: "1.04%",
      isDown: false,
    },
  ];
  
  // holdings
  export const holdings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+10.04%",
      day: "+0.11%",
    },
    {
      name: "HINDUNILVR",
      qty: 1,
      avg: 2335.85,
      price: 2417.4,
      net: "+3.49%",
      day: "+0.21%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "+15.18%",
      day: "-1.60%",
      isLoss: true,
    },
    {
      name: "ITC",
      qty: 5,
      avg: 202.0,
      price: 207.9,
      net: "+2.92%",
      day: "+0.80%",
    },
    {
      name: "KPITTECH",
      qty: 5,
      avg: 250.3,
      price: 266.45,
      net: "+6.45%",
      day: "+3.54%",
    },
    {
      name: "M&M",
      qty: 2,
      avg: 809.9,
      price: 779.8,
      net: "-3.72%",
      day: "-0.01%",
      isLoss: true,
    },
    {
      name: "RELIANCE",
      qty: 1,
      avg: 2193.7,
      price: 2112.4,
      net: "-3.71%",
      day: "+1.44%",
    },
    {
      name: "SBIN",
      qty: 4,
      avg: 324.35,
      price: 430.2,
      net: "+32.63%",
      day: "-0.34%",
      isLoss: true,
    },
    {
      name: "SGBMAY29",
      qty: 2,
      avg: 4727.0,
      price: 4719.0,
      net: "-0.17%",
      day: "+0.15%",
    },
    {
      name: "TATAPOWER",
      qty: 5,
      avg: 104.2,
      price: 124.15,
      net: "+19.15%",
      day: "-0.24%",
      isLoss: true,
    },
    {
      name: "TCS",
      qty: 1,
      avg: 3041.7,
      price: 3194.8,
      net: "+5.03%",
      day: "-0.25%",
      isLoss: true,
    },
    {
      name: "WIPRO",
      qty: 4,
      avg: 489.3,
      price: 577.75,
      net: "+18.08%",
      day: "+0.32%",
    },
  ];
  
  // User-specific data management
  const USER_DATA_KEY = 'financy_user_data';

  // Initialize user data structure
  const initializeUserData = (userId) => {
    return {
      positions: [],
      orders: [],
      lastUpdated: new Date().toISOString()
    };
  };

  // Get current user ID from localStorage or context
  const getCurrentUserId = () => {
    return localStorage.getItem('userId') || 'anonymous';
  };

  // Get user-specific data from localStorage
  const getUserData = (userId) => {
    try {
      const allUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || '{}');
      if (!allUserData[userId]) {
        // Initialize empty data for new user
        allUserData[userId] = initializeUserData(userId);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(allUserData));
      }
      return allUserData[userId];
    } catch (error) {
      console.error('Error loading user data:', error);
      return initializeUserData(userId);
    }
  };

  // Save user-specific data to localStorage
  const saveUserData = (userId, userData) => {
    try {
      const allUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || '{}');
      allUserData[userId] = {
        ...userData,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(allUserData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // positions - now user-specific and starts empty for new users
  export let positions = [];

  // orders - now user-specific and starts empty for new users  
  export let orders = [];

  // Load user-specific data on initialization
  const loadUserSpecificData = () => {
    const userId = getCurrentUserId();
    const userData = getUserData(userId);
    
    // Update global arrays with user-specific data
    positions.length = 0; // Clear array
    positions.push(...userData.positions);
    
    orders.length = 0; // Clear array
    orders.push(...userData.orders);
  };

  // Save current data to user-specific storage
  const saveCurrentUserData = () => {
    const userId = getCurrentUserId();
    const userData = {
      positions: [...positions],
      orders: [...orders]
    };
    saveUserData(userId, userData);
  };

  // Initialize with demo data only for development/demo purposes
  // This will only run if user has no existing data
  const initializeDemoData = (userId) => {
    const userData = getUserData(userId);
    
    // Only add demo data if user has no existing positions/orders
    if (userData.positions.length === 0 && userData.orders.length === 0) {
      // Add some sample data for demo purposes (optional - can be removed)
      const demoPositions = [
        {
          id: 1,
          product: "CNC",
          name: "EVEREADY",
          type: "equity",
          qty: 2,
          avg: 316.27,
          price: 312.35,
          pnl: -7.84,
          net: "-1.24%",
          day: "-1.24%",
          isLoss: true,
        },
        {
          id: 2,
          product: "CNC", 
          name: "JUBLFOOD",
          type: "equity",
          qty: 1,
          avg: 3124.75,
          price: 3082.65,
          pnl: -42.10,
          net: "-1.35%",
          day: "-1.35%",
          isLoss: true,
        }
      ];

      const demoOrders = [
        {
          id: 1,
          stock: "EVEREADY",
          type: "Buy",
          quantity: 2,
          price: 316.27,
          total: 632.54,
          orderType: "market",
          status: "executed",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          product: "CNC"
        },
        {
          id: 2,
          stock: "JUBLFOOD",
          type: "Buy", 
          quantity: 1,
          price: 3124.75,
          total: 3124.75,
          orderType: "market",
          status: "executed",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          product: "CNC"
        }
      ];

      // Comment out the demo data initialization for production
      // For now, new users start with empty positions
      // userData.positions = demoPositions;
      // userData.orders = demoOrders;
      // saveUserData(userId, userData);
    }
  };

  // Position management functions - now user-specific
  export const positionManager = {
    // Initialize user session (call this when user logs in)
    initializeUser: (userId) => {
      const userData = getUserData(userId);
      initializeDemoData(userId); // Optional demo data
      loadUserSpecificData();
      return userData;
    },

    // Switch user context (when different user logs in)
    switchUser: (userId) => {
      loadUserSpecificData();
    },

    // Add a new order and update positions
    addOrder: (orderData) => {
      const userId = getCurrentUserId();
      const newOrder = {
        id: Date.now(),
        ...orderData,
        timestamp: new Date(),
        status: 'executed'
      };
      
      orders.push(newOrder);
      
      // Update positions based on the order
      updatePositionsFromOrder(newOrder);
      
      // Update wallet for the trade
      walletManager.updateWalletForTrade(userId, newOrder);
      
      // Save to user-specific storage
      saveCurrentUserData();
      
      return newOrder;
    },

    // Get current positions for the logged-in user
    getPositions: () => {
      loadUserSpecificData(); // Ensure we have latest user data
      return positions;
    },

    // Get filtered positions by type
    getPositionsByType: (type) => {
      loadUserSpecificData(); // Ensure we have latest user data
      if (type === 'all') return positions;
      return positions.filter(pos => pos.type === type);
    },

    // Exit a position (partial or full)
    exitPosition: (positionId, exitQuantity) => {
      loadUserSpecificData(); // Ensure we have latest user data
      
      const positionIndex = positions.findIndex(pos => pos.id === positionId);
      if (positionIndex === -1) return false;

      const position = positions[positionIndex];
      
      if (exitQuantity >= position.qty) {
        // Full exit - remove position
        positions.splice(positionIndex, 1);
      } else {
        // Partial exit - reduce quantity
        positions[positionIndex].qty -= exitQuantity;
      }
      
      // Add sell order to orders
      const sellOrder = {
        id: Date.now(),
        stock: position.name,
        type: "Sell",
        quantity: exitQuantity,
        price: position.price,
        total: exitQuantity * position.price,
        orderType: "market",
        status: "executed",
        timestamp: new Date(),
        product: position.product
      };
      
      orders.push(sellOrder);
      
      // Save to user-specific storage
      saveCurrentUserData();
      
      return true;
    },

    // Update current prices for positions
    updatePositionPrices: (priceUpdates) => {
      loadUserSpecificData(); // Ensure we have latest user data
      
      positions.forEach(position => {
        if (priceUpdates[position.name]) {
          const newPrice = priceUpdates[position.name];
          const oldPrice = position.price;
          
          position.price = newPrice;
          position.pnl = (newPrice - position.avg) * position.qty;
          position.net = (((newPrice - position.avg) / position.avg) * 100).toFixed(2) + "%";
          
          // Calculate day change (assuming previous price is stored)
          const dayChange = ((newPrice - oldPrice) / oldPrice) * 100;
          position.day = (dayChange >= 0 ? "+" : "") + dayChange.toFixed(2) + "%";
          position.isLoss = position.pnl < 0;
        }
      });
      
      // Save to user-specific storage
      saveCurrentUserData();
    },

    // Get position summary/stats for current user
    getPositionSummary: () => {
      loadUserSpecificData(); // Ensure we have latest user data
      
      const summary = positions.reduce((acc, pos) => {
        acc.totalInvested += pos.avg * pos.qty;
        acc.currentValue += pos.price * pos.qty;
        acc.totalPnL += pos.pnl;
        acc.totalPositions += 1;
        
        if (pos.pnl > 0) acc.profitablePositions += 1;
        
        return acc;
      }, {
        totalInvested: 0,
        currentValue: 0,
        totalPnL: 0,
        totalPositions: 0,
        profitablePositions: 0
      });

      summary.totalPnLPercent = summary.totalInvested > 0 
        ? (summary.totalPnL / summary.totalInvested) * 100 
        : 0;

      return summary;
    },

    // Get recent orders for current user
    getRecentOrders: (limit = 10) => {
      loadUserSpecificData(); // Ensure we have latest user data
      
      return orders
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);
    },

    // Clear all data for current user (for testing/reset purposes)
    clearUserData: () => {
      const userId = getCurrentUserId();
      positions.length = 0;
      orders.length = 0;
      saveCurrentUserData();
    },

    // Get user data info (for debugging)
    getUserInfo: () => {
      const userId = getCurrentUserId();
      return {
        userId,
        positionsCount: positions.length,
        ordersCount: orders.length,
        lastUpdated: getUserData(userId).lastUpdated
      };
    }
  };

  // Helper function to update positions when a new order is placed
  function updatePositionsFromOrder(order) {
    const existingPositionIndex = positions.findIndex(pos => 
      pos.name === order.stock && pos.product === order.product
    );

    if (order.type === "Buy") {
      if (existingPositionIndex !== -1) {
        // Update existing position
        const position = positions[existingPositionIndex];
        const totalQty = position.qty + order.quantity;
        const totalCost = (position.avg * position.qty) + (order.price * order.quantity);
        
        position.avg = totalCost / totalQty;
        position.qty = totalQty;
        position.pnl = (position.price - position.avg) * position.qty;
        position.net = (((position.price - position.avg) / position.avg) * 100).toFixed(2) + "%";
      } else {
        // Create new position
        const newPosition = {
          id: Date.now(),
          product: order.product || "CNC",
          name: order.stock,
          type: order.product === "MIS" ? "intraday" : "equity",
          qty: order.quantity,
          avg: order.price,
          price: order.price, // Will be updated with market data
          pnl: 0,
          net: "0.00%",
          day: "0.00%",
          isLoss: false
        };
        
        positions.push(newPosition);
      }
    } else if (order.type === "Sell") {
      if (existingPositionIndex !== -1) {
        const position = positions[existingPositionIndex];
        
        if (order.quantity >= position.qty) {
          // Full sell - remove position
          positions.splice(existingPositionIndex, 1);
        } else {
          // Partial sell - reduce quantity
          position.qty -= order.quantity;
          position.pnl = (position.price - position.avg) * position.qty;
        }
      }
    }
  }

  // Initialize user data when the module loads
  // This ensures positions start empty for new users
  const currentUserId = getCurrentUserId();
  if (currentUserId && currentUserId !== 'anonymous') {
    positionManager.initializeUser(currentUserId);
  }

  // Wallet management functions
  export const walletManager = {
    // Update wallet balance when trades are executed
    updateWalletForTrade: (userId, order) => {
      try {
        const walletData = JSON.parse(localStorage.getItem(`walletData_${userId}`)) || {
          balance: 0,
          currency: 'INR',
          transactions: []
        };

        const tradeAmount = order.price * order.quantity;
        const newTransaction = {
          id: Date.now(),
          type: order.type === 'Buy' ? 'debit' : 'credit',
          amount: tradeAmount,
          description: `${order.type} ${order.quantity} ${order.stock}`,
          date: new Date().toISOString(),
          status: 'completed'
        };

        // Update balance
        if (order.type === 'Buy') {
          walletData.balance = Math.max(0, walletData.balance - tradeAmount);
        } else {
          walletData.balance += tradeAmount;
        }

        // Add transaction to history (keep last 10)
        walletData.transactions = [newTransaction, ...walletData.transactions.slice(0, 9)];
        
        // Save updated wallet data
        localStorage.setItem(`walletData_${userId}`, JSON.stringify(walletData));
        
        return walletData;
      } catch (error) {
        console.error('Error updating wallet for trade:', error);
        return null;
      }
    }
  };