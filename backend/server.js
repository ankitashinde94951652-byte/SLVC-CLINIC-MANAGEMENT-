// const jwt = require("jsonwebtoken");

// const express = require("express");
// const db = require("./config/db");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./config/swagger");

// const authRoutes = require("./routes/authRoutes");

// const app = express();

// const path = require("path");

// // ADD THIS LINE TO SERVE YOUR IMAGES
// // ================= MIDDLEWARE =================

// // server.js madhe cors asach asava:
// app.use(cors({
//   origin: '*', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
// app.use(express.json());

// app.use('/uploads', express.static('public/uploads'));
// app.get("/", (req, res) => res.send("SLVC Clinic Backend Running ✅"));
// app.get("/ping", (req, res) => res.send("SERVER OK"));

// // ================= API ROUTES =================

// app.use("/api", authRoutes);    //app.use("/api/auth", authRoutes);

// app.use("/api/appointments", require("./routes/appointmentRoute"));
// app.use("/api/patients", require("./routes/patientRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/sms", require("./routes/smsRoute"));
// app.use("/api/whatsapp", require("./routes/whatsappRoute"));
// app.use("/api/slots", require("./routes/slotRoute"));
// app.use("/api/photos", require("./routes/photoRoute"));
// app.use("/api/tokens", require("./routes/tokenRoute"));
// app.use("/api/doctor", require("./routes/doctorRoute"));
// app.use("/api/surgery", require("./routes/surgeryRoute"));
// app.use("/api/analytics", require("./routes/analyticsRoute"));
// app.use("/api/notes", require("./routes/noteRoute"));
// app.use("/api/reports", require("./routes/reportRoute"));

// const storyRoute = require("./routes/storyRoute");
// app.use("/api/stories", storyRoute);

// const prescriptionRoutes = require("./routes/prescriptionRoutes");
// app.use("/api/prescriptions", prescriptionRoutes);
// // ✅ VERY IMPORTANT

// // ================= SWAGGER =================

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // ================= CRON =================

// require("./cron/reminderCron");

// // ================= TEST ROUTES =================

// app.get("/test-db", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT 1 + 1 AS result");
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/test", (req, res) => {
//   res.json({ message: "Backend connected successfully!" });
// });

// // ================= LOGIN =================

// app.post("/api/login", async (req, res) => {

//   const { username, password, role } = req.body;

//   try {
//     const [result] = await db.query(
//       "SELECT * FROM users WHERE username = ?",
//       [username]
//     );

//     let user;

//     // 🟢 IF USER NOT FOUND → CREATE NEW USER
//     if (result.length === 0) {

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const [insertResult] = await db.query(
//         "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
//         [username, hashedPassword, role]
//       );

//       user = {
//         usersid: insertResult.insertId,
//         username,
//         role
//       };

//     } else {
//       user = result[0];

//       const match = await bcrypt.compare(password, user.password);

//       if (!match) {
//         return res.json({ success: false, message: "Invalid password" });
//       }
//     }

//     // 🟢 LOGIN SUCCESS
//     res.json({
//       success: true,
//       token: jwt.sign(
//         { id: user.usersid, username: user.username, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" }
//       ),
//       user: {
//         id: user.usersid,
//         username: user.username,
//         role: user.role
//       }
//     });

//   } catch (err) {
//     console.log("LOGIN ERROR:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ================= ERROR HANDLER =================

// const errorMiddleware = require("./middleware/error.middleware");
// app.use(errorMiddleware);

// // ================= START SERVER =================

// /*const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
// */

// // server.js chya shevti (jithe PORT define kela aahe):

// const PORT = process.env.PORT || 5000;

// // '0.0.0.0' mule tumcha server network madhe (IP var) disto
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server is running!`);
//   console.log(`🏠 Local: http://localhost:${PORT}`);
//   console.log(`🌐 Network: http://192.168.0.102:${PORT}`);
// });


const jwt = require("jsonwebtoken");
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");

const app = express();
const path = require("path");

// ================= MIDDLEWARE =================
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/uploads', express.static('public/uploads'));
app.get("/", (req, res) => res.send("SLVC Clinic Backend Running ✅"));
app.get("/ping", (req, res) => res.send("SERVER OK"));

// ================= API ROUTES =================

// ✅ ATA FAKT HECH VAPRA (Duplicate login kadhla aahe)
app.use("/api", authRoutes); 

app.use("/api/appointments", require("./routes/appointmentRoute"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/sms", require("./routes/smsRoute"));
app.use("/api/whatsapp", require("./routes/whatsappRoute"));
app.use("/api/slots", require("./routes/slotRoute"));
app.use("/api/photos", require("./routes/photoRoute"));
app.use("/api/tokens", require("./routes/tokenRoute"));
app.use("/api/doctor", require("./routes/doctorRoute"));
app.use("/api/surgery", require("./routes/surgeryRoute"));
app.use("/api/analytics", require("./routes/analyticsRoute"));
app.use("/api/notes", require("./routes/noteRoute"));
app.use("/api/reports", require("./routes/reportRoute"));

app.use("/api/stories", require("./routes/storyRoute"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));

// ================= SWAGGER =================
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ================= CRON =================
require("./cron/reminderCron");

// ================= TEST ROUTES =================
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

// ================= ERROR HANDLER =================
const errorMiddleware = require("./middleware/error.middleware");
app.use(errorMiddleware);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

// '0.0.0.0' mule Emulator la access milto
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running!`);
  console.log(`🏠 Local: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://192.168.0.102:${PORT}`);
});