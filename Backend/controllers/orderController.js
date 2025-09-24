import Order from '../models/orderModel.js';
import User from '../models/userModel.js'; // Import User model to ensure schema registration
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { updateOrCreateHolding } from './holdingController.js';
import { createPosition } from './positionController.js';

// Create a new order with atomic holdings/positions update
export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();
    let transactionCommitted = false;
    let transactionStarted = false;
    
    try {
        // Start transaction
        await session.startTransaction();
        transactionStarted = true;
        console.log('Transaction started successfully');
        
        // Add comprehensive logging for debugging
        console.log('=== ORDER CREATION DEBUG ===');
        console.log('Request Headers:', req.headers);
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
        console.log('User from token:', req.user);
        console.log('Body keys:', Object.keys(req.body));
        console.log('Body types:', Object.keys(req.body).reduce((acc, key) => {
            acc[key] = typeof req.body[key];
            return acc;
        }, {}));
        
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            // Don't abort here, let it be handled in the catch block
            throw new Error(`Validation failed: ${errors.array().map(e => e.msg).join(', ')}`);
        }

        const userId = req.user.userId;
        const {
            stock,
            type,
            quantity,
            price,
            orderType,
            limitPrice,
            triggerPrice,
            total
        } = req.body;

        console.log('Creating order with data:', { userId, stock, type, quantity, price, total });

        // Create new order
        const newOrder = new Order({
            userId,
            stock,
            type,
            quantity,
            price,
            orderType: orderType || 'market',
            limitPrice: orderType !== 'market' ? limitPrice : undefined,
            triggerPrice: orderType === 'sl' ? triggerPrice : undefined,
            total,
            status: 'Completed' // For demo purposes, marking as completed immediately
        });

        console.log('Saving order to database...');
        const savedOrder = await newOrder.save({ session });
        console.log('Order saved successfully:', savedOrder._id);

        // Update holdings based on order
        console.log('Updating holdings...');
        const holding = await updateOrCreateHolding(userId, {
            stock,
            type,
            quantity,
            price
        }, session);
        console.log('Holdings updated successfully');

        // Create position for intraday orders (simplified logic)
        let position = null;
        if (orderType === 'market' || type === 'Sell') {
            console.log('Creating position...');
            position = await createPosition(userId, {
                stock,
                type,
                quantity,
                price,
                orderType,
                orderId: savedOrder._id
            }, session);
            console.log('Position created successfully');
        }

        // Commit transaction
        console.log('Committing transaction...');
        await session.commitTransaction();
        transactionCommitted = true;
        console.log('Transaction committed successfully');

        console.log('Order creation completed successfully');
        
        // Prepare response data (populate outside of transaction)
        let populatedOrder;
        try {
            console.log('Populating user info...');
            populatedOrder = await Order.findById(savedOrder._id).populate('userId', 'name email');
            console.log('User info populated successfully');
        } catch (populateError) {
            console.warn('Failed to populate user info, using original order:', populateError.message);
            populatedOrder = savedOrder;
        }

        return res.status(httpStatus.CREATED).json({
            success: true,
            message: 'Order executed successfully',
            order: populatedOrder,
            holding,
            position
        });

    } catch (error) {
        console.error('Error during order creation:', error);
        
        // Only abort transaction if it was started and not committed
        if (transactionStarted && !transactionCommitted) {
            try {
                console.log('Aborting transaction due to error...');
                await session.abortTransaction();
                console.log('Transaction aborted successfully');
            } catch (abortError) {
                console.error('Error aborting transaction:', abortError);
            }
        }
        
        // Handle specific business logic errors
        if (error.message && error.message.includes('Insufficient holdings')) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message
            });
        }
        
        // Handle validation errors
        if (error.message && error.message.includes('Validation failed')) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Validation errors',
                error: error.message,
                receivedData: req.body
            });
        }
        
        // Generic error response
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        // Always end the session
        try {
            console.log('Ending database session...');
            await session.endSession();
            console.log('Database session ended successfully');
        } catch (sessionError) {
            console.error('Error ending session:', sessionError);
        }
    }
};

// Get user's recent orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // From auth middleware
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        console.log(`Fetching orders for user ${userId}, page ${page}, limit ${limit}`);

        // Get orders for the authenticated user, sorted by creation date (newest first)
        let orders;
        try {
            orders = await Order.find({ userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('userId', 'name email');
            console.log(`Successfully fetched ${orders.length} orders with populated user info`);
        } catch (populateError) {
            console.warn('Failed to populate user info, fetching orders without population:', populateError.message);
            orders = await Order.find({ userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
        }

        // Get total count for pagination
        const totalOrders = await Order.countDocuments({ userId });

        console.log(`Total orders for user: ${totalOrders}`);

        return res.status(httpStatus.OK).json({
            success: true,
            orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalOrders / limit),
                totalOrders,
                hasNext: page < Math.ceil(totalOrders / limit),
                hasPrev: page > 1
            }
        });

    } catch (error) {
        console.error('Error fetching user orders:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get a specific order by ID (for the authenticated user)
export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orderId = req.params.id;

        const order = await Order.findOne({ _id: orderId, userId })
            .populate('userId', 'name email');

        if (!order) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Order not found'
            });
        }

        return res.status(httpStatus.OK).json({
            success: true,
            order
        });

    } catch (error) {
        console.error('Error fetching order:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update order status (for future use)
export const updateOrderStatus = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orderId = req.params.id;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Completed', 'Cancelled', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const order = await Order.findOneAndUpdate(
            { _id: orderId, userId },
            { status, updatedAt: new Date() },
            { new: true }
        ).populate('userId', 'name email');

        if (!order) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Order not found'
            });
        }

        return res.status(httpStatus.OK).json({
            success: true,
            message: 'Order status updated successfully',
            order
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get order statistics for the user (for dashboard)
export const getOrderStats = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const stats = await Order.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalBuyOrders: { $sum: { $cond: [{ $eq: ['$type', 'Buy'] }, 1, 0] } },
                    totalSellOrders: { $sum: { $cond: [{ $eq: ['$type', 'Sell'] }, 1, 0] } },
                    totalValue: { $sum: '$total' },
                    completedOrders: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
                    pendingOrders: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } }
                }
            }
        ]);

        const result = stats.length > 0 ? stats[0] : {
            totalOrders: 0,
            totalBuyOrders: 0,
            totalSellOrders: 0,
            totalValue: 0,
            completedOrders: 0,
            pendingOrders: 0
        };

        return res.status(httpStatus.OK).json({
            success: true,
            stats: result
        });

    } catch (error) {
        console.error('Error fetching order stats:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};