const express = require("express");
const router = express.Router();

const { createPrescription, upload } = require("../controllers/prescriptionController");

router.post("/", upload, createPrescription);

module.exports = router;