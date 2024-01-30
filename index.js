const inquirer = require('inquirer');
const PORT = 3001;
const mysql = require('mysql2');


//Create connection to our mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  database: 'employee_tracker',
});
connection.connect((err) => {
  if (err) throw err;

  console.log('Connected to database');

});

// Initial questions when app is started
function initQuestions() {
  inquirer.prompt({
    type: 'list',
    name: 'selected_option',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
    ],
  })
    .then((answers) => {
      switch (answers.selected_option) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployee();
          break;
        default:
          console.log('Quit');

      }
    })
}


function viewDepartments() {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err
    console.table(res)
  })
}

function viewRoles() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err
    console.table(res)
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err
    console.table(res)
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the new department:",
    }).then((answers) => {
      connection.query('INSERT INTO departments SET ?', {department_name: answers.name}, (err, res) => {
        if (err) throw err
        console.table(res);
      })
    })
}

function addRole() { 
  inquirer
  .prompt({
    type: "input",
    name: "name",
    message: "Enter the new role",
  }).then((answers) => {
    connection.query('INSERT INTO roles SET ?', [
      {title: answers.name},
      {salary: answers.name},
      {department_id: answers.name}], 
      (err, res) => {
        if(err) throw err 
        console.table(res);
      })
  })
}

function addEmployee() {
  inquirer
  .prompt({
    type: "input",
    name: "name",
    message: "Enter the name of the new employee",
  }).then((answers) => {
    connection.query('INSERT INTO employee SET ?', [
      {first_name: answers.name},
      {last_name: answers.name},
      {role_id: answers.name}],
      (err, res) => {
        if(err) throw err
        console.table(res);
      })
  })
 }

function updateEmployee() { 
  inquirer
  .prompt({
    type: 'input',
    name: 'name',
    message: 'update employee role',
  }).then((answers) => {
    connection.query('UPDATE employee SET ? WHERE ?', [
      {}
    ])
  })
}


initQuestions();