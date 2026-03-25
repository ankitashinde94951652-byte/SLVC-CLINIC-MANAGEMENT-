const db = require('../config/db');

exports.getLiveTokens = async (req, res) => {
  const [serving] = await db.query(
    "SELECT token_no FROM tokens WHERE status='serving' ORDER BY id DESC LIMIT 1"
  );

  const [next] = await db.query(
    "SELECT token_no FROM tokens WHERE status='waiting' ORDER BY id ASC LIMIT 2"
  );

  res.json({
    success: true,
    nowServing: serving[0]?.token_no || null,
    next: next.map(t => t.token_no)
  });
};