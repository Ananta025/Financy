import express from 'express';
import { 
  getAllUsers, 
  signUp, 
  signIn, 
  getUserProfile, 
  updateUserProfile,
  deleteUserProfile,
  validateToken
} from '../controllers/userController.js';
import { validateSignup, validateSignin } from '../middleware/validators.js';
import auth from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// SECURITY: Admin-only endpoint - should be protected
router.get('/all', auth, getAllUsers);

// SECURITY: Apply strict rate limiting to auth endpoints
router.post('/signup', authLimiter, validateSignup, signUp);
router.post('/signin', authLimiter, validateSignin, signIn);

router.get('/profile/:id', auth, getUserProfile);
router.put('/profile/:id', auth, updateUserProfile);
router.delete('/profile/:id', auth, deleteUserProfile);
router.get('/validate-token', auth, validateToken);

export default router;