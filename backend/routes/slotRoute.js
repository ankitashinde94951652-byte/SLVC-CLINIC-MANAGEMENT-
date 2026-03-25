const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const { protect } = require('../middleware/authMiddleware');

// 'role' kadhun takla ahe, aata sagle logged-in users slots create karu shaktil
router.post('/create', protect, slotController.createSlot);
router.get('/available', protect, slotController.getAvailableSlots);

// Public query asel tar 'protect' kadhu shakta
router.get('/generate', slotController.generateSlots);

module.exports = router;