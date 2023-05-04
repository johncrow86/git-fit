// Imports
const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get Exercise
app.get('/exercises/:split/:zone', async (req, res) => {
    try {
        const { split, zone } = req.params;
        const exercise = await pool.query(
            "SELECT * FROM exercises WHERE split = $1 AND zone = $2",
            [split, zone]
        );
        res.json(exercise.rows);
    } catch (err) {
        console.error(err);
    }
})

// Create Journal Entry
app.post('/journal', async (req, res) => {
    try {
        const { splitOption, repRangeOption, exercises } = req.body;
        const [ exercise1, exercise2, exercise3, exercise4, exercise5 ] = exercises;
        const newEntry = await pool.query(
            "INSERT INTO journal (split_option, rep_range_option, exercise1_id, exercise2_id, exercise3_id, exercise4_id, exercise5_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [splitOption, repRangeOption, exercise1, exercise2, exercise3, exercise4, exercise5]
        );
        res.json(newEntry.rows[0]);
    } catch (err) {
        console.error(err);
    }
})

// Get All Journal Entries
app.get('/journal', async (req, res) => {
    try {
        const journal = await pool.query("SELECT * FROM journal ORDER BY id");
        res.json(journal.rows);
    } catch (err) {
        console.error(err);
    }
})

// Update Journal Entry
app.put('/journal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;
        const updatedEntry = await pool.query(
            "UPDATE journal SET notes = $1 WHERE id = $2 RETURNING *",
            [notes, id]
        );
        res.json(updatedEntry);
    } catch (err) {
        console.error(err);
    }
})

// Delete A Journal Entries
app.delete('/journal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await pool.query(
            "DELETE FROM journal WHERE id = $1 RETURNING *",
            [id]
        );
        res.json(deletedEntry.rows[0]);
    } catch (err) {
        console.error(err);
    }
})

// Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
  });

// Start The Server
app.listen(5000, () => {
    console.log('server has started on port 5000');
});
