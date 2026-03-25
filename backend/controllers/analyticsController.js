const db = require("../config/db");


exports.dashboardStats = async (req, res) => {
  try {
    const [[total]] = await db.query("SELECT COUNT(*) total FROM appo");
    const [[today]] = await db.query(
      "SELECT COUNT(*) today FROM appo WHERE DATE(app_time)=CURDATE()"
    );
    const [[cancel]] = await db.query(
      "SELECT COUNT(*) cancel FROM appo WHERE status='cancelled'"
    );
    const [[pending]] = await db.query(
      "SELECT COUNT(*) pending FROM appo WHERE status='pending'"
    );

    res.json({
      success: true,
      stats: {
        total: total.total,
        today: today.today,
        cancelled: cancel.cancel,
        pending: pending.pending
      }
    });

  } catch (err) {
    res.status(500).json({ success:false, error: err.message });
  }
};


exports.getRevenue = async (req, res) => {
  const [daily] = await db.query(
    "SELECT SUM(amount) as total FROM payments WHERE DATE(created_at)=CURDATE()"
  );

  const [monthly] = await db.query(
    "SELECT SUM(amount) as total FROM payments WHERE MONTH(created_at)=MONTH(NOW())"
  );

  res.json({
    success: true,
    today: daily[0].total || 0,
    month: monthly[0].total || 0
  });
};