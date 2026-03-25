const cron = require('node-cron');
const db = require('../config/db');
const { sendSMS, sendWhatsApp } = require('../services/twilio.service');
const { messages } = require('../services/messageTemplates');

cron.schedule('* * * * *', async () => {

console.log("⏰ Running reminder cron job...");

try{

const [rows] = await db.query(`
SELECT appid, phone, app_time, reminder_5h, reminder_1h
FROM appo
WHERE status='Confirmed'
AND app_time > NOW()
`);

for(const row of rows){

const now = new Date();
const appTime = new Date(row.app_time);

const diffMinutes = Math.floor((appTime - now) / 60000);

const date = appTime.toDateString();
const time = appTime.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });

const msg = messages.reminder(date,time,"📞 +91-XXXXXXXXXX");


// 5 HOURS

if(diffMinutes <=300 && diffMinutes>295 && row.reminder_5h==0){

await sendSMS(row.phone,msg);
await sendWhatsApp(row.phone,msg);

await db.query(
"UPDATE appo SET reminder_5h=1 WHERE appid=?",
[row.appid]
);

console.log("✅ 5h Reminder sent:",row.phone);

}


// 1 HOUR

if(diffMinutes <=60 && diffMinutes>55 && row.reminder_1h==0){

await sendSMS(row.phone,msg);
await sendWhatsApp(row.phone,msg);

await db.query(
"UPDATE appo SET reminder_1h=1 WHERE appid=?",
[row.appid]
);

console.log("✅ 1h Reminder sent:",row.phone);

}

}

}catch(err){

console.error("❌ Reminder Error:",err.message);

}

});