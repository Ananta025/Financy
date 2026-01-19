import express from 'express';
import { 
    createOrder, 
    getUserOrders, 
    getOrderById, 
    updateOrderStatus,
    getOrderStats
} from '../controllers/orderController.js';
import { validateOrder } from '../middleware/validators.js';

const router = express.Router();

// All routes now public - no auth
router.post('/create', validateOrder, createOrder);
router.get('/', getUserOrders);
router.get('/stats', getOrderStats);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

export default router;