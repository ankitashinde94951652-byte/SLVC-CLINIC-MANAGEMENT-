require('dotenv').config();
const twilio = require('twilio');
console.log("TWILIO SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("TWILIO SMS FROM:", process.env.TWILIO_PHONE_NUMBER);
console.log("TWILIO WA FROM:", process.env.TWILIO_WHATSAPP_FROM);

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ---------- Send SMS ----------
async function sendSMS(to, message) {
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to
  });
}

// ---------- Send WhatsApp ----------
async function sendWhatsApp(to, message) {
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: `whatsapp:${to}`
  });
}

module.exports = { sendSMS, sendWhatsApp };
