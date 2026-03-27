const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // युजर आधीपासून आहे का ते चेक करा
        const [result] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        
        if (result.length === 0) {
            // जर युजर नसेल, तर नवीन तयार करा (Auto-Register)
            const hashedPassword = await bcrypt.hash(password, 10);
            const [insert] = await db.query(
                "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                [username, hashedPassword, role || 'doctor']
            );
            return res.json({ success: true, message: "New Admin Created!", id: insert.insertId });
        } 

        // जर युजर असेल, तर पासवर्ड मॅच करा
        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ success: false, message: "Invalid password" });

        // टोकन जनरेट करा
        const token = jwt.sign({ id: user.usersid, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ success: true, token, user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;