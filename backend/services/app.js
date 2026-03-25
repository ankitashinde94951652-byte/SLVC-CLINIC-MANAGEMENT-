// require('dotenv').config();
// require('./services/cronReminder');

// const express = require('express');
// const cors = require('cors');

// const appointmentRoutes = require('./routes/appointmentRoute');
// const authRoutes = require('./routes/authRoutes');
// const smsRoutes = require('./routes/smsRoute');
// const whatsappRoutes = require('./routes/whatsappRoute');
// const slotRoutes = require('./routes/slotRoute');
// const analyticsRoutes = require('./routes/analyticsRoute');
// const photoRoutes = require('./routes/photoRoute');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Test routes
// app.get('/', (req, res) => res.send('Clinic Backend Running ✅'));
// app.get('/ping', (req, res) => res.send('SERVER OK'));

// // APIs
// app.use('/api/auth', authRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/sms', smsRoutes);
// app.use('/api/whatsapp', whatsappRoutes);
// app.use('/api/slots', slotRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/photos', photoRoutes);

// // CRON
// require('./cron/reminderCron');

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// const userRoutes = require('./routes/userRoute');
// app.use('/api/users', userRoutes);

// const errorMiddleware = require('./middleware/errorMiddleware;');
// app.use(errorMiddleware);
