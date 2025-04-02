const Payment = require("../models/payment");

// @desc: Get logged-in user's payment history
exports.getUserPaymentHistory = async (req, res) => {
    try {
        const userId = req.session.userId; // or req.user._id if using JWT

        const payments = await Payment.find({ user: userId }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: payments.length,
            payments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

