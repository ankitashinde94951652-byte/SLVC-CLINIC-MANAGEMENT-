// services/twilio.service.js
require('dotenv').config();
const twilio = require('twilio');
const db = require('../config/db');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ---------- Send SMS ----------
async function sendSMS(to, message) {
  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio number (must be used for trial accounts)
      to: to
    });

    // Log SMS in DB
    await db.query(
      "INSERT INTO sms_logs (phone, message, status, sid) VALUES (?, ?, ?, ?)",
      [to, message, 'sent', sms.sid]
    );

    return sms;
  } catch (err) {
    await db.query(
      "INSERT INTO sms_logs (phone, message, status) VALUES (?, ?, ?)",
      [to, message, 'failed']
    );
    throw err;
  }
}

// ---------- Send WhatsApp ----------
async function sendWhatsApp(to, message) {
  try {
    const whatsapp = await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_FROM, // Twilio WhatsApp sandbox number
      to: `whatsapp:${to}`
    });

    return whatsapp;
  } catch (err) {
    throw err;
  }
}

module.exports = { sendSMS, sendWhatsApp };