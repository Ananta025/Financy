import mongoose from 'mongoose';

const holdingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    qty: {
        type: Number,
        required: true,
        min: 0
    },
    avgPrice: {
        type: Number,
        required: true,
        min: 0
    },
    currentPrice: {
        type: Number,
        required: true,
        min: 0
    },
    sector: {
        type: String,
        default: 'Others'
    },
    exchange: {
        type: String,
        default: 'NSE'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for efficient querying
holdingSchema.index({ userId: 1, symbol: 1 }, { unique: true });

// Virtual fields for calculations
holdingSchema.virtual('investedValue').get(function() {
    return this.qty * this.avgPrice;
});

holdingSchema.virtual('currentValue').get(function() {
    return this.qty * this.currentPrice;
});

holdingSchema.virtual('pnl').get(function() {
    return this.currentValue - this.investedValue;
});

holdingSchema.virtual('pnlPercent').get(function() {
    return ((this.currentPrice - this.avgPrice) / this.avgPrice) * 100;
});

// Ensure virtual fields are included in JSON
holdingSchema.set('toJSON', { virtuals: true });

const Holding = mongoose.model('Holding', holdingSchema);
export default Holding;