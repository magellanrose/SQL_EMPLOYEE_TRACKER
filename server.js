const mysql = require('mysql2');
const inquirer = require('inquirer');

//Create connection to our mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3001',
  user: 'root',
  password: '',
  database: 'employeeTracker_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
  start();
});
