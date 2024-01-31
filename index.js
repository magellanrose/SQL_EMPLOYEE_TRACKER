const inquirer = require('inquirer');
const PORT = 3001;
const mysql = require('mysql2');

// CREATE CONNECTION TO MYSQL DATABASE
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

// INITIAL QUESTIONS WHEN APP IS STARTED
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
      // SWITCH STATEMENT TO HANDLE DIFFERENT USER CHOICES  
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

// FUNCTION TO VIEW ALL DEPARTMENTS
function viewDepartments() {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err
    console.table(res)
    initQuestions();

  })
}

// FUNCTION TO VIEW ALL ROLES
function viewRoles() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err
    console.table(res)
    initQuestions();

  });
}

// FUNCTION TO VIEW ALL EMPLOYEES
function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err
    console.table(res)
    initQuestions();
  });
}

// FUNCTION TO ADD A NEW DEPARTMENT
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
        initQuestions();
      })
    })
}

// FUNCTION TO ADD A ROLE
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
        initQuestions();
      })
  })
}

// FUNCTION TO ADD A NEW EMPLOYEE
function addEmployee() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter the first name of the new employee:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the last name of the new employee:",
    },
  ]).then((answers) => {
    connection.query('INSERT INTO employee SET ?', [
      {first_name: answers.firstName},
      {last_name: answers.lastName},
      {role_id: answers.name}],
      (err, res) => {
        if(err) throw err
        console.table(res);
        initQuestions();
      })
  })
 }

 // FUNCTION TO UPDATE AN EMPLOYEES ROLE
function updateEmployee() { 
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'employeeName',
      message: 'Enter the name of the employee to update:',
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'Enter the new role ID for the employee:',
    },
  ])
  .then((answers) => {
    const { employeeName, newRoleId } = answers;

    connection.query(
      'UPDATE employee SET role_id = ? WHERE CONCAT(first_name, " ", last_name) = ?',
      [newRoleId, employeeName],
      (err, res) => {
        if (err) throw err;
        console.table('Employee role updated successfully!');
        initQuestions();
      }
    );
  });
}

// START THE APP
initQuestions();