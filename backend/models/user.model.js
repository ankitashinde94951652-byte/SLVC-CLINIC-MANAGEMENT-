const db = require('../config/db');

exports.findByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email=?", [email]);
};

exports.create = (data) => {
  return db.query(
    "INSERT INTO users (name,email,password,role,phone) VALUES (?,?,?,?,?)",
    data
  );
};

exports.getAll = () => {
  return db.query("SELECT * FROM users");
};