import express from 'express';
import { 
    getUserHoldings, 
    getHoldingBySymbol, 
    updateHoldingPrices,
    getHoldingsStats
} from '../controllers/holdingController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All holding routes require authentication
router.use(auth);

// Get user's holdings
router.get('/', getUserHoldings);

// Get holdings statistics
router.get('/stats', getHoldingsStats);

// Get specific holding by symbol
router.get('/:symbol', getHoldingBySymbol);

// Update holding prices (for market data)
router.put('/prices', updateHoldingPrices);

export default router;