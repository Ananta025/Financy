import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const TradeModal = ({ open, handleClose, tradeType, stockName, stockPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(stockPrice);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    setTotal((newQuantity * stockPrice).toFixed(2));
  };
  
  const handleSubmit = () => {
    axios.post('http://localhost:3000/new-order', {
        name : stockName,
        qty: quantity,
        price: stockPrice,
        mode : tradeType,
    })
      .then((res) => {
        console.log(res.data);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
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
            {tradeType} {stockName}
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
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 500
            }}
          >
            Current Price: ₹{stockPrice}
          </Typography>
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
          />
        </div>
        
        <div className="mb-6">
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
        </div>
        
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleSubmit}
          sx={{
            bgcolor: tradeType === 'Buy' ? '#4caf50' : '#f44336',
            '&:hover': {
              bgcolor: tradeType === 'Buy' ? '#388e3c' : '#d32f2f',
            },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mt: 1
          }}
        >
          Confirm {tradeType}
        </Button>
      </Box>
    </Modal>
  );
};

export default TradeModal;