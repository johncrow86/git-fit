// Imports
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors"); // needed because server and app are running on different ports
const morgan = require("morgan");
const session = require("express-session");
const { authenticateUser } = require("./validation");

const store = new session.MemoryStore();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"], // * by default. Wildcard value is not allowed when credentials is set to true
    credentials: true // needed for session cookies
}));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));

// Routes
const baseURL = process.env.BASE_URL;

const usersRouter = require('./routes/users');
app.use(`${baseURL}/users`, usersRouter);

const exercisesRouter = require('./routes/exercises');
app.use(`${baseURL}/exercises`, exercisesRouter);

const journalRouter = require('./routes/journal');
app.use(`${baseURL}/journal`, authenticateUser, journalRouter);

// Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
  });

// Start The Server
const port = process.env.EXPRESS_PORT || 5000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});
