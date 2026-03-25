const express = require('express');
const router = express.Router();
const { sendWhatsApp } = require('../services/twilio.service');
const { protect } = require('../middleware/authMiddleware');

router.post('/send', protect, async (req, res) => {
  try {
    const { number, message } = req.body;
    if (!number || !message) return res.status(400).json({ success:false, message:"number & message required" });

    await sendWhatsApp(number, message);
    res.json({ success:true, message:"Clinic message sent" });
  } catch (error) {
    res.status(500).json({ success:false, message: error.message });
  }
});

module.exports = router;