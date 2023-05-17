const express = require('express');
const db = require('../db/index')
const { validateUsernameMiddleware, validatePasswordMiddleware } = require('../validation')

const router = express.Router();

// Register a new user
router.post('/register', validateUsernameMiddleware, validatePasswordMiddleware, async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if username is already in use
        const results = await db.query(
            "SELECT username FROM users WHERE username = $1",
            [username]
        );
        if (results.rows.length > 0) {
            res.status(409).json({ error: "The username is already in use"})
        }
        // Return the new user
        else {
            const results = await db.query(
                "INSERT INTO users (username, hashed_password) values ($1, $2) RETURNING id, username",
                [username, password]
            );
            // Start the session
            req.session.authenticated = true;
            req.session.userId = results.rows[0].id
            req.session.username = results.rows[0].username;
            res.status(201).json({
                status: "Success",
                data: {
                    users: results.rows[0]
                }
            })
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Error");
    }
})

// Login an existing user
router.post('/login', validateUsernameMiddleware, validatePasswordMiddleware,  async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if username exists
        const results = await db.query(
            "SELECT username FROM users WHERE username = $1",
            [username]
        );
        if (results.rows.length === 0) {
            res.status(404).json({ error: "The user does not exist"});
        }
        // Check if password is correct
        else {
            const results = await db.query(
                "SELECT id, username FROM users WHERE username = $1 AND hashed_password = crypt($2, hashed_password)",
                [username, password]
            );
            if (results.rows.length === 0) {
                res.status(401).json({ error: "Incorrect password"});
            }
            // Return the user
            else {
                // Start the session
                req.session.authenticated = true;
                req.session.userId = results.rows[0].id
                req.session.username = results.rows[0].username;
                res.json({
                    status: "Success",
                    data: {
                        users: results.rows[0]
                    }
                })
            }
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Error");
    }
})

// Log out a user
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(204);
})

// Check if a user is logged in
router.get('/login', (req, res) => {
    if (req.session.authenticated) res.send({ authenticated: true});
    else res.status(401).send({ authenticated: false });
})

module.exports = router;
