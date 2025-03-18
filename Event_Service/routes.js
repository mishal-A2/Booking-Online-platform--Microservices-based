const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.post('/', controllers.event_creator);
router.get('/', controllers.find_all_events);
router.get('/:event_id', controllers.find_if_event_avail);
router.put("/:event_id/book", controllers.reduce_event_capacity);
router.put("/:event_id/status", controllers.mark_event_as_fully_booked);


module.exports = router;