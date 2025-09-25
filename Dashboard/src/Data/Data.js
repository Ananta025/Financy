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
  
  // Template holdings data for reference (used for demo purposes)
  const holdingsTemplate = [
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
      holdings: [],
      lastUpdated: new Date().toISOString()
    };
  };

  // Get current user ID from localStorage or context
  const getCurrentUserId = () => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('userId') || 'anonymous';
    }
    return 'anonymous'; // Fallback for non-browser environments
  };

  // Get user-specific data from localStorage
  const getUserData = (userId) => {
    try {
      if (typeof localStorage === 'undefined') {
        return initializeUserData(userId);
      }
      
      const allUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || '{}');
      if (!allUserData[userId]) {
        // Initialize empty data for new user
        allUserData[userId] = initializeUserData(userId);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(allUserData));
      }
      
      // Ensure the data structure is complete (safety check)
      const userData = allUserData[userId];
      if (!userData.positions) userData.positions = [];
      if (!userData.orders) userData.orders = [];
      if (!userData.holdings) userData.holdings = [];
      if (!userData.lastUpdated) userData.lastUpdated = new Date().toISOString();
      
      return userData;
    } catch (error) {
      console.error('Error loading user data:', error);
      return initializeUserData(userId);
    }
  };

  // Save user-specific data to localStorage
  const saveUserData = (userId, userData) => {
    try {
      if (typeof localStorage === 'undefined') {
        console.warn('localStorage not available');
        return;
      }
      
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

  // holdings - now user-specific and starts empty for new users
  export let holdings = [];

  // Load user-specific data on initialization
  const loadUserSpecificData = () => {
    const userId = getCurrentUserId();
    const userData = getUserData(userId);
    
    // Update global arrays with user-specific data (with safety checks)
    positions.length = 0; // Clear array
    if (userData.positions && Array.isArray(userData.positions)) {
      positions.push(...userData.positions);
    }
    
    orders.length = 0; // Clear array
    if (userData.orders && Array.isArray(userData.orders)) {
      orders.push(...userData.orders);
    }
    
    holdings.length = 0; // Clear array
    if (userData.holdings && Array.isArray(userData.holdings)) {
      holdings.push(...userData.holdings);
    }
  };

  // Save current data to user-specific storage
  const saveCurrentUserData = () => {
    const userId = getCurrentUserId();
    const userData = {
      positions: [...positions],
      orders: [...orders],
      holdings: [...holdings]
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

  // Holdings Manager - Similar to positions but for long-term holdings
  export const holdingManager = {
    // Initialize user-specific holdings data
    initializeUser: (userId) => {
      // First, ensure user data exists with proper structure
      const userData = getUserData(userId);
      
      // Then load the user-specific data
      loadUserSpecificData();
      
      // Check if we need to add demo holdings
      if (!userData.holdings || userData.holdings.length === 0) {
        // Add some demo holdings for new users (can be customized or removed)
        const demoHoldings = [
          {
            name: "ONGC",
            qty: 1,
            avg: 116.8,
            price: 116.8,
            sector: 'Energy'
          }
        ];
        
        // Add each demo holding
        demoHoldings.forEach(holding => {
          // Calculate derived values
          const investedValue = holding.avg * holding.qty;
          const currentValue = holding.price * holding.qty;
          const pnl = currentValue - investedValue;
          const pnlPercent = investedValue > 0 ? ((pnl / investedValue) * 100) : 0;
          
          const fullHolding = {
            id: Date.now() + Math.random(),
            name: holding.name,
            qty: holding.qty,
            avg: holding.avg,
            price: holding.price,
            sector: holding.sector,
            net: (pnlPercent >= 0 ? "+" : "") + pnlPercent.toFixed(2) + "%",
            day: generateTodaysChange(),
            isLoss: pnl < 0,
            addedDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          };
          
          holdings.push(fullHolding);
        });
        
        saveCurrentUserData();
      }
    },

    // Get all holdings for current user
    getHoldings: () => {
      loadUserSpecificData();
      return [...holdings]; // Return copy to prevent mutations
    },

    // Add a new holding (when stocks are bought and held long-term)
    addHolding: (holdingData) => {
      loadUserSpecificData();
      
      const holding = {
        id: Date.now(),
        name: holdingData.stock || holdingData.name,
        qty: parseInt(holdingData.quantity) || parseInt(holdingData.qty),
        avg: parseFloat(holdingData.averagePrice) || parseFloat(holdingData.avg) || parseFloat(holdingData.price),
        price: parseFloat(holdingData.currentPrice) || parseFloat(holdingData.price),
        sector: holdingData.sector || getSectorForStock(holdingData.stock || holdingData.name),
        addedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      // Calculate derived values
      const investedValue = holding.avg * holding.qty;
      const currentValue = holding.price * holding.qty;
      const pnl = currentValue - investedValue;
      const pnlPercent = investedValue > 0 ? ((pnl / investedValue) * 100) : 0;
      
      // Add calculated fields
      holding.net = (pnlPercent >= 0 ? "+" : "") + pnlPercent.toFixed(2) + "%";
      holding.day = generateTodaysChange(); // Random day change for demo
      holding.isLoss = pnl < 0;

      // Check if holding already exists, if so, average the price
      const existingIndex = holdings.findIndex(h => h.name === holding.name);
      if (existingIndex !== -1) {
        const existing = holdings[existingIndex];
        const totalQty = existing.qty + holding.qty;
        const totalInvested = (existing.avg * existing.qty) + (holding.avg * holding.qty);
        
        holdings[existingIndex] = {
          ...existing,
          qty: totalQty,
          avg: totalInvested / totalQty,
          price: holding.price, // Use latest price
          lastUpdated: holding.lastUpdated
        };

        // Recalculate derived values for updated holding
        const updatedHolding = holdings[existingIndex];
        const updatedInvested = updatedHolding.avg * updatedHolding.qty;
        const updatedCurrent = updatedHolding.price * updatedHolding.qty;
        const updatedPnl = updatedCurrent - updatedInvested;
        const updatedPnlPercent = updatedInvested > 0 ? ((updatedPnl / updatedInvested) * 100) : 0;
        
        updatedHolding.net = (updatedPnlPercent >= 0 ? "+" : "") + updatedPnlPercent.toFixed(2) + "%";
        updatedHolding.day = generateTodaysChange();
        updatedHolding.isLoss = updatedPnl < 0;
      } else {
        holdings.push(holding);
      }
      
      saveCurrentUserData();
      return true;
    },

    // Update holding prices (for real-time price updates)
    updateHoldingPrices: (priceUpdates) => {
      loadUserSpecificData();
      
      holdings.forEach(holding => {
        if (priceUpdates[holding.name]) {
          const oldPrice = holding.price;
          const newPrice = parseFloat(priceUpdates[holding.name]);
          
          holding.price = newPrice;
          holding.lastUpdated = new Date().toISOString();
          
          // Recalculate derived values
          const investedValue = holding.avg * holding.qty;
          const currentValue = holding.price * holding.qty;
          const pnl = currentValue - investedValue;
          const pnlPercent = investedValue > 0 ? ((pnl / investedValue) * 100) : 0;
          
          holding.net = (pnlPercent >= 0 ? "+" : "") + pnlPercent.toFixed(2) + "%";
          
          // Calculate day change based on price difference
          const dayChange = oldPrice > 0 ? (((newPrice - oldPrice) / oldPrice) * 100) : 0;
          holding.day = (dayChange >= 0 ? "+" : "") + dayChange.toFixed(2) + "%";
          holding.isLoss = pnl < 0;
        }
      });
      
      saveCurrentUserData();
    },

    // Remove holding (when fully sold)
    removeHolding: (holdingName) => {
      loadUserSpecificData();
      const index = holdings.findIndex(h => h.name === holdingName);
      if (index !== -1) {
        holdings.splice(index, 1);
        saveCurrentUserData();
        return true;
      }
      return false;
    },

    // Reduce holding quantity (when partially sold)
    reduceHolding: (holdingName, quantityToSell) => {
      loadUserSpecificData();
      const holding = holdings.find(h => h.name === holdingName);
      
      if (holding && holding.qty >= quantityToSell) {
        if (holding.qty === quantityToSell) {
          // Full sale - remove holding
          return holdingManager.removeHolding(holdingName);
        } else {
          // Partial sale - reduce quantity
          holding.qty -= quantityToSell;
          holding.lastUpdated = new Date().toISOString();
          
          // Recalculate derived values
          const investedValue = holding.avg * holding.qty;
          const currentValue = holding.price * holding.qty;
          const pnl = currentValue - investedValue;
          const pnlPercent = investedValue > 0 ? ((pnl / investedValue) * 100) : 0;
          
          holding.net = (pnlPercent >= 0 ? "+" : "") + pnlPercent.toFixed(2) + "%";
          holding.day = generateTodaysChange();
          holding.isLoss = pnl < 0;
          
          saveCurrentUserData();
          return true;
        }
      }
      return false;
    },

    // Get holdings summary/portfolio stats
    getHoldingsSummary: () => {
      loadUserSpecificData();
      
      const summary = holdings.reduce((acc, holding) => {
        const investedValue = holding.avg * holding.qty;
        const currentValue = holding.price * holding.qty;
        const pnl = currentValue - investedValue;
        
        acc.totalInvestedValue += investedValue;
        acc.totalCurrentValue += currentValue;
        acc.totalPnL += pnl;
        acc.totalHoldings += 1;
        
        if (pnl > 0) acc.profitableHoldings += 1;
        
        // Parse day change for today's total change calculation
        const dayChangeStr = holding.day.replace(/[+%]/g, '');
        const dayChangePercent = parseFloat(dayChangeStr) || 0;
        const dayChangeValue = (dayChangePercent / 100) * currentValue;
        acc.totalDayChange += dayChangeValue;
        
        return acc;
      }, {
        totalInvestedValue: 0,
        totalCurrentValue: 0,
        totalPnL: 0,
        totalDayChange: 0,
        totalHoldings: 0,
        profitableHoldings: 0
      });

      // Calculate percentages
      summary.totalPnLPercent = summary.totalInvestedValue > 0 
        ? (summary.totalPnL / summary.totalInvestedValue) * 100 
        : 0;
      
      summary.totalDayChangePercent = summary.totalCurrentValue > 0
        ? (summary.totalDayChange / summary.totalCurrentValue) * 100
        : 0;

      return summary;
    },

    // Clear all holdings for current user
    clearUserHoldings: () => {
      holdings.length = 0;
      saveCurrentUserData();
    },

    // Get user info
    getHoldingsInfo: () => {
      const userId = getCurrentUserId();
      return {
        userId,
        holdingsCount: holdings.length,
        lastUpdated: getUserData(userId).lastUpdated
      };
    }
  };

  // Helper function to generate random today's change for demo
  function generateTodaysChange() {
    const changePercent = (Math.random() - 0.5) * 6; // Random between -3% to +3%
    return (changePercent >= 0 ? "+" : "") + changePercent.toFixed(2) + "%";
  }

  // Helper function to get sector for a stock (demo purposes)
  function getSectorForStock(stockName) {
    const sectors = {
      'BHARTIARTL': 'Telecommunications',
      'HDFCBANK': 'Banking',
      'HINDUNILVR': 'FMCG',
      'INFY': 'Technology',
      'ITC': 'FMCG',
      'KPITTECH': 'Technology',
      'M&M': 'Automobile',
      'RELIANCE': 'Energy',
      'SBIN': 'Banking',
      'SGBMAY29': 'Government Securities',
      'TATAPOWER': 'Power',
      'ONGC': 'Energy',
      'TCS': 'Technology',
      'WIPRO': 'Technology',
      'HUL': 'FMCG'
    };
    return sectors[stockName] || 'Others';
  }

  // Initialize user data when the module loads
  // This ensures both positions and holdings start empty for new users
  const currentUserId = getCurrentUserId();
  if (currentUserId && currentUserId !== 'anonymous' && typeof localStorage !== 'undefined') {
    try {
      positionManager.initializeUser(currentUserId);
      holdingManager.initializeUser(currentUserId);
    } catch (error) {
      console.error('Error initializing user data:', error);
      // Reset localStorage if corrupted
      try {
        localStorage.removeItem(USER_DATA_KEY);
      } catch (storageError) {
        console.error('Could not clear localStorage:', storageError);
      }
    }
  }