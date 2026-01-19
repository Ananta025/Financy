import express from 'express';
import { 
    getUserPositions, 
    getPositionById, 
    exitPosition,
    updatePositionPrices,
    getPositionsStats
} from '../controllers/positionController.js';
import { validateExitPosition } from '../middleware/validators.js';

const router = express.Router();

// All routes now public - no auth
router.get('/', getUserPositions);
router.get('/stats', getPositionsStats);
router.get('/:id', getPositionById);
router.post('/:id/exit', validateExitPosition, exitPosition);
router.put('/prices', updatePositionPrices);

export default router;