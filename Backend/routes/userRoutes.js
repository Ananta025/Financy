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

const router = express.Router();

router.get('/all', getAllUsers);
router.post('/signup', validateSignup, signUp);
router.post('/signin', validateSignin, signIn);
router.get('/profile/:id', auth, getUserProfile);
router.put('/profile/:id', auth, updateUserProfile);
router.delete('/profile/:id', auth, deleteUserProfile);
router.get('/validate-token', auth, validateToken);

export default router;