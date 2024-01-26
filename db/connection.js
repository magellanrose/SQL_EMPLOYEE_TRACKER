const mysql = require('mysql2');


//Create connection to our mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeeTracker_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
  start();
});

module.exports = connection;
