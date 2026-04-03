
const express = require("express");
const cors = require('cors');
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
// const cors = require("cors");

app.use(cors({
    origin: "*", // or restrict to your domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Health Checks
app.get("/", (req, res) => res.send("SLVC Clinic Backend Running ✅"));

// ================= 3. API ROUTES =================
// app.use("/api", authRoutes); 
// 2. API ROUTES (सर्व राऊट्स इथे असायला हवेत)
app.use("/api", require("./routes/authRoutes")); 
app.use("/api/appointments", require("./routes/appointmentRoute"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/photos", require("./routes/photoRoute")); // हा महत्त्वाचा आहे!
app.use("/api/stories", require("./routes/storyRoute")); // हा पण!
app.use("/api/surgery", require("./routes/surgeryRoute"));
app.use("/api/notes", require("./routes/noteRoute"));
app.use("/api/prescriptions", require("./routes/prescriptionRoute"));

// हे Routes तुझ्या backend मध्ये असायला हवेत
app.get('/api/photos', (req, res) => {
    // तुमचा फोटो डेटा पाठवा
});

app.get('/api/stories', (req, res) => {
    // तुमचा स्टोरीज डेटा पाठवा
});

app.get("/", (req, res) => res.send("SLVC Backend Online ✅"));
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