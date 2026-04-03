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

// ================= 2. MIDDLEWARE & CORS FIX =================
const corsOptions = {
  origin: [
    'http://localhost:3000',      // Laptop browser sathi
    'https://localhost',         // Android Capacitor sathi
    'capacitor://localhost',      // iOS/Android Capacitor sathi
    'https://slvc-clinic-management-production.up.railway.app' // Railway dashboard sathi
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Health Checks
app.get("/", (req, res) => res.send("SLVC Clinic Backend Running ✅"));

// ================= 3. API ROUTES =================
app.use("/api", require("./routes/authRoutes")); 
app.use("/api/appointments", require("./routes/appointmentRoute"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/photos", require("./routes/photoRoute"));
app.use("/api/stories", require("./routes/storyRoute"));
app.use("/api/notes", require("./routes/noteRoute"));
app.use("/api/surgery", require("./routes/surgeryRoute"));
app.use("/api/prescriptions", require("./routes/prescriptionRoute"));

// Extra placeholders jar garaj asel tar
app.get('/api/health-check', (req, res) => res.json({ status: "Online" }));

// ================= 4. CRON JOB =================
cron.schedule('* * * * *', async () => {
    console.log("⏰ Running reminder cron job...");
    try {
        const [rows] = await db.query(`
            SELECT appid, phone, app_time, reminder_5h, reminder_1h
            FROM appo 
            WHERE status='Confirmed' AND app_time > NOW()
        `);
    } catch(err) {
        console.error("❌ Reminder Error:", err.message);
    }
});

// ================= 5. START SERVER =================
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});