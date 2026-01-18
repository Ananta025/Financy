import express from 'express';
import { GoogleGenAI } from "@google/genai";
import auth from '../middleware/auth.js';
import httpStatus from 'http-status';

const router = express.Router();

// Rate limiting for chatbot (prevent abuse)
const chatbotRateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

const checkRateLimit = (userId) => {
  const now = Date.now();
  const userRequests = chatbotRateLimitStore.get(userId) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  recentRequests.push(now);
  chatbotRateLimitStore.set(userId, recentRequests);
  return true;
};

/**
 * POST /chatbot/message
 * Send message to AI chatbot (authenticated)
 */
router.post('/message', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Message is required and must be a string'
      });
    }

    // Check message length (prevent abuse)
    if (message.length > 1000) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Message too long (max 1000 characters)'
      });
    }

    // Rate limiting
    if (!checkRateLimit(userId)) {
      return res.status(httpStatus.TOO_MANY_REQUESTS).json({
        success: false,
        message: 'Too many requests. Please wait before sending more messages.'
      });
    }

    // Get API key from environment (NEVER expose to frontend)
    const API_KEY = process.env.GOOGLE_API_KEY;
    
    if (!API_KEY) {
      console.error('GOOGLE_API_KEY not configured');
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Chatbot service is currently unavailable'
      });
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
      config: {
        systemInstruction: `🧠 FinancY Chatbot System Instruction
          🗣️ Tone & Behavior
          Always stay friendly, informative, and calm.
          Use short, content-rich answers. Don't over-explain.
          Never respond with violent, harmful, or judgmental language.
          
          💡 Common User Questions & Rich, Friendly Answers
          - How to invest in FinancY
          - How to buy/sell stocks
          - Check investments (Holdings/Positions)
          - Update bank account
          - Forgot password
          
          🛡️ Safety: Reject harmful/inappropriate prompts politely.`,
      },
    });

    const responseText = result.text;

    if (!responseText) {
      throw new Error("Empty response from AI service");
    }

    return res.status(httpStatus.OK).json({
      success: true,
      message: responseText
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to process chatbot request'
    });
  }
});

export default router;
