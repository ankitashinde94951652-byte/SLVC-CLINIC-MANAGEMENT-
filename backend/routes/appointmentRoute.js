const express = require("express");
const router = express.Router();

const {
  createappo,
  getAllappo,
  getTodayappo,
  updateappoStatus,
  deleteappo,
  getAvailableSlots,
  getByPatient,
  getPatientHistory,
  updateQueueStatus
} = require("../controllers/appointmentController");

const { protect, role } = require("../middleware/authMiddleware");

// लक्ष द्या: इथे path "/" आहे कारण server.js मध्ये आधीच "/api/appointments" वापरले आहे
router.post("/", createappo);
router.get("/", getAllappo);
router.get("/today", protect, getTodayappo);
router.get("/slots", getAvailableSlots);
router.get("/patient/:patientId", protect, getByPatient);
router.get("/history/:id", protect, getPatientHistory);
router.put("/status/:id", protect, updateappoStatus);
router.put("/queue/:id", protect, updateQueueStatus);
router.delete("/:id", protect, role("admin"), deleteappo);

module.exports = router;