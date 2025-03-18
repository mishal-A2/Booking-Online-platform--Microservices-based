const express = require("express");
const { bookEvent } = require("./controllers");
const pool = require("./db");

const router = express.Router();

router.post("/bookings", bookEvent);

router.get("/bookings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings");
    res.json({ message: "Bookings fetched successfully", data: result.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
