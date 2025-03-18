const axios = require('axios');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { user_create, find_user_by_mail,find_user_by_id } = require("./models");

const register_new_user = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await user_create(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const find_user = async (req, res) => {
  try {
    const user = await find_user_by_mail(req.params.email);
    
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const find_user_id = async (req, res) => {
  try {
    const user = await find_user_by_id(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const get_events = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.EVENT_SERVICE_URL}/events`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create_booking = async (req, res) => {
  try {
    console.log("BOOKING_SERVICE_URL:", process.env.BOOKING_SERVICE_URL);

    const bookingUrl = `${process.env.BOOKING_SERVICE_URL}/bookings`;
    console.log("Full Booking URL:", bookingUrl);

    const response = await axios.post(bookingUrl, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ message: error.message });
  }
};
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await find_user_by_mail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register_new_user, find_user, get_events, create_booking, loginUser,find_user_id };
