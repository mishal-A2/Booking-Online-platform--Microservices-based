require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookingRoutes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/bookings", bookingRoutes);

const PORT = process.env.BOOKING_SERVICE_PORT || 5003;
app.listen(PORT, () => console.log(`Booking Service running on port ${PORT}`));
