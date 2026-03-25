const express = require("express");
const router = express.Router();
const { sendSMS, sendWhatsApp } = require("../services/twilio.service");

router.get("/test-message", async (req, res) => {
  try {
    const phone = "+91XXXXXXXXXX"; // Tumcha number

    await sendSMS(phone, "✅ SMS test successful!");
    await sendWhatsApp(phone, "✅ WhatsApp test successful!");

    res.json({ success: true, message: "Messages sent" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;