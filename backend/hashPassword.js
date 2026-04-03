const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // 1️⃣ Check if email already exists
    const [existing] = await db.query("SELECT * FROM users WHERE email=?", [email.trim()]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2️⃣ Hash password
    const hash = await bcrypt.hash(password, 10);

    // 3️⃣ Insert user
    await db.query(
      "INSERT INTO users (name,email,password,role,phone,status) VALUES (?,?,?,?,?,1)",
      [name, email.trim(), hash, role || "patient", phone]
    );

    res.json({ success: true, message: "User registered" });

  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};