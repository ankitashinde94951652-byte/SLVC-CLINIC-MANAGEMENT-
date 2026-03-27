const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAllappo,
  getTodayappo,
  updateappoStatus,
  deleteAppointment,
  getAvailableSlots,
  getByPatient,
  getPatientHistory,
  updateQueueStatus
} = require("../controllers/appointmentController");

const { protect, role } = require("../middleware/authMiddleware");


// CREATE APPOINTMENT
router.post("/", createAppointment);

// GET ALL
router.get("/", getAllappo);

// TODAY APPOINTMENTS
router.get("/today", protect, getTodayappo);

// AVAILABLE SLOTS
router.get("/slots", getAvailableSlots);

// PATIENT APPOINTMENTS
router.get("/patient/:patientId", protect, getByPatient);

// PATIENT HISTORY
router.get("/history/:id", protect, getPatientHistory);

// UPDATE STATUS
router.put("/status/:id", protect, updateappoStatus);

// UPDATE QUEUE
router.put("/queue/:id", protect, updateQueueStatus);

// DELETE APPOINTMENT (KEEP LAST)
router.delete("/:id", protect, role("admin"), deleteAppointment);

module.exports = router;