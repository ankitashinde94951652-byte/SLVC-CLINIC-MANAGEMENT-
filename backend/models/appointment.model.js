const db = require('../config/db');

exports.create = (data) => {
  return db.query(`
    INSERT INTO appo 
    (ptid, phone, doctor_id, app_time, status, reason, appotype)
    VALUES (?, ?, ?, ?, 'confirmed', ?, ?)
  `, data);
};

exports.getAll = () => {
  return db.query("SELECT * FROM appo ORDER BY appid DESC");
};

exports.getToday = () => {
  return db.query("SELECT * FROM appo WHERE DATE(app_time)=CURDATE()");
};

exports.updateStatus = (status, id) => {
  return db.query("UPDATE appo SET status=? WHERE appid=?", [status, id]);
};

exports.delete = (id) => {
  return db.query("DELETE FROM appo WHERE appid=?", [id]);
};