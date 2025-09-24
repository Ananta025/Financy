import express from 'express';
import { 
    getUserPositions, 
    getPositionById, 
    exitPosition,
    updatePositionPrices,
    getPositionsStats
} from '../controllers/positionController.js';
import { validateExitPosition } from '../middleware/validators.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All position routes require authentication
router.use(auth);

// Get user's positions
router.get('/', getUserPositions);

// Get positions statistics
router.get('/stats', getPositionsStats);

// Get specific position by ID
router.get('/:id', getPositionById);

// Exit position
router.post('/:id/exit', validateExitPosition, exitPosition);

// Update position prices (for market data)
router.put('/prices', updatePositionPrices);

export default router;