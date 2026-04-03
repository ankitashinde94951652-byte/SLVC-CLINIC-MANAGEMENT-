// require("dotenv").config();

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// // DB
// const db = require("./config/db");

// // ROUTES
// const patientRoutes = require("./routes/patient.routes");
// const surgeryRoutes = require("./routes/surgery.routes");
// const notesRoutes = require("./routes/notes.routes");
// const appointmentRoutes = require("./routes/appointment.routes");
// const medicalHistoryRoutes = require("./routes/medicalHistory.routes");
// const photosRoutes = require("./routes/photo.routes");
// const storyRoutes = require("./routes/story.routes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// // MIDDLEWARE
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// // HEALTH CHECK
// app.get("/", (req, res) => {
//   res.send("SLVC Clinic API is running 🚀");
// });

// // DB TEST
// app.get("/test-db", (req, res) => {
//   db.query("SELECT 1", (err) => {
//     if (err) return res.status(500).send("Database error ❌");
//     res.send("Database connected successfully ✅");
//   });
// });

// // ROUTE REGISTRATION (MVC STYLE)
// app.use("/api/users", userRoutes);
// app.use("/api/patients", patientRoutes);
// app.use("/api/surgeries", surgeryRoutes);
// app.use("/api/notes", notesRoutes);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/medical-history", medicalHistoryRoutes);
// app.use("/api/photos", photosRoutes);
// app.use("/api/stories", storyRoutes);

// // GLOBAL ERROR HANDLER
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

// // START SERVER
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


// // index.js


// const port = 3000;

// const appointmentsRoutes = require('./routes/appointments');

// app.use(express.json()); // To parse JSON body
// app.use('/appointments', appointmentsRoutes);

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
