const express = require("express");
const router = express.Router();

const { createPrescription, upload } = require("../controllers/prescriptionController");

router.post("/", upload, createPrescription);

router.get("/patient/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM prescriptions ORDER BY date DESC"
    );

    res.json({
      success: true,
      data: rows
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;