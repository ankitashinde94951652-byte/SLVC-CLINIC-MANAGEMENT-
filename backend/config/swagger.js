const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SLVC Clinic BACKEND API",
      version: "1.0.0",
      description: "Clinic Appointment & Patient Management System"
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJSDoc(options);
