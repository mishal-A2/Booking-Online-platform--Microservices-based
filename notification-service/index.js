require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const startRabbitMQConsumer = require("./rabbitmqConsumer");

const app = express();
app.use(bodyParser.json());

// Start RabbitMQ Consumer when the service starts
startRabbitMQConsumer();

const PORT = process.env.NOTIFICATION_SERVICE_PORT || 5004;
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
