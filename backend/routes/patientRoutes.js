const express=require("express");

const router=express.Router();

const controller=require("../controllers/patientController");

router.get("/:id",controller.getPatient);

router.put("/:id",controller.upload,controller.updatePatient);

module.exports=router;