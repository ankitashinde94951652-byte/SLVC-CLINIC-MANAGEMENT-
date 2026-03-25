const db = require("../config/db");

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email, role, profile_pic FROM users");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let mediaUrl = req.file ? req.file.path : null;

    const sql = "INSERT INTO users (name, email, password, role, profile_pic) VALUES (?, ?, ?, ?, ?)";
    await db.query(sql, [name, email, password, role, mediaUrl]);
    
    res.status(201).json({ success: true, message: "User created!", url: mediaUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  res.send("Update logic with profileImage support");
};

exports.deleteUser = async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // 1. DOCTOR LOGIN LOGIC
    if (role === 'doctor') {
      const allowedDoctors = ['ankita_shinde', 'abhijeet_godse', 'sagar_satpute', 'akshata_satpute', 'slvc_clinic'];
      
      if (!allowedDoctors.includes(username)) {
        return res.json({ success: false, message: "Unauthorized Doctor!" });
      }

      if (password !== "slvc_clinic_26") {
        return res.json({ success: false, message: "Invalid Doctor Password!" });
      }
    }

    // 2. PATIENT LOGIN LOGIC
    if (role === 'patient') {
      if (password !== "123456") {
        return res.json({ success: false, message: "Patient password must be 123456" });
      }
    }

    // 3. DATABASE CHECK (Pudhcha code tasach theva)
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username=? AND role=?",
      [username, role]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "User not found!" });
    }

    // Token generate kara aani response dya...
    const user = rows[0];
    const token = jwt.sign({ id: user.usersid, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token,
      user: { id: user.usersid, username: user.username, role: user.role }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};