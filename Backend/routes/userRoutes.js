import express from 'express';
import { 
  getAllUsers, 
  getUserProfile, 
  updateUserProfile,
  deleteUserProfile
} from '../controllers/userController.js';

const router = express.Router();

// All routes now public - no auth middleware
router.get('/all', getAllUsers);
router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', updateUserProfile);
router.delete('/profile/:id', deleteUserProfile);

export default router;