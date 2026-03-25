const express = require('express');
const router = express.Router();
const smsController = require('../controllers/smsController');
const { protect } = require('../middleware/authMiddleware');

// SMS logs sensitive ahet, mhanun protect add kela ahe
router.get('/logs', protect, smsController.getSmsLogs);

module.exports = router;