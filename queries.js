const express = require("express");
const router = express.Router();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dvdrental",
  password: "postgres",
  port: 5432,
})


module.exports = {
  pool,
  router
};

