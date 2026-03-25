const db = require('../config/db');

exports.getSmsLogs = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM sms_logs ORDER BY id DESC");
  res.json(rows);
};