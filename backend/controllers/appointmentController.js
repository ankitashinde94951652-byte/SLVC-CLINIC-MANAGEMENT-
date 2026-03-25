const db = require("../config/db");
const { sendSMS, sendWhatsApp } = require("../services/twilio.service");
const { messages } = require("../services/messageTemplates");

const CLINIC_NUMBER = "+919999999999";


// CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {

  try {

    const {
      ptid,
      pt_name,
      phone,
      app_time,
      reason,
      slot_id,
      reference,
      address
    } = req.body;

    const sql = `
    INSERT INTO appo
    (
      ptid,
      pt_name,
      phone,
      app_time,
      status,
      reason,
      appotype,
      slot_id,
      reference,
      address,
      reminder_sent,
      reminder_1day,
      reminder_5h,
      reminder_1h
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      ptid,
      pt_name,
      phone,
      app_time,
      "Confirmed",
      reason || "Appointment Booking",
      "offline consulting",
      slot_id || null,
      reference || "",
      address || "",
      0,
      0,
      0,
      0
    ]);

    res.json({
      success: true,
      message: "Appointment booked successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};


// GET ALL APPOINTMENTS
exports.getAllAppointments = async (req,res)=>{

try{

const [rows] = await db.query("SELECT * FROM appo");

res.json({
success:true,
data:rows
});

}catch(err){

res.status(500).json({
success:false,
message:"Server error"
});

}

};

// GET TODAY APPOINTMENTS
exports.getTodayAppointments = async (req, res) => {

  try {

    const [rows] = await db.query(
      "SELECT * FROM appo WHERE DATE(app_time)=CURDATE()"
    );

    res.json({
      success: true,
      data: rows
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};


// UPDATE STATUS
exports.updateAppointmentStatus = async (req, res) => {

  try {

    await db.query(
      "UPDATE appo SET status=? WHERE appid=?",
      [req.body.status, req.params.id]
    );

    res.json({
      success: true,
      message: "Status updated"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};


// GET AVAILABLE SLOTS
exports.getAvailableSlots = async (req, res) => {

  const [rows] = await db.query(
    "SELECT * FROM appointment_slots WHERE is_booked=0"
  );

  res.json({
    success: true,
    slots: rows
  });

};


// GET PATIENT APPOINTMENTS
exports.getByPatient = async (req, res) => {

  const [rows] = await db.query(
    "SELECT * FROM appo WHERE ptid=? ORDER BY app_time DESC",
    [req.params.patientId]
  );

  res.json({
    success: true,
    data: rows
  });

};


// PATIENT HISTORY
exports.getPatientHistory = async (req, res) => {

  const [rows] = await db.query(
    "SELECT * FROM appo WHERE ptid=? ORDER BY app_time DESC",
    [req.params.id]
  );

  res.json({
    success: true,
    data: rows
  });

};


// UPDATE QUEUE STATUS
exports.updateQueueStatus = async (req, res) => {

  try {

    const { status } = req.body;
    const { id } = req.params;

    await db.query(
      "UPDATE appo SET status=? WHERE appid=?",
      [status, id]
    );

    res.json({
      success: true,
      message: "Queue status updated"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

exports.deleteAppointment = async (req, res) => {

try {

const [rows] = await db.query(
"SELECT phone FROM appo WHERE appid=?",
[req.params.id]
);

await db.query(
"DELETE FROM appo WHERE appid=?",
[req.params.id]
);

if(rows.length > 0){
await sendSMS(
rows[0].phone,
"Your appointment is cancelled because doctor is not available."
);
}

res.json({
success:true,
message:"Appointment deleted"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};