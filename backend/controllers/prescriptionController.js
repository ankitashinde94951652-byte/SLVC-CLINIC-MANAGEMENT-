const db = require("../config/db");
const multer = require("multer");

/* STORAGE CONFIG */

const storage = multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"public/uploads/");
},

filename:(req,file,cb)=>{
cb(null,Date.now()+"_"+file.originalname);
}

});

const upload = multer({storage});

exports.upload = upload.single("image");


/* ADD PRESCRIPTION */

exports.addPrescription = async(req,res)=>{

try{

const {patient,doctor,diagnosis,date} = req.body;

let image=null;

if(req.file){
image="/uploads/"+req.file.filename;
}

/* find patient */

const [rows] = await db.query(
"SELECT ptid,name FROM patient WHERE name=? OR phone=?",
[patient,patient]
);

let ptid;
let patientName=patient;

/* patient not exist → create automatically */

if(rows.length===0){

const [newPatient] = await db.query(
"INSERT INTO patient (name,phone) VALUES (?,?)",
[patient,patient]
);

ptid=newPatient.insertId;

}else{

ptid=rows[0].ptid;
patientName=rows[0].name;

}

/* save prescription */

await db.query(
"INSERT INTO prescriptions (ptid,patient_name,doctor,diagnosis,image,date) VALUES (?,?,?,?,?,?)",
[ptid,patientName,doctor,diagnosis,image,date]
);

res.json({
success:true,
message:"Prescription saved"
});

}catch(err){

console.log(err);

res.status(500).json({
success:false,
message:"Server error"
});

}

};


/* GET PRESCRIPTIONS */

exports.getByPatient = async (req,res)=>{

try{

const [rows] = await db.query(
"SELECT * FROM prescriptions WHERE ptid=? ORDER BY id DESC",
[req.params.id]
);

res.json({
success:true,
data:rows
});

}catch(err){

console.log(err);

res.status(500).json({
success:false,
message:"Server error"
});

}

};


/* DELETE */

exports.deletePrescription = async (req,res)=>{

try{

const id=req.params.id;

await db.query(
"DELETE FROM prescriptions WHERE id=?",
[id]
);

res.json({
success:true,
message:"Prescription deleted"
});

}catch(err){

console.log(err);

res.status(500).json({
success:false,
message:"Server error"
});

}

};