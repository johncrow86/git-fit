const express = require('express');
const db = require('../db/index')

const router = express.Router();

// Get Exercises by Split
router.get('/:split', async (req, res) => {
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
        res.status(400).send("Error");
    }
})

// Get Exercises by Split and Zone
router.get('/:split/:zone', async (req, res) => {
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
        res.status(400).send("Error");
    }
})

module.exports = router;
