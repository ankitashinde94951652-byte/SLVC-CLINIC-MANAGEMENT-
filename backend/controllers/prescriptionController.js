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

exports.createPrescription = async (req, res) => {
    try {
        const { ptid, patient, doctor, diagnosis, date } = req.body;

        if (!ptid) {
            return res.status(400).json({
                success: false,
                message: "ptid missing ❌"
            });
        }

        const image = req.file ? "/uploads/" + req.file.filename : null;

        await db.query(
            "INSERT INTO prescriptions (ptid, patient, doctor, diagnosis, date, image) VALUES (?,?,?,?,?,?)",
            [ptid, patient, doctor, diagnosis, date, image]
        );

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};