const { Pool, Client } = require('pg');

const connectionString = process.env.DATABASE_URL;
const connection = new Client({
  connectionString,
})
connection.connect();

module.exports = connection;
