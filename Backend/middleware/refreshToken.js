/**
 * REFRESH TOKEN SYSTEM
 * Provides secure token refresh without exposing long-lived tokens
 */

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// In-memory store (use Redis in production)
const refreshTokenStore = new Map();

const mongo_url = process.env.MONGO_URL;
let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(mongo_url);
  }
  await client.connect();
}

/**
 * Generate access and refresh tokens
 */
export const generateTokens = (userId) => {
  // Short-lived access token (15 minutes)
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  // Long-lived refresh token (7 days)
  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + '_refresh',
    { expiresIn: '7d' }
  );

  // Store refresh token (in production, use Redis with TTL)
  const tokenFamily = crypto.randomBytes(16).toString('hex');
  refreshTokenStore.set(refreshToken, {
    userId: userId.toString(),
    family: tokenFamily,
    createdAt: Date.now()
  });

  return { accessToken, refreshToken };
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + '_refresh'
      );
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    // Check if token exists in store
    const storedToken = refreshTokenStore.get(refreshToken);
    if (!storedToken || storedToken.userId !== decoded.userId.toString()) {
      // Token reuse detected - possible attack
      console.warn('Refresh token reuse detected for user:', decoded.userId);
      
      // Invalidate all tokens for this user
      for (const [token, data] of refreshTokenStore.entries()) {
        if (data.userId === decoded.userId.toString()) {
          refreshTokenStore.delete(token);
        }
      }
      
      return res.status(401).json({
        success: false,
        message: 'Token reuse detected. Please login again.'
      });
    }

    // Generate new token pair
    const tokens = generateTokens(decoded.userId);

    // Invalidate old refresh token
    refreshTokenStore.delete(refreshToken);

    return res.status(200).json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });

  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to refresh token'
    });
  }
};

/**
 * Revoke refresh token (logout)
 */
export const revokeRefreshToken = (refreshToken) => {
  refreshTokenStore.delete(refreshToken);
};

/**
 * Clean up expired tokens (run periodically)
 */
export const cleanupExpiredTokens = () => {
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  for (const [token, data] of refreshTokenStore.entries()) {
    if (now - data.createdAt > sevenDays) {
      refreshTokenStore.delete(token);
    }
  }
};

// Clean up every hour
setInterval(cleanupExpiredTokens, 60 * 60 * 1000);
