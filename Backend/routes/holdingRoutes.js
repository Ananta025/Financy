import express from 'express';
import { 
    getUserHoldings, 
    getHoldingBySymbol, 
    updateHoldingPrices,
    getHoldingsStats
} from '../controllers/holdingController.js';

const router = express.Router();

// All routes now public - no auth
router.get('/', getUserHoldings);
router.get('/stats', getHoldingsStats);
router.get('/:symbol', getHoldingBySymbol);
router.put('/prices', updateHoldingPrices);

export default router;