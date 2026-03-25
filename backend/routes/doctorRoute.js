const express = require('express');
const router = express.Router();
const { getDoctorDashboard } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getDoctorDashboard);

module.exports = router;