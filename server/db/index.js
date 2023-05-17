const { Pool } = require("pg");

// Environment variables MUST be set to call pool with no arguments.
// No need to require dotenv if the variables follow the proper naming convention in the env file.
const pool = new Pool();

module.exports = pool;


// The Pool call above with env variables is equivalent to the pool call below.
// const pool = new Pool({
//     user: 'gitfituser',
//     host: 'localhost',
//     database: 'gitfit',
//     password: 'gitfituser',
//     port: 5432
// });
