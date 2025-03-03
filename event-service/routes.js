const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.post('/', controllers.event_creator);
router.get('/', controllers.find_all_events);
router.get('/:event_id/availability', controllers.find_if_event_avail);

module.exports = router;