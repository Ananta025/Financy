import Position from '../models/positionModel.js';
import User from '../models/userModel.js'; // Import User model to ensure schema registration
import Order from '../models/orderModel.js'; // Import Order model for references
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

// Get user's positions
export const getUserPositions = async (req, res) => {
    try {
        const userId = req.user.userId;
        const status = req.query.status || 'Open';

        console.log(`Fetching positions for user ${userId}, status ${status}`);

        let positions;
        try {
            positions = await Position.find({ userId, status })
                .sort({ createdAt: -1 })
                .populate('userId', 'name email')
                .populate('orderId');
            console.log(`Successfully fetched ${positions.length} positions with populated info`);
        } catch (populateError) {
            console.warn('Failed to populate position info, fetching without population:', populateError.message);
            positions = await Position.find({ userId, status })
                .sort({ createdAt: -1 });
        }

        return res.status(httpStatus.OK).json({
            success: true,
            positions
        });

    } catch (error) {
        console.error('Error fetching positions:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get a specific position
export const getPositionById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const positionId = req.params.id;

        console.log(`Fetching position ${positionId} for user ${userId}`);

        let position;
        try {
            position = await Position.findOne({ _id: positionId, userId })
                .populate('userId', 'name email')
                .populate('orderId');
            console.log('Successfully fetched position with populated info');
        } catch (populateError) {
            console.warn('Failed to populate position info, fetching without population:', populateError.message);
            position = await Position.findOne({ _id: positionId, userId });
        }

        if (!position) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Position not found'
            });
        }

        return res.status(httpStatus.OK).json({
            success: true,
            position
        });

    } catch (error) {
        console.error('Error fetching position:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Create position (usually called internally when orders are executed)
export const createPosition = async (userId, orderData, session = null) => {
    try {
        const { stock, type, quantity, price, orderType, orderId } = orderData;
        
        const position = new Position({
            userId,
            orderId,
            name: stock,
            symbol: stock,
            type,
            product: orderType === 'market' ? 'MIS' : 'CNC', // Simplified logic
            qty: quantity,
            entryPrice: price,
            currentPrice: price,
            status: 'Open',
            sector: 'Others', // Would be fetched from stock info
            exchange: 'NSE'
        });

        await position.save({ session });
        return position;
    } catch (error) {
        throw error;
    }
};

// Exit position
export const exitPosition = async (req, res) => {
    try {
        const userId = req.user.userId;
        const positionId = req.params.id;
        const { quantity, exitPrice, orderType = 'market' } = req.body;

        // Find the position
        const position = await Position.findOne({ 
            _id: positionId, 
            userId, 
            status: 'Open' 
        });

        if (!position) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Open position not found'
            });
        }

        // Validate exit quantity
        if (quantity > position.qty) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Exit quantity cannot exceed position quantity'
            });
        }

        // Use current price if not provided
        const actualExitPrice = exitPrice || position.currentPrice;

        if (quantity === position.qty) {
            // Close entire position
            position.status = 'Closed';
            position.exitPrice = actualExitPrice;
            position.exitDate = new Date();
            await position.save();
        } else {
            // Partial exit - reduce quantity
            position.qty -= quantity;
            await position.save();

            // Create a new closed position for the exited portion
            const exitedPosition = new Position({
                userId,
                orderId: position.orderId,
                name: position.name,
                symbol: position.symbol,
                type: position.type,
                product: position.product,
                qty: quantity,
                entryPrice: position.entryPrice,
                currentPrice: actualExitPrice,
                status: 'Closed',
                sector: position.sector,
                exchange: position.exchange,
                exitPrice: actualExitPrice,
                exitDate: new Date()
            });

            await exitedPosition.save();
        }

        return res.status(httpStatus.OK).json({
            success: true,
            message: 'Position exited successfully',
            position
        });

    } catch (error) {
        console.error('Error exiting position:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update position prices (for market data updates)
export const updatePositionPrices = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { priceUpdates } = req.body; // Array of { symbol, price }

        if (!Array.isArray(priceUpdates)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Price updates should be an array'
            });
        }

        const updatePromises = priceUpdates.map(({ symbol, price }) => 
            Position.updateMany(
                { userId, symbol, status: 'Open' },
                { currentPrice: price }
            )
        );

        await Promise.all(updatePromises);

        return res.status(httpStatus.OK).json({
            success: true,
            message: 'Position prices updated successfully'
        });

    } catch (error) {
        console.error('Error updating position prices:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get positions statistics
export const getPositionsStats = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const stats = await Position.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalPnL: {
                        $sum: {
                            $cond: [
                                { $eq: ['$type', 'Buy'] },
                                { $multiply: [
                                    { $subtract: ['$currentPrice', '$entryPrice'] },
                                    '$qty'
                                ]},
                                { $multiply: [
                                    { $subtract: ['$entryPrice', '$currentPrice'] },
                                    '$qty'
                                ]}
                            ]
                        }
                    }
                }
            }
        ]);

        const result = {
            openPositions: 0,
            closedPositions: 0,
            totalOpenPnL: 0,
            totalClosedPnL: 0
        };

        stats.forEach(stat => {
            if (stat._id === 'Open') {
                result.openPositions = stat.count;
                result.totalOpenPnL = stat.totalPnL;
            } else if (stat._id === 'Closed') {
                result.closedPositions = stat.count;
                result.totalClosedPnL = stat.totalPnL;
            }
        });

        return res.status(httpStatus.OK).json({
            success: true,
            stats: result
        });

    } catch (error) {
        console.error('Error fetching positions stats:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};