const db = require('../config/db');

exports.getDoctorDashboard = async (req, res) => {
  try {
    const [today] = await db.query(`
      SELECT COUNT(*) as total FROM appo 
      WHERE DATE(app_time) = CURDATE()
    `);

    const [pending] = await db.query(`
      SELECT COUNT(*) as total FROM appo WHERE status='Pending'
    `);

    const [completed] = await db.query(`
      SELECT COUNT(*) as total FROM appo WHERE status='Completed'
    `);

    const [cancelled] = await db.query(`
      SELECT COUNT(*) as total FROM appo WHERE status='Cancelled'
    `);

    res.json({
      success: true,
      today: today[0].total,
      pending: pending[0].total,
      completed: completed[0].total,
      cancelled: cancelled[0].total
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};