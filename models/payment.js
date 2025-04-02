const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    status: { type: String, enum: ['Success', 'Pending', 'Failed'], default: 'Pending' },
   
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

