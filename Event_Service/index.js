const express = require('express');
const cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');
const pool = require('./db');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get("/events", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM events");
        res.json({ message: "Event Service is running", events: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/events", async (req, res) => {
    const { title, desc, date, capacity } = req.body;

    // if (!title || !desc || !date || !capacity) {
    //     return res.status(400).json({ message: "Fill all jj!" });
    // }

    try {
        const result = await pool.query(
            "INSERT INTO events (title, description, date, capacity) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, desc, date, capacity]
        );

        res.status(201).json({ message: "Event created successfully", event: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/events/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Add available spots calculation
        const event = result.rows[0];
        event.available_spots = event.capacity - event.booked;

        res.json(event); // Return full event data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/events/:id/book", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "UPDATE events SET capacity = capacity - 1 WHERE id = $1 AND capacity > 0 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Event is fully booked or does not exist" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT route to mark event as fully booked when capacity reaches 0
app.put("/events/:id/status", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("UPDATE events SET booked = 1 WHERE id = $1 AND capacity = 0", [id]);
        res.json({ message: "Event marked as fully booked" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Event Service running is on port ${PORT}`));