import Order from '../models/orderModel.js';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({ 
                success: false,
                message: 'Validation errors',
                errors: errors.array() 
            });
        }

        const userId = req.user.userId; // From auth middleware
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

        const savedOrder = await newOrder.save();
        
        // Populate user info if needed
        await savedOrder.populate('userId', 'name email');

        return res.status(httpStatus.CREATED).json({
            success: true,
            message: 'Order created successfully',
            order: savedOrder
        });

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get user's recent orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // From auth middleware
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get orders for the authenticated user, sorted by creation date (newest first)
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'name email');

        // Get total count for pagination
        const totalOrders = await Order.countDocuments({ userId });

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