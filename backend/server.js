const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import database and routes
const db = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Serve static upload files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Basic Health Checks
app.get("/", (req, res) => res.send("SLVC Clinic Backend Running ✅"));
app.get("/ping", (req, res) => res.send("SERVER OK"));

// ================= API ROUTES =================
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

// ================= SWAGGER & CRON =================
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
require("./cron/reminderCron");

// ================= TEST ROUTES =================
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ message: "Database is working!", data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ERROR HANDLER =================
const errorMiddleware = require("./middleware/error.middleware");
app.use(errorMiddleware);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running!`);
  console.log(`🏠 Local: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://0.0.0.0:${PORT}`);
});

// Handle Port Errors
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
  }
});