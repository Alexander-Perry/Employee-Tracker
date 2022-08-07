const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const colourize = '\x1b[33m%s\x1b[0m';

// Create the mysql connection 
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );
  
function mainMenu() {
  const questions = [{
    message: 'What would you like to do?',
    name: 'name',
    type: 'list',
    choices: [
      'View all Departments',
      'View all Roles',
      'View all Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee role'
    ],
  }];
  inquirer
    .prompt(questions)
    .then((data) => {
      switch (data.name) {
        case 'View all Departments':
          displayFromDB("department");
          break;
        case 'View all Roles':
          displayFromDB("role");
          break;
        case 'View all Employees':
          displayFromDB("employee");
          break;
        case 'Add a Department':
          addDepartment("Senior Management");
          break;
        // case 'Add a Role':
        //   break;
        // case 'Add an Employee':
        //   break;
        // case 'Update an Employee role':
        //   break;
        default: return;
      };
    });
};

function displayFromDB(table) {
  switch (table) {
    case 'department':
      db.promise().query("SELECT * FROM department").then(([rows]) => {
        console.table(rows);
      }).catch(console.log).then(() => {
        mainMenu();
      });
      break;
    case 'employee':
      db.promise().query("SELECT * FROM employee").then(([rows]) => {
        console.table(rows);
      }).catch(console.log).then(() => {
        mainMenu();
      });
      break;
    case 'role':
      db.promise().query("SELECT * FROM role").then(([rows]) => {
        console.table(rows);
      }).catch(console.log).then(() => {
        mainMenu();
      });
      break;
    default:
      console.log('Error');
      mainMenu();
  }
};

function addDepartment(department) {
  db.query("INSERT INTO department(name) VALUES (?)", department, function (err, results) {
    console.log(colourize, `${department} department added to Database`);
  });
  displayFromDB('department');  
};



function init(){
  mainMenu();
};
init();


// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: 
// view all departments, 
// view all roles, 
// view all employees, 
// add a department, 
// add a role, 
// add an employee, 
// update an employee role

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database