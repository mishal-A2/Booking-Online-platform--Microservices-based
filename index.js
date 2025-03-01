const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/events', routes);


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Event Service running is on port ${PORT}`));