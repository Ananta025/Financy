import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Authentication middleware to protect routes
 */
const auth = async (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    
    // Extract token from header
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info to request object
    req.user = {
      userId: decoded.userId
    };
    
    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export default auth;
