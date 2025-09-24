import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useTrading } from '../context/tradingHooks.js';
import TradingService from '../services/tradingService.js';

const TradeModal = ({ open, handleClose, tradeType, stockName, stockPrice, orderDetails, onOrderSuccess }) => {
  const [quantity, setQuantity] = useState(orderDetails?.quantity || 1);
  const [total, setTotal] = useState(orderDetails?.total || parseFloat((stockPrice * 1).toFixed(2)));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { createOrder } = useTrading();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Update state when orderDetails changes (when modal opens with new order data)
  useEffect(() => {
    if (orderDetails) {
      setQuantity(orderDetails.quantity || 1);
      setTotal(orderDetails.total || parseFloat((stockPrice * (orderDetails.quantity || 1)).toFixed(2)));
    } else {
      setQuantity(1);
      setTotal(parseFloat((stockPrice * 1).toFixed(2)));
    }
    // Reset error state when modal opens with new data
    setError('');
  }, [orderDetails, stockPrice]);
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    setTotal(parseFloat((newQuantity * stockPrice).toFixed(2)));
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Prepare the order data according to the new API schema
      const orderData = {
        stock: stockName,
        type: tradeType,
        quantity: quantity,
        price: stockPrice,
        orderType: orderDetails ? orderDetails.orderType : 'market',
        limitPrice: orderDetails?.limitPrice || stockPrice,
        triggerPrice: orderDetails?.triggerPrice || null,
        total: parseFloat((quantity * stockPrice).toFixed(2)) // Calculate total to match validation expectation
      };
      
      // Validate the order data first
      const validation = TradingService.validateOrderData(orderData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Send the order to the server using the trading context
      const response = await createOrder(orderData);
      
      if (response.success) {
        console.log('Order created successfully:', response.order);
        
        // Call the success callback if provided
        if (onOrderSuccess && typeof onOrderSuccess === 'function') {
          onOrderSuccess(response.order);
        }
        
        handleClose();
      } else {
        throw new Error(response.message || 'Failed to create order');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message || 'Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="trade-modal-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
          xs: '90%', 
          sm: '450px',
          md: '500px',
          lg: '550px'
        },
        maxHeight: {
          xs: '90vh',
          sm: '80vh'
        },
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
      }}>
        <div className="flex justify-between items-center mb-4">
          <Typography 
            id="trade-modal-title" 
            variant={isMobile ? "h6" : "h5"} 
            component="h2"
            sx={{ fontWeight: 'bold' }}
          >
            Confirm {tradeType} Order
          </Typography>
          <CloseIcon 
            onClick={handleClose} 
            className="cursor-pointer" 
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem' },
              padding: '4px',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {stockName}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              ₹{stockPrice}
            </Typography>
          </div>
          
          {orderDetails && (
            <div className="bg-gray-50 p-3 rounded-md mb-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Order Type:</span>
                  <p className="font-medium capitalize">{orderDetails.orderType}</p>
                </div>
                
                {orderDetails.orderType !== 'market' && (
                  <div>
                    <span className="text-gray-600">Limit Price:</span>
                    <p className="font-medium">₹{orderDetails.limitPrice.toFixed(2)}</p>
                  </div>
                )}
                
                {orderDetails.orderType === 'sl' && (
                  <div>
                    <span className="text-gray-600">Trigger Price:</span>
                    <p className="font-medium">₹{orderDetails.triggerPrice.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ 
              min: 1,
              style: { fontSize: isMobile ? '1rem' : '1.1rem' }
            }}
            sx={{ mt: 1, mb: 1 }}
            disabled={!!orderDetails}
          />
        </div>
        
        <div className="mb-4">
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              fontWeight: 600,
              mb: 2
            }}
          >
            Total Amount: ₹{total}
          </Typography>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <Typography variant="body2" sx={{ color: 'red' }}>
                {error}
              </Typography>
            </div>
          )}
          
          <div className="bg-gray-50 p-2 rounded-md text-xs">
            <p className="text-gray-600 mb-1">
              By placing this order, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy.
            </p>
            <p className="text-gray-600">
              All orders are subject to market conditions and availability.
            </p>
          </div>
        </div>
        
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            bgcolor: tradeType === 'Buy' ? '#4caf50' : '#f44336',
            '&:hover': {
              bgcolor: tradeType === 'Buy' ? '#388e3c' : '#d32f2f',
            },
            '&:disabled': {
              bgcolor: '#cccccc',
            },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mt: 1
          }}
        >
          {isSubmitting ? 'Processing...' : `Confirm ${tradeType} Order`}
        </Button>
      </Box>
    </Modal>
  );
};

export default TradeModal;