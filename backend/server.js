const express = require("express");
const cors = require("cors");
const path = require("path");
const cron = require('node-cron');
require("dotenv").config();

// ================= 1. IMPORT CONFIG & ROUTES =================
const db = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// ================= 2. MIDDLEWARE =================
app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Health Checks
app.get("/", (req, res) => res.send("SLVC Clinic Backend Running ✅"));

// ================= 3. API ROUTES =================
app.use("/api", authRoutes); 
app.use("/api/appointments", require("./routes/appointmentRoute")); // हा राउट आता खालील नवीन कोड वापरेल
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/slots", require("./routes/slotRoute"));
app.use("/api/doctor", require("./routes/doctorRoute"));

// ================= 4. CRON JOB (REMARK: 'appo' टेबल वापरला आहे) =================
cron.schedule('* * * * *', async () => {
    console.log("⏰ Running reminder cron job...");
    try {
        const [rows] = await db.query(`
            SELECT appid, phone, app_time, reminder_5h, reminder_1h
            FROM appo 
            WHERE status='Confirmed' AND app_time > NOW()
        `);
        // रिमांडर लॉजिक इथे सुरू राहील
    } catch(err) {
        console.error("❌ Reminder Error:", err.message);
    }
});

// ================= 5. START SERVER =================
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});