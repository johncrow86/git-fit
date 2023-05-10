const express = require('express');
const router = express.Router();
const db = require('../db/index')

// Validation
const { validateNoteMiddleware } = require('../validation')

// Get All Journal Entries
router.get('/', async (req, res) => {
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

// Get Journal Entry
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sqlQuery = `
            SELECT 
                j.id, 
                j.workout_date, 
                j.split_option, 
                j.rep_range_option, 
                e1.name AS exercise1_name, 
                e2.name AS exercise2_name, 
                e3.name AS exercise3_name, 
                e4.name AS exercise4_name, 
                e5.name AS exercise5_name,
                j.notes
            FROM 
                journal AS j 
                JOIN exercises e1 ON j.exercise1_id = e1.id
                JOIN exercises e2 ON j.exercise2_id = e2.id
                JOIN exercises e3 ON j.exercise3_id = e3.id
                JOIN exercises e4 ON j.exercise4_id = e4.id
                JOIN exercises e5 ON j.exercise5_id = e5.id
            WHERE j.id = $1
        `;
        const results = await db.query(sqlQuery, [id]);
        res.json({
            status: "Success",
            results: results.rows.length,
            data: {
                journal: results.rows[0]
            }
        })
    } catch (err) {
        console.error(err);
        res.status(400).send("Error")
    }
})

// Create Journal Entry
router.post('/', async (req, res) => {
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
router.put('/:id', validateNoteMiddleware, async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;
