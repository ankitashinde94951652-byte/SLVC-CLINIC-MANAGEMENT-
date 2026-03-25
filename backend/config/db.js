const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD, // <--- He .env madhla password gheil
  database: process.env.DB_NAME || "slvc_clinic_new",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MYSQL CONNECTED SUCCESSFULLY");
    conn.release();
  } catch (err) {
    console.log("❌ DB ERROR:", err);
  }
}

testConnection();

module.exports = pool;