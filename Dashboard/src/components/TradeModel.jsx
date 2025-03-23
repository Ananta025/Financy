import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const TradeModal = ({ open, handleClose, tradeType, stockName, stockPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(stockPrice);
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    setTotal((newQuantity * stockPrice).toFixed(2));
  };
  
  const handleSubmit = () => {
    // Here you would implement the logic to process the trade
    axios.post('http://localhost:3000/new-order', {
        name : stockName,
        qty: quantity,
        price: stockPrice,
        mode : tradeType,
    })
      .then((res) => {
        console.log(res.data);
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
        width: {xs: '90%', sm: '500px'},
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <div className="flex justify-between items-center mb-4">
          <Typography id="trade-modal-title" variant="h6" component="h2">
            {tradeType} {stockName}
          </Typography>
          <CloseIcon onClick={handleClose} className="cursor-pointer" />
        </div>
        
        <div className="mb-4">
          <Typography variant="subtitle1">Current Price: ₹{stockPrice}</Typography>
        </div>
        
        <div className="mb-4">
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
          />
        </div>
        
        <div className="mb-6">
          <Typography variant="subtitle1">Total Amount: ₹{total}</Typography>
        </div>
        
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleSubmit}
          sx={{
            bgcolor: tradeType === 'Buy' ? '#4caf50' : '#f44336',
            '&:hover': {
              bgcolor: tradeType === 'Buy' ? '#388e3c' : '#d32f2f',
            }
          }}
        >
          Confirm {tradeType}
        </Button>
      </Box>
    </Modal>
  );
};

export default TradeModal;