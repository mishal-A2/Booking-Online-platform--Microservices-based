require("dotenv").config();
const express = require("express");
const consumeMessages = require("./rabbitConsumer");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5004;


consumeMessages();

app.listen(PORT, () => {
  console.log(`Notification Service is running on port ${PORT}`);
});
