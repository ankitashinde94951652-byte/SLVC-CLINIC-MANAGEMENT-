const express = require("express");
const router = express.Router();

const { createPrescription } = require("../controllers/prescriptionController");
const { upload } = require("../config/cloudinary"); // 👈 इथे import

router.post("/", upload.single("image"), createPrescription);

module.exports = router;