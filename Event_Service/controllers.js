const models = require('./models');


exports.reduce_event_capacity = async (req, res) => {
    try {
        const event = await models.updateEventCapacity(req.params.event_id);
        if (!event) {
            return res.status(400).json({ message: "Event is already fully booked" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.mark_event_as_fully_booked = async (req, res) => {
    try {
        await models.markEventAsFullyBooked(req.params.event_id);
        res.json({ message: "Event marked as fully booked" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.event_creator = async (req, res) => {
    const { title, desc, date, capacity } = req.body;
    if (!title || !desc || !date || !capacity) {
        return res.status(400).json({ message: 'Fill all jj!' });
    }
    try {
        const event = await models.event_creator(title, desc, date, capacity);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.find_all_events = async (req, res) => {
    try {
        const events = await models.find_all_events();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.find_if_event_avail = async (req, res) => {
    try {
        const event = await models.find_if_event_avail(req.params.event_id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
