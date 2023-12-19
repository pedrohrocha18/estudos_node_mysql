const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1807.Drika",
  database: "db_fixando",
});

module.exports = pool;
