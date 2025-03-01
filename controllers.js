const models = require('./models');

exports.event_creator = async (req, res) => {
  const { title, desc, date, capacity } = req.body;
  if (!title || !desc || !date || !capacity) {
    return res.status(400).json({ message: 'Fill all fields!' });
  }
  try {
    const event = await models.event_creator(title, desc, date, capacity);
    res.status(201).json(event);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.find_all_events = async (req, res) => {
  try {
    const events = await models.find_all_events();
    res.json(events);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.find_if_event_avail = async (req, res) => {
  try {
    const availability = await models.find_if_event_avail(req.params.event_id);
    if (availability === null) return res.status(404).json({ message: 'Event not found' });
   
    res.json({ available: availability });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};