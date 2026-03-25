const db = require("../config/db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });
exports.upload = upload.single("photo");


// GET PATIENT PROFILE
exports.getPatient = async (req, res) => {
  try {

    const id = req.params.id;

    console.log("PATIENT ID:", id);

    const [rows] = await db.query(
      "SELECT * FROM patient WHERE ptid=?",
      [id]
    );

    if (rows.length > 0) {
      return res.json(rows[0]);
    }

    // create profile automatically

    const [user] = await db.query(
      "SELECT username FROM users WHERE usersid=?",
      [id]
    );

    if (user.length === 0) {
      return res.json({});
    }

    await db.query(
      "INSERT INTO patient (ptid,name) VALUES (?,?)",
      [id, user[0].username]
    );

    const [newProfile] = await db.query(
      "SELECT * FROM patient WHERE ptid=?",
      [id]
    );

    res.json(newProfile[0]);

  } catch (err) {

    console.log("PATIENT ERROR:", err);

    res.status(500).json({ error: "Server error" });

  }
};



// UPDATE PROFILE
exports.updatePatient = async (req, res) => {

  try {

    const id = req.params.id;

    const { name, age, gender, phone, medicalHistory, lifestyle } = req.body;

    let photo = null;

    if (req.file) {
      photo = "/uploads/" + req.file.filename;
    }

    const [check] = await db.query(
      "SELECT * FROM patient WHERE ptid=?",
      [id]
    );

    if (check.length === 0) {

      await db.query(
        `INSERT INTO patient
        (ptid,name,age,gender,phone,medicalHistory,lifestyle,photo)
        VALUES (?,?,?,?,?,?,?,?)`,
        [id, name, age, gender, phone, medicalHistory, lifestyle, photo]
      );

    } else {

      if (photo) {

        await db.query(
          `UPDATE patient
          SET name=?,age=?,gender=?,phone=?,medicalHistory=?,lifestyle=?,photo=?
          WHERE ptid=?`,
          [name, age, gender, phone, medicalHistory, lifestyle, photo, id]
        );

      } else {

        await db.query(
          `UPDATE patient
          SET name=?,age=?,gender=?,phone=?,medicalHistory=?,lifestyle=?
          WHERE ptid=?`,
          [name, age, gender, phone, medicalHistory, lifestyle, id]
        );

      }

    }

    res.json({ success: true });

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Server error" });

  }

};