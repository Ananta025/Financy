import rateLimit from 'express-rate-limit';

// Auth limiter removed - no longer needed

/**
 * General API rate limiter
 * Prevents DoS attacks
 */
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute
  message: {
    success: false,
    message: 'Too many requests. Please slow down.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Stricter limiter for order creation
 * Prevents spam trading
 */
export const orderLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // Max 20 orders per minute
  message: {
    success: false,
    message: 'Too many order requests. Please wait before placing more orders.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

export default {
  apiLimiter,
  orderLimiter
};
