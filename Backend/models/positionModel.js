import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Buy', 'Sell'],
        required: true
    },
    product: {
        type: String,
        enum: ['MIS', 'CNC', 'NRML'],
        default: 'CNC'
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    },
    entryPrice: {
        type: Number,
        required: true,
        min: 0
    },
    currentPrice: {
        type: Number,
        required: true,
        min: 0
    },
    stopLoss: {
        type: Number,
        min: 0
    },
    target: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ['Open', 'Closed', 'PartiallyFilled'],
        default: 'Open'
    },
    sector: {
        type: String,
        default: 'Others'
    },
    exchange: {
        type: String,
        default: 'NSE'
    },
    exitPrice: {
        type: Number,
        min: 0
    },
    exitDate: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for efficient querying
positionSchema.index({ userId: 1, status: 1 });
positionSchema.index({ userId: 1, symbol: 1 });

// Virtual fields for calculations
positionSchema.virtual('investedValue').get(function() {
    return this.qty * this.entryPrice;
});

positionSchema.virtual('currentValue').get(function() {
    return this.qty * this.currentPrice;
});

positionSchema.virtual('pnl').get(function() {
    if (this.type === 'Buy') {
        return (this.currentPrice - this.entryPrice) * this.qty;
    } else {
        return (this.entryPrice - this.currentPrice) * this.qty;
    }
});

positionSchema.virtual('pnlPercent').get(function() {
    if (this.type === 'Buy') {
        return ((this.currentPrice - this.entryPrice) / this.entryPrice) * 100;
    } else {
        return ((this.entryPrice - this.currentPrice) / this.entryPrice) * 100;
    }
});

positionSchema.virtual('isProfit').get(function() {
    return this.pnl >= 0;
});

// Ensure virtual fields are included in JSON
positionSchema.set('toJSON', { virtuals: true });

const Position = mongoose.model('Position', positionSchema);
export default Position;