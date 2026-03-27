const mysql = require("mysql2/promise");
require("dotenv").config();

// Railway provides MYSQL_URL which contains host, user, password, and db name in one string
const pool = mysql.createPool(process.env.MYSQL_URL || {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "slvc_clinic_new",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Test the connection immediately
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ DATABASE CONNECTED SUCCESSFULLY TO RAILWAY");
    conn.release();
  } catch (err) {
    console.error("❌ DB CONNECTION ERROR:", err.message);
  }
})();

module.exports = pool;