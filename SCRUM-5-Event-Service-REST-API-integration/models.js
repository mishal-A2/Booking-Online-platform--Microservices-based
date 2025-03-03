const pool = require('./db');

const event_creator = async (title, desc, date, capacity) => {
  const result = await pool.query(
    'INSERT INTO events (title, desc, date, capacity, booked) VALUES ($1, $2, $3, $4, 0) RETURNING *',
    [title, desc, date, capacity]
  );
  return result.rows[0];
};

const find_all_events = async () => {
  const result = await pool.query('SELECT * FROM events');
  return result.rows;
};

const find_if_event_avail = async (eventId) => {
  const result = await pool.query('SELECT capacity, booked FROM events WHERE id = $1', [eventId]);
  if (result.rows.length === 0) return null;
  return result.rows[0].capacity - result.rows[0].booked;
};

module.exports = { event_creator, find_all_events, find_if_event_avail };