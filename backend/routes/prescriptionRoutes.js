const express = require("express");
const router = express.Router();

const controller = require("../controllers/prescriptionController");
const { protect, role } = require("../middleware/authMiddleware");

/* GET prescriptions for a patient */
router.get("/patient/:id", controller.getByPatient);
/* Doctor only: add prescription */
router.post(
  "/",
  protect,
  role("doctor"),
  controller.upload,
  controller.addPrescription
);

/* Doctor only: delete prescription */
router.delete(
  "/:id",
  protect,
  role("doctor"),
  controller.deletePrescription
);

module.exports = router;