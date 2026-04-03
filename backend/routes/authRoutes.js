const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const [result] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        let user;

        if (result.length === 0) {
            // User create karne (First time sathi)
            const hashedPassword = await bcrypt.hash(password, 10);
            const [insert] = await db.query(
                "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                [username, hashedPassword, role || 'doctor']
            );
            return res.json({ success: true, message: "New user created!", id: insert.insertId });
        } 
        
        user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ success: false, message: "Invalid password" });

        const token = jwt.sign({ id: user.usersid, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ success: true, token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;