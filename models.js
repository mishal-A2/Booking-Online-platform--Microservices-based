const pool = require('./db');

// Create a new booking
const createBooking = async (user_id, event_id) => {
  const result = await pool.query(
    "INSERT INTO bookings (user_id, event_id) VALUES ($1, $2) RETURNING *",
    [user_id, event_id]
  );
  return result.rows[0];
};

// Check if an event exists
const getEventById = async (event_id) => {
  const result = await pool.query("SELECT * FROM events WHERE id = $1", [event_id]);
  return result.rows[0];
};

// Check if a user exists
const getUserById = async (user_id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);
  return result.rows[0];
};

module.exports = { createBooking, getEventById, getUserById };