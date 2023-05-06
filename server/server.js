// Imports
require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const db = require('./db/index');

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
// Get Exercises by Split
app.get('/api/v1/exercises/:split', async (req, res) => {
    try {
        const { split } = req.params;
        const results = await db.query(
            "SELECT * FROM exercises WHERE split = $1",
            [split]
        );
        res.json({
            status: "Success",
            results: results.rows.length,
            data: {
                exercises: results.rows
            }
        })
    } catch (err) {
        console.error(err);
        res.status(400).send("Error")
    }
})

// Get Exercises by Split and Zone
app.get('/api/v1/exercises/:split/:zone', async (req, res) => {
    try {
        const { split, zone } = req.params;
        const results = await db.query(
            "SELECT * FROM exercises WHERE split = $1 AND zone = $2",
            [split, zone]
        );
        res.json({
            status: "Success",
            results: results.rows.length,
            data: {
                exercises: results.rows
            }
        })
    } catch (err) {
        console.error(err);
        res.status(400).send("Error")
    }
})

// Get All Journal Entries
app.get('/api/v1/journal', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM journal ORDER BY id");
        res.json({
            status: "Success",
            results: results.rows.length,
            data: {
                journal: results.rows
            }
        })
    } catch (err) {
        console.error(err);
        res.status(400).send("Error")
    }
})

// Create Journal Entry
app.post('/api/v1/journal', async (req, res) => {
    try {
        const { splitOption, repRangeOption, exercises } = req.body;
        const [ exercise1, exercise2, exercise3, exercise4, exercise5 ] = exercises;
        const newEntry = await db.query(
            "INSERT INTO journal (split_option, rep_range_option, exercise1_id, exercise2_id, exercise3_id, exercise4_id, exercise5_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [splitOption, repRangeOption, exercise1, exercise2, exercise3, exercise4, exercise5]
        );
        res.status(201).json({
            status: "Success",
            data: {
                entry: newEntry.rows[0]
            }
        })
    } catch (err) {
        console.error(err);
        res.status(400).send("Error")
    }
})

// Update Journal Entry
app.put('/api/v1/journal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;
        const updatedEntry = await db.query(
            "UPDATE journal SET notes = $1 WHERE id = $2 RETURNING *",
            [notes, id]
        );
        res.json({
            status: "Success",
            data: {
                entry: updatedEntry.rows[0]
            }
        })
    } catch (err) {
        console.error(err);
        res.status(400).send("Error")
    }
})

// Delete Journal Entry
app.delete('/api/v1/journal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await db.query(
            "DELETE FROM journal WHERE id = $1 RETURNING *",
            [id]
        );
        res.status(204).json(deletedEntry.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error")
    }
})

// Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
  });

// Start The Server
const port = process.env.EXPRESSPORT || 5000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});
