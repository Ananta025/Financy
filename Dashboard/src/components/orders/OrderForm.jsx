import React, { useState, useEffect } from 'react';

const OrderForm = ({ stock, tradeType, onTradeTypeChange, onSubmit }) => {
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState(stock ? stock.price : 0);
  const [triggerPrice, setTriggerPrice] = useState(stock ? stock.price : 0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    // Reset prices when stock changes
    if (stock) {
      setLimitPrice(stock.price);
      setTriggerPrice(stock.price);
    }
  }, [stock]);
  
  useEffect(() => {
    // Calculate total based on order type
    if (stock) {
      let calculatedTotal;
      if (orderType === 'market') {
        calculatedTotal = quantity * stock.price;
      } else if (orderType === 'limit') {
        calculatedTotal = quantity * limitPrice;
      } else { // stop loss
        calculatedTotal = quantity * limitPrice;
      }
      setTotal(calculatedTotal);
    }
  }, [stock, quantity, limitPrice, orderType]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value > 0 ? value : 1);
  };
  
  const handleLimitPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setLimitPrice(value > 0 ? value : 0.01);
  };
  
  const handleTriggerPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setTriggerPrice(value > 0 ? value : 0.01);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderData = {
      stock,
      tradeType,
      orderType,
      quantity,
      limitPrice: orderType !== 'market' ? limitPrice : stock.price,
      triggerPrice: orderType === 'sl' ? triggerPrice : null,
      total
    };
    
    onSubmit(orderData);
  };
  
  if (!stock) return null;
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex mb-4 border-b">
        <button
          onClick={() => onTradeTypeChange('Buy')}
          className={`relative flex-1 pb-3 text-center font-medium transition-colors ${
            tradeType === 'Buy' 
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          BUY
          {tradeType === 'Buy' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"></div>}
        </button>
        <button
          onClick={() => onTradeTypeChange('Sell')}
          className={`relative flex-1 pb-3 text-center font-medium transition-colors ${
            tradeType === 'Sell' 
              ? 'text-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          SELL
          {tradeType === 'Sell' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></div>}
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setOrderType('market')}
              className={`flex-1 py-2 px-4 border text-sm rounded-md focus:outline-none ${
                orderType === 'market'
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Market
            </button>
            <button
              type="button"
              onClick={() => setOrderType('limit')}
              className={`flex-1 py-2 px-4 border text-sm rounded-md focus:outline-none ${
                orderType === 'limit'
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Limit
            </button>
            <button
              type="button"
              onClick={() => setOrderType('sl')}
              className={`flex-1 py-2 px-4 border text-sm rounded-md focus:outline-none ${
                orderType === 'sl'
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Stop Loss
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <div className="flex rounded-md">
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
            />
            <button 
              type="button"
              onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
              className="inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
            >
              -
            </button>
            <button 
              type="button"
              onClick={() => setQuantity(prev => prev + 1)}
              className="inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md"
            >
              +
            </button>
          </div>
        </div>
        
        {orderType !== 'market' && (
          <div className="mb-4">
            <label htmlFor="limitPrice" className="block text-sm font-medium text-gray-700 mb-1">
              {orderType === 'limit' ? 'Limit Price' : 'Order Price'}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="limitPrice"
                id="limitPrice"
                step="0.01"
                value={limitPrice}
                onChange={handleLimitPriceChange}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
        
        {orderType === 'sl' && (
          <div className="mb-4">
            <label htmlFor="triggerPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Trigger Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="triggerPrice"
                id="triggerPrice"
                step="0.01"
                value={triggerPrice}
                onChange={handleTriggerPriceChange}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-gray-50 p-4 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Market Price:</span>
            <span className="font-medium">₹{stock.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-gray-700">Quantity:</span>
            <span className="font-medium">{quantity}</span>
          </div>
          <div className="border-t my-2 pt-2 flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            tradeType === 'Buy'
              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
          }`}
        >
          {tradeType} {stock.name}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
