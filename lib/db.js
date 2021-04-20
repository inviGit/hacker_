const { Pool, Client } = require('pg');

const connectionString = "postgres://xndfzxxdzfzifj:54190778468f669a11fdc0fa41ea5d7fa381fcdbef0564ddf90a820be1b2dbf6@ec2-34-200-94-86.compute-1.amazonaws.com:5432/d8855b2kcnma5c";
const connection = new Client({
  connectionString,
  ssl: true,
})
connection.connect();

module.exports = connection;
