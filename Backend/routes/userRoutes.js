import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);




export default router;