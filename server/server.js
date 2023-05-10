// Imports
require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
const baseURL = process.env.BASE_URL;
// Exercises Route
const exercisesRouter = require('./routes/exercises')
app.use(`${baseURL}/exercises`, exercisesRouter);
// Journal Router
const journalRouter = require('./routes/journal')
app.use(`${baseURL}/journal`, journalRouter);

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
