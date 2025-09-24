import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This should match the model name in userModel.js
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Buy', 'Sell'],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    orderType: {
        type: String,
        enum: ['market', 'limit', 'sl'],
        default: 'market'
    },
    limitPrice: {
        type: Number,
        required: function() {
            return this.orderType === 'limit' || this.orderType === 'sl';
        }
    },
    triggerPrice: {
        type: Number,
        required: function() {
            return this.orderType === 'sl';
        }
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled', 'Rejected'],
        default: 'Completed' // For simplicity, we'll mark orders as completed by default
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add index for efficient querying by user and date
orderSchema.index({ userId: 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;