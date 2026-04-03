const db = require("../config/db");

exports.createPrescription = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { patient, doctor, diagnosis, date } = req.body;

        // Cloudinary image URL
        const image = req.file ? req.file.path : null;

        await db.query(
            "INSERT INTO prescriptions (patient, doctor, diagnosis, date, image) VALUES (?,?,?,?,?)",
            [patient, doctor, diagnosis, date, image]
        );

        res.json({
            success: true,
            message: "Prescription saved"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};