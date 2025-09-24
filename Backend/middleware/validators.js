import { check } from 'express-validator';

/**
 * Validation rules for user signup
 */
export const validateSignup = [
  check('name')
    .not().isEmpty().withMessage('Name is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  check('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

/**
 * Validation rules for user signin
 */
export const validateSignin = [
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  check('password')
    .not().isEmpty().withMessage('Password is required')
];

/**
 * Validation rules for creating an order
 */
export const validateOrder = [
  check('stock')
    .not().isEmpty().withMessage('Stock symbol is required')
    .trim()
    .isLength({ min: 1, max: 20 }).withMessage('Stock symbol must be between 1 and 20 characters'),
  
  check('type')
    .not().isEmpty().withMessage('Order type is required')
    .isIn(['Buy', 'Sell']).withMessage('Order type must be either Buy or Sell'),
  
  check('quantity')
    .not().isEmpty().withMessage('Quantity is required')
    .isNumeric().withMessage('Quantity must be a number')
    .custom((value) => {
      const numValue = parseInt(value);
      if (numValue < 1) {
        throw new Error('Quantity must be at least 1');
      }
      return true;
    }),
  
  check('price')
    .not().isEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom((value) => {
      const numValue = parseFloat(value);
      if (numValue <= 0) {
        throw new Error('Price must be greater than 0');
      }
      return true;
    }),
  
  check('orderType')
    .optional()
    .isIn(['market', 'limit', 'sl']).withMessage('Order type must be market, limit, or sl'),
  
  check('limitPrice')
    .optional()
    .isNumeric().withMessage('Limit price must be a number')
    .custom((value, { req }) => {
      if (req.body.orderType !== 'market' && (!value || parseFloat(value) <= 0)) {
        throw new Error('Limit price is required for non-market orders and must be greater than 0');
      }
      return true;
    }),
  
  check('triggerPrice')
    .optional()
    .isNumeric().withMessage('Trigger price must be a number')
    .custom((value, { req }) => {
      if (req.body.orderType === 'sl' && (!value || parseFloat(value) <= 0)) {
        throw new Error('Trigger price is required for stop loss orders and must be greater than 0');
      }
      return true;
    }),
  
  check('total')
    .not().isEmpty().withMessage('Total amount is required')
    .isNumeric().withMessage('Total amount must be a number')
    .custom((value, { req }) => {
      const numValue = parseFloat(value);
      if (numValue <= 0) {
        throw new Error('Total amount must be greater than 0');
      }
      
      // Validate total matches quantity * price with tolerance
      const quantity = parseInt(req.body.quantity) || 0;
      const price = parseFloat(req.body.price) || 0;
      const expectedTotal = parseFloat((quantity * price).toFixed(2));
      const tolerance = 0.02;
      
      if (Math.abs(numValue - expectedTotal) > tolerance) {
        throw new Error(`Total amount (${numValue}) does not match quantity × price (${expectedTotal})`);
      }
      
      return true;
    })
];

/**
 * Validation rules for exiting a position
 */
export const validateExitPosition = [
  check('quantity')
    .not().isEmpty().withMessage('Quantity is required')
    .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  
  check('exitPrice')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('Exit price must be a positive number'),
  
  check('orderType')
    .optional()
    .isIn(['market', 'limit']).withMessage('Order type must be market or limit')
];
