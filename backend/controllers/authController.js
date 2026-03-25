const jwt = require("jsonwebtoken"); // <--- ही लाईन नसेल तर Error येईल
const db = require("../config/db");

const loginUser = async (req, res) => {

  try {

    const { username, password, role } = req.body;

    // ================= PATIENT =================

    if (role === "patient") {

      if (password !== "123456") {

        return res.json({
          success: false,
          message: "Patient password must be 123456"
        });

      }

      const token = jwt.sign(
        { username: username, role: "patient" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        token,
        user: {
          username: username,
          role: "patient"
        }
      });

    }

    // ================= DOCTOR =================

    if (role === "doctor") {

      if (password !== "slvc_clinic_26") {

        return res.json({
          success: false,
          message: "Doctor password incorrect"
        });

      }

      const [rows] = await db.query(
        "SELECT * FROM users WHERE username=? AND role='doctor'",
        [username]
      );

      if (rows.length === 0) {

        return res.json({
          success: false,
          message: "Doctor not found"
        });

      }

      const user = rows[0];

const token = jwt.sign(
  { id: user.usersid, role: "doctor" }, // ✅ Match DB: usersid
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

return res.json({
  success: true,
  token,
  user: {
    id: user.usersid, // ✅ Match DB: usersid
    username: user.username,
    role: "doctor"
  }
});

    }

    return res.json({
      success: false,
      message: "Invalid role"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

module.exports = { loginUser };