import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, useMediaQuery, useTheme, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ExitPositionModal = ({ open, handleClose, position, handleExit }) => {
  const [quantity, setQuantity] = useState(position ? position.quantity : 0);
  const [orderType, setOrderType] = useState('market');
  const [limitPrice, setLimitPrice] = useState(position ? position.currentPrice : 0);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    // Don't allow quantity greater than position quantity
    if (newQuantity <= position.quantity) {
      setQuantity(newQuantity);
    }
  };
  
  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };
  
  const handleLimitPriceChange = (e) => {
    const price = parseFloat(e.target.value) || 0;
    setLimitPrice(price);
  };
  
  const handleSubmit = () => {
    // Call the parent component's exit handler
    handleExit(position.id, quantity, {
      orderType,
      limitPrice: orderType === 'limit' ? limitPrice : position.currentPrice
    });
  };
  
  if (!position) return null;
  
  const totalValue = quantity * (orderType === 'market' ? position.currentPrice : limitPrice);
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="exit-position-modal-title"
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
            id="exit-position-modal-title" 
            variant={isMobile ? "h6" : "h5"} 
            component="h2"
            sx={{ fontWeight: 'bold' }}
          >
            Exit Position: {position.name}
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
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: 'text.secondary'
                }}
              >
                Current Price
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '1.1rem', sm: '1.2rem' } 
                }}
              >
                ₹{position.currentPrice.toFixed(2)}
              </Typography>
            </div>
            <div>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: 'text.secondary'
                }}
              >
                P&L
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '1.1rem', sm: '1.2rem' },
                  color: position.pnl >= 0 ? 'success.main' : 'error.main'
                }}
              >
                ₹{position.pnl.toFixed(2)}
              </Typography>
            </div>
          </div>
          
          <div className="mb-4">
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' },
                mb: 1
              }}
            >
              Order Type
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={orderType}
                onChange={handleOrderTypeChange}
                displayEmpty
              >
                <MenuItem value="market">Market Order</MenuItem>
                <MenuItem value="limit">Limit Order</MenuItem>
              </Select>
            </FormControl>
          </div>
          
          {orderType === 'limit' && (
            <div className="mb-4">
              <TextField
                fullWidth
                label="Limit Price"
                type="number"
                value={limitPrice}
                onChange={handleLimitPriceChange}
                size="small"
                InputProps={{
                  startAdornment: <span className="mr-1">₹</span>
                }}
              />
            </div>
          )}
          
          <div className="mb-4">
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' },
                mb: 1
              }}
            >
              Quantity (Max: {position.quantity})
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              size="small"
              inputProps={{ 
                min: 1,
                max: position.quantity
              }}
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-3">
          <div className="flex justify-between items-center mb-1">
            <Typography variant="subtitle1">Total Value</Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              ₹{totalValue.toFixed(2)}
            </Typography>
          </div>
          {position.quantity !== quantity && (
            <Typography variant="body2" color="text.secondary" className="mb-3">
              {position.quantity - quantity} shares will remain in your position
            </Typography>
          )}
        </div>
        
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleSubmit}
          disabled={quantity <= 0}
          sx={{
            bgcolor: '#f44336',
            '&:hover': {
              bgcolor: '#d32f2f',
            },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mt: 1
          }}
        >
          Exit Position
        </Button>
      </Box>
    </Modal>
  );
};

export default ExitPositionModal;
