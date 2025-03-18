const pool = require("./db");
const axios = require("axios");

const createBooking = async (user_id, event_id) => {
  const result = await pool.query(
    "INSERT INTO bookings (user_id, event_id) VALUES ($1, $2) RETURNING *",
    [user_id, event_id]
  );
  return result.rows[0];
};

const getEventById = async (event_id) => {
  try {
    console.log(`Fetching event ID: ${event_id} from Event Service`);
    const response = await axios.get(`${process.env.EVENT_SERVICE_URL}/events/${event_id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

const getUserById = async (user_id) => {
  try {
    console.log(`Fetching user ID: ${user_id} from User Service`);
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/id/${user_id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

const getEventAvailability = async (event_id) => {
  try {
    console.log(`Fetching availability for event ID: ${event_id}`);
    const response = await axios.get(`${process.env.EVENT_SERVICE_URL}/events/${event_id}/availability`);
    return response.data.available;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

module.exports = { createBooking, getEventById, getUserById, getEventAvailability };
