import express from 'express';
import { 
    createOrder, 
    getUserOrders, 
    getOrderById, 
    updateOrderStatus,
    getOrderStats
} from '../controllers/orderController.js';
import { validateOrder } from '../middleware/validators.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(auth);

// Create a new order
router.post('/create', validateOrder, createOrder);

// Get user's orders with pagination
router.get('/', getUserOrders);

// Get order statistics for the user
router.get('/stats', getOrderStats);

// Get a specific order by ID
router.get('/:id', getOrderById);

// Update order status
router.put('/:id/status', updateOrderStatus);

export default router;