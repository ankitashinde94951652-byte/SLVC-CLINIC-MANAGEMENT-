const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const photoController = require("../controllers/photoController");

// upload patient photos
router.post(
  "/upload",
  upload.fields([
    { name: "before", maxCount: 1 },
    { name: "after", maxCount: 1 }
  ]),
  photoController.uploadPhoto
);

// get all patients
router.get("/", photoController.getPhotos);

// delete patient
router.delete("/:id", photoController.deletePhoto);

module.exports = router;