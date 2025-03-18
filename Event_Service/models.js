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
  const result = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
  
  if (result.rows.length === 0) return null;
  const event = result.rows[0];
  event.available_spots = event.capacity - event.booked;

  return event;
};

const updateEventCapacity = async (eventId) => {
  const result = await pool.query(
    `UPDATE events 
     SET capacity = capacity - 1 
     WHERE id = $1 AND capacity > 0 
     RETURNING *`,
    [eventId]
  );

  return result.rows[0];
};

const markEventAsFullyBooked = async (eventId) => {
  await pool.query(
    `UPDATE events 
     SET booked = 1 
     WHERE id = $1 AND capacity = 0`,
    [eventId]
  );
};




module.exports = { updateEventCapacity,event_creator, find_all_events, find_if_event_avail,markEventAsFullyBooked, };