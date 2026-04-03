// require('dotenv').config();  // MUST be first
// console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
// console.log("AUTH:", process.env.TWILIO_AUTH_TOKEN);

// const twilio = require('twilio');
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const toNumber = "+918976569909";

// client.messages
//   .create({
//     body: "Test SMS from Clinic App",
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: toNumber
//   })
//   .then(msg => console.log("SMS Sent! SID:", msg.sid))
//   .catch(err => console.error("SMS Error:", err));


//   async function sendSms(to, body) {
//   try {
//     const sms = await client.messages.create({
//       body,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//     });

//     await db.query(
//       "INSERT INTO sms_logs (phone, message, status, sid) VALUES (?, ?, ?, ?)",
//       [to, body, 'sent', sms.sid]
//     );

//     return sms;

//   } catch (err) {
//     await db.query(
//       "INSERT INTO sms_logs (phone, message, status) VALUES (?, ?, ?)",
//       [to, body, 'failed']
//     );

//     throw err;
//   }
// }
