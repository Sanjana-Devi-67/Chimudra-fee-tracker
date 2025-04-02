const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const { ensureAdmin } = require('../middleware/authMiddleware');
// Admin Dashboard Page
router.get('/dashboard', ensureAdmin, adminController.getDashboard);

// Fetch All Batches
router.get('/batches', ensureAdmin, adminController.getBatches);

// Fetch All Students
router.get('/students', ensureAdmin, adminController.getStudents);

// Fetch All Payments
router.get('/payments', ensureAdmin, adminController.getPaymentStatus);

// Notification route
router.get('/paymentStatus', adminController.getPaymentStatus);
router.post('/notify/:id', adminController.sendNotification);


module.exports = router;
