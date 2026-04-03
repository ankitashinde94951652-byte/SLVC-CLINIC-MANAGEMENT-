const db = require("../config/db");
const multer = require("multer");

// STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage });

exports.upload = upload.single("image");

// CREATE
exports.createPrescription = async (req, res) => {
    try {
        const { patient, doctor, diagnosis, date, ptid } = req.body;

        const image = req.file ? "/uploads/" + req.file.filename : null;

        await db.query(
            "INSERT INTO prescriptions (ptid, patient, doctor, diagnosis, date, image) VALUES (?,?,?,?,?,?)",
            [ptid, patient, doctor, diagnosis, date, image]
        );

        res.json({ success: true, message: "Prescription saved ✅" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};