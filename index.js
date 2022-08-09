const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const colourize = '\x1b[33m%s\x1b[0m';
const department = require('./lib/department');
const employee = require('./lib/employee')
const role = require('./lib/role');
const db = require('./connection');
const queryTable = require('./query');

// Main Menu function
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
      'Update an Employee role',
      'Quit'
    ],
  }];
  inquirer
    .prompt(questions)
    .then(async (data) => {
      // Run relevant functions based on selection
      switch (data.name) {
        case 'View all Departments':
          await queryTable.select("department").then((rows) => {
            console.table(rows);
            mainMenu();
          })
          break;
        case 'View all Roles':
          await queryTable.select("role").then((rows) => {
            console.table(rows);
            mainMenu();
          })
          break;
        case 'View all Employees':
          await queryTable.select("employee").then((rows) => {
            console.table(rows);
            mainMenu();
          })
          break;
        case 'Add a Department':
          await department.add();
          mainMenu();
          break;
        case 'Add a Role':
          await role.add();
          mainMenu();
          break;
        case 'Add an Employee':
          await employee.add();
          mainMenu();
          break;
        case 'Update an Employee role':
          await employee.update();
          mainMenu();
          break;
        case 'Quit':
          process.exit();
        default: return;
      };
    });
};

// Initialise
function init() {
  console.log('\n')
  console.log('##############################');
  console.log('##                          ##');
  console.log('##     Employee Tracker     ##');
  console.log('##                          ##');
  console.log('##############################');
  console.log('\n')
  mainMenu();
};
init();

