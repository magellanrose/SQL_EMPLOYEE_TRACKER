const inquirer = require('inquirer');
const PORT = 3001;
const mysql = require('mysql2');


//Create connection to our mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeeTracker_db',
});


// Initial questions when app is started
function initQuestions () {
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
                updateEmployeeRole();
                break;
            case 'Quit':
                connection.end();
                break;
    }
  })
}
function viewDepartments() {}