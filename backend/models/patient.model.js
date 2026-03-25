const db = require('../config/db');

exports.create = (data) => {
  return db.query("INSERT INTO patient SET ?", data);
};

exports.getAll = () => {
  return db.query("SELECT * FROM patient ORDER BY ptid DESC");
};

exports.getById = (id) => {
  return db.query("SELECT * FROM patient WHERE ptid=?", [id]);
};

exports.update = (id, data) => {
  return db.query("UPDATE patient SET ? WHERE ptid=?", [data, id]);
};

exports.delete = (id) => {
  return db.query("DELETE FROM patient WHERE ptid=?", [id]);
};