const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const User = require('../models/user');

// Fetch payment history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.render('pages/paymentHistory', {  session: req.session, userId: req.session.userId,payments });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
