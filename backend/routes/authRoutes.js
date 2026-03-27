const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Ensure this path is correct
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// This handles POST /api/login
router.post("/login", async (req, res) => { 
  const { username, password } = req.body;
  try {
    // Your login logic here...
    res.json({ message: "Login logic goes here" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;