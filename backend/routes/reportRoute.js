const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { uploadReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

// Accept any file under any field name
router.post(
  '/upload',
  protect,
  upload.any(),
  uploadReport
);

module.exports = router;