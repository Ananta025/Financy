import Holding from '../models/holdingModel.js';
import User from '../models/userModel.js'; // Import User model to ensure schema registration
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

// Get user's holdings
export const getUserHoldings = async (req, res) => {
    try {
        const userId = req.user.userId;

        console.log(`Fetching holdings for user ${userId}`);

        let holdings;
        try {
            holdings = await Holding.find({ userId })
                .sort({ currentValue: -1 })
                .populate('userId', 'name email');
            console.log(`Successfully fetched ${holdings.length} holdings with populated user info`);
        } catch (populateError) {
            console.warn('Failed to populate user info in holdings, fetching without population:', populateError.message);
            holdings = await Holding.find({ userId })
                .sort({ currentValue: -1 });
        }

        // Calculate portfolio summary
        const portfolioSummary = holdings.reduce((summary, holding) => {
            const investedValue = holding.qty * holding.avgPrice;
            const currentValue = holding.qty * holding.currentPrice;
            const pnl = currentValue - investedValue;

            return {
                totalInvested: summary.totalInvested + investedValue,
                totalInvestedValue: summary.totalInvested + investedValue, // Frontend expects this
                currentValue: summary.currentValue + currentValue,
                totalCurrentValue: summary.currentValue + currentValue, // Frontend expects this
                totalPnL: summary.totalPnL + pnl,
                totalPnLPercent: summary.totalInvested > 0 ? 
                    (((summary.currentValue + currentValue) - (summary.totalInvested + investedValue)) / (summary.totalInvested + investedValue)) * 100 : 0,
                totalHoldings: summary.totalHoldings + 1
            };
        }, {
            totalInvested: 0,
            totalInvestedValue: 0, // Frontend expects this
            currentValue: 0,
            totalCurrentValue: 0, // Frontend expects this
            totalPnL: 0,
            totalPnLPercent: 0, // Frontend expects this
            totalHoldings: 0
        });

        // Transform holdings data to match frontend expectations
        const transformedHoldings = holdings.map(holding => ({
            _id: holding._id,
            stock: holding.symbol, // Frontend expects 'stock'
            symbol: holding.symbol,
            name: holding.name,
            quantity: holding.qty, // Frontend expects 'quantity'
            qty: holding.qty,
            avgPrice: holding.avgPrice,
            currentPrice: holding.currentPrice,
            sector: holding.sector,
            exchange: holding.exchange,
            lastUpdated: holding.lastUpdated,
            investedValue: holding.investedValue,
            currentValue: holding.currentValue,
            pnl: holding.pnl,
            pnlPercent: holding.pnlPercent,
            dayChange: 0, // Mock day change for now
            createdAt: holding.createdAt,
            updatedAt: holding.updatedAt
        }));

        return res.status(httpStatus.OK).json({
            success: true,
            holdings: transformedHoldings,
            portfolioSummary
        });

    } catch (error) {
        console.error('Error fetching holdings:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get a specific holding
export const getHoldingBySymbol = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { symbol } = req.params;

        console.log(`Fetching holding for user ${userId}, symbol ${symbol}`);

        let holding;
        try {
            holding = await Holding.findOne({ userId, symbol })
                .populate('userId', 'name email');
            console.log('Successfully fetched holding with populated user info');
        } catch (populateError) {
            console.warn('Failed to populate user info in holding, fetching without population:', populateError.message);
            holding = await Holding.findOne({ userId, symbol });
        }

        if (!holding) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Holding not found'
            });
        }

        // Transform holding data to match frontend expectations
        const transformedHolding = {
            _id: holding._id,
            stock: holding.symbol, // Frontend expects 'stock'
            symbol: holding.symbol,
            name: holding.name,
            quantity: holding.qty, // Frontend expects 'quantity'
            qty: holding.qty,
            avgPrice: holding.avgPrice,
            currentPrice: holding.currentPrice,
            sector: holding.sector,
            exchange: holding.exchange,
            lastUpdated: holding.lastUpdated,
            investedValue: holding.investedValue,
            currentValue: holding.currentValue,
            pnl: holding.pnl,
            pnlPercent: holding.pnlPercent,
            dayChange: 0, // Mock day change for now
            createdAt: holding.createdAt,
            updatedAt: holding.updatedAt
        };

        return res.status(httpStatus.OK).json({
            success: true,
            holding: transformedHolding
        });

    } catch (error) {
        console.error('Error fetching holding:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update holding (usually called internally when orders are executed)
export const updateOrCreateHolding = async (userId, orderData, session = null) => {
    try {
        const { stock, type, quantity, price } = orderData;
        
        // Find existing holding
        let holding = await Holding.findOne({ 
            userId, 
            symbol: stock 
        }).session(session);

        if (type === 'Buy') {
            if (holding) {
                // Update existing holding
                const newQty = holding.qty + quantity;
                const newAvgPrice = ((holding.qty * holding.avgPrice) + (quantity * price)) / newQty;
                
                holding.qty = newQty;
                holding.avgPrice = newAvgPrice;
                holding.currentPrice = price;
                holding.lastUpdated = new Date();
                
                await holding.save({ session });
            } else {
                // Create new holding
                holding = new Holding({
                    userId,
                    name: stock, // In real app, this would be fetched from stock info
                    symbol: stock,
                    qty: quantity,
                    avgPrice: price,
                    currentPrice: price,
                    sector: 'Others', // Would be fetched from stock info
                    exchange: 'NSE'
                });
                
                await holding.save({ session });
            }
        } else { // Sell
            if (holding && holding.qty >= quantity) {
                holding.qty -= quantity;
                holding.currentPrice = price;
                holding.lastUpdated = new Date();
                
                if (holding.qty === 0) {
                    // Remove holding if quantity becomes 0
                    await Holding.deleteOne({ _id: holding._id }, { session });
                    holding = null;
                } else {
                    await holding.save({ session });
                }
            } else {
                throw new Error(`Insufficient holdings. Available: ${holding?.qty || 0}, Required: ${quantity}`);
            }
        }

        return holding;
    } catch (error) {
        throw error;
    }
};

// Update current prices (for market data updates)
export const updateHoldingPrices = async (req, res) => {
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
            Holding.updateOne(
                { userId, symbol },
                { 
                    currentPrice: price, 
                    lastUpdated: new Date() 
                }
            )
        );

        await Promise.all(updatePromises);

        return res.status(httpStatus.OK).json({
            success: true,
            message: 'Holdings prices updated successfully',
            updatedCount: priceUpdates.length
        });

    } catch (error) {
        console.error('Error updating holding prices:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get holdings statistics
export const getHoldingsStats = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const stats = await Holding.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: null,
                    totalHoldings: { $sum: 1 },
                    totalQuantity: { $sum: '$qty' },
                    totalInvested: { 
                        $sum: { 
                            $multiply: ['$qty', '$avgPrice'] 
                        } 
                    },
                    totalCurrentValue: { 
                        $sum: { 
                            $multiply: ['$qty', '$currentPrice'] 
                        } 
                    }
                }
            },
            {
                $addFields: {
                    totalPnL: { 
                        $subtract: ['$totalCurrentValue', '$totalInvested'] 
                    },
                    pnlPercent: {
                        $multiply: [
                            { $divide: [
                                { $subtract: ['$totalCurrentValue', '$totalInvested'] },
                                '$totalInvested'
                            ]},
                            100
                        ]
                    }
                }
            }
        ]);

        const result = stats.length > 0 ? stats[0] : {
            totalHoldings: 0,
            totalQuantity: 0,
            totalInvested: 0,
            totalCurrentValue: 0,
            totalPnL: 0,
            pnlPercent: 0
        };

        // Add frontend-expected property names
        result.totalInvestedValue = result.totalInvested;
        result.totalPnLPercent = result.pnlPercent;

        return res.status(httpStatus.OK).json({
            success: true,
            stats: result
        });

    } catch (error) {
        console.error('Error fetching holdings stats:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};