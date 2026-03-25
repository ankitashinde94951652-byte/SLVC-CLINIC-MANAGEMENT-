const express = require('express');
const router = express.Router();

const { protect, role } = require('../middleware/authMiddleware');
const {
  dashboardStats,
  getRevenue
} = require('../controllers/analyticsController');

// Admin dashboard stats
router.get(
  '/admin',
  protect,
  role('admin'),
  dashboardStats
);

// Revenue dashboard
router.get(
  '/revenue',
  protect,
  role('admin'),
  getRevenue
);

module.exports = router;