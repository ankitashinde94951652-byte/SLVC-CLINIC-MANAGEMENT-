const db = require('../config/db');

exports.createSlot = async (req, res) => {
  const { doctor_id, slot_time } = req.body;

  try {
    await db.query(
      "INSERT INTO appointment_slots (doctor_id, slot_time) VALUES (?, ?)",
      [doctor_id, slot_time]
    );

    res.json({ success: true, message: "Slot created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM appointment_slots WHERE is_booked = false AND slot_time > NOW() ORDER BY slot_time"
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.generateSlots = (req, res) => {
  const { type } = req.query; // normal | new

  let slots = [];

  if (type === "new") {
    slots = [
       {start : "17:00", end : "18:00"},
       {start : "18:00", end : "19:00"},
       {start : "19:00", end : "20:00"},
       {start : "20:00", end : "21:00"}
    ];
  } else {
    slots = [
       {start : "17:00", end : "17:30"},
       {start : "17:30", end : "18:00"},
       {start : "18:30", end : "19:00"},
       {start : "19:00", end : "19:30"},
       {start : "19:30", end : "20:00"},
       {start : "20:00", end : "20:30"},
       {start : "20:30", end : "21:00"}
    ];
  }

  return res.json({
    success: true,
    type,
    slots
  });
};