require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`User Service is running on port ${PORT}`));
