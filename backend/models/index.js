// const Patient = require("./patient.model");
// const Appointment = require("./appointment.model");
// const Surgery = require("./surgery.model");
// const Photo = require("./photo.model");
// const Note = require("./notes.model");
// const Story = require("./story.model");
// const MedicalHistory = require("./medicalHistory.model");

// Patient.hasMany(Appointment, { foreignKey: "patientId" });
// Appointment.belongsTo(Patient, { foreignKey: "patientId" });

// Patient.hasMany(Surgery, { foreignKey: "patientId" });
// Surgery.belongsTo(Patient, { foreignKey: "patientId" });

// Surgery.hasMany(Photo, { foreignKey: "surgeryId" });
// Photo.belongsTo(Surgery, { foreignKey: "surgeryId" });

// Patient.hasMany(Note, { foreignKey: "patientId" });
// Note.belongsTo(Patient, { foreignKey: "patientId" });

// Patient.hasMany(Story, { foreignKey: "patientId" });
// Story.belongsTo(Patient, { foreignKey: "patientId" });

// Patient.hasMany(MedicalHistory, { foreignKey: "patientId" });
// MedicalHistory.belongsTo(Patient, { foreignKey: "patientId" });

// module.exports = {
//   User,
//   Patient,
//   Surgery,
//   Photo,
//   Appointment
// };