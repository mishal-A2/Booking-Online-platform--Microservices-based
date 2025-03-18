const express = require("express");
const axios = require("axios");
const router = express.Router();
const pool = require("./db");
const { register_new_user, find_user, get_events, create_booking, loginUser, find_user_id } = require("./controllers");


const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL;
const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL;

router.post("/users/bookings", async (req, res) => {
  try {
    const response = await axios.post(`${BOOKING_SERVICE_URL}/bookings`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.get("/users/events", async (req, res) => {
  try {
    
    const response = await axios.get(`${EVENT_SERVICE_URL}/events`);
    
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

router.post("/register", register_new_user);
router.post("/login", loginUser);
router.get("/:email", find_user);
router.get("/events", get_events);
router.get("/id/:id", find_user_id);
router.post("/bookings", create_booking);

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

 
module.exports = router;
