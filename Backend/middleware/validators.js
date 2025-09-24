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
    .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  
  check('price')
    .not().isEmpty().withMessage('Price is required')
    .isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),
  
  check('orderType')
    .optional()
    .isIn(['market', 'limit', 'sl']).withMessage('Order type must be market, limit, or sl'),
  
  check('limitPrice')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('Limit price must be a positive number'),
  
  check('triggerPrice')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('Trigger price must be a positive number'),
  
  check('total')
    .not().isEmpty().withMessage('Total amount is required')
    .isFloat({ min: 0.01 }).withMessage('Total amount must be a positive number')
];
