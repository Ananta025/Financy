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
