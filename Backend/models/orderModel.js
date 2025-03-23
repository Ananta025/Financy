import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: String,
    qty : Number,
    price : Number,
    mode : String,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;