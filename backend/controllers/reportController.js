const db = require('../config/db');

exports.uploadReport = async (req, res) => {
  try {
    const uploadedFile = req.files[0]; // from multer.any()

    if (!uploadedFile) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // ✅ Use await with promise-based db
    await db.query(
      "INSERT INTO reports (ptid, file_url) VALUES (?, ?)",
      [req.body.ptid, uploadedFile.path]
    );

    res.json({ success: true, url: uploadedFile.path });

  } catch (err) {
    console.error("REPORT ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};