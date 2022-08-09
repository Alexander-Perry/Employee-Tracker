const inquirer = require("inquirer");
const colourize = '\x1b[33m%s\x1b[0m';
const db = require("../connection");
const queryTable = require('../query');

//#################################
// Function to add employee
//#################################
async function add() {
    // get list of roles from the role table
    const roleList = await queryTable.select('role').then((rows) => {
        rows.forEach(row => { row.name = row.title });
        return rows;
    });
    // get list of managers (employees with no manager assigned)
    const managerList = await queryTable.select('manager').then((rows) => {
        rows.forEach(row => { row.name = `${row.first_name} ${row.last_name}` });
        return rows;
    });
    // List of questions for inquirer
    const questions = [
        {
            message: 'First Name',
            type: 'input',
            name: 'first_name',
            validate: (input) => {
                if (input) return true
                else {
                    console.log(colourize, "Name required");
                    return false;
                };
            },
        },
        {
            message: 'Last Name',
            type: 'input',
            name: 'last_name',
            validate: (input) => {
                if (input) return true
                else {
                    console.log(colourize, "Surname required");
                    return false;
                };
            },
        },
        {
            message: 'Choose Role',
            type: 'list',
            name: 'role',
            choices: roleList
        },
        {
            message: "Is this a manager?",
            type: "list",
            name: 'ismanager',
            choices: ['Yes', 'No'],
        },
        {
            message: 'Manager ID',
            type: 'list',
            name: 'manager',
            choices: managerList,
            when: (answers) => answers.ismanager === 'No'
        }
    ];
    // Run inquirer function
    await inquirer
        .prompt(questions)
        .then((data) => {
            //    destructure answers
            const { first_name, last_name, role, manager } = data;
            //    find role id based on selected role name
            const role_id = roleList.find((roleChoice => roleChoice.title == role)).id;
            //    check from manager choice, to determine whether to search for the id or not. 
            if (data.ismanager == 'Yes') {
                manager_id = null;
            } else manager_id = managerList.find((managerChoice => managerChoice.name == manager)).id;
            //    Insert the new employee into the database
            return new Promise(function (resolve, reject) {
                db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [first_name, last_name, role_id, manager_id], function (err, results) {
                    if (err) return reject(err);
                    console.log(colourize, `Employee: ${first_name} ${last_name} added to Database`);
                    resolve('success');
                });
            });
        })
};
//#################################
// Function to update employee role
//#################################
async function update() {
    // Get list of roles from the role table
    const roleList = await queryTable.select('role').then((rows) => {
        rows.forEach(row => { row.name = row.title; });
        return rows;
    });
    // get list of employees from the employee table
    const employeeList = await queryTable.select('employee').then((rows) => {
        rows.forEach(row => { row.name = `${row.first_name} ${row.last_name}` });
        return rows;
    });
    // inquirer questions
    const questions = [
        {
            message: 'Please choose which employee to update: ',
            name: 'employee',
            type: 'list',
            choices: employeeList
        },
        {
            message: 'Please choose which role to change the employee to: ',
            name: 'role',
            type: 'list',
            choices: roleList
        }
    ];
    // inquirer function
    await inquirer
        .prompt(questions)
        .then((data) => {
            const { employee, role } = data;
            //   find role id based on selected role choice
            const role_id = roleList.find((roleChoice => roleChoice.title == role)).id;
            //   find employee id based on employee choice
            const employee_id = employeeList.find((employeeChoice => employeeChoice.name == employee)).id;
            //   set the SQL query
            const query = 'UPDATE employee SET role_id=? WHERE ID=?'
            //   run the SQL query
            return new Promise(function (resolve, reject) {
                db.query(query, [role_id, employee_id], function (err, results) {
                    if (err) return reject(err);
                    console.log(colourize, `Employee: ${employee} role changed to ${role}`);
                    resolve('success');
                });
            });
        })
};

// async function viewbyManager() {
// }

// Update manager function
async function updateManager() {
    const employeeList = await queryTable.select('employee').then((rows) => {
        rows.forEach(row => { row.name = `${row.first_name} ${row.last_name}` });
        return rows;
    });
    const managerList = await queryTable.select('manager').then((rows) => {
        rows.forEach(row => { row.name = `${row.first_name} ${row.last_name}` });
        return rows;
    });
    const questions = [
        {
            message: 'Please choose which employee to update: ',
            name: 'employee',
            type: 'list',
            choices: employeeList
        },
        {
            message: 'Select Manager',
            name: 'manager',
            type: 'list',
            choices: managerList
        }
    ];
    await inquirer
        .prompt(questions)
        .then ((data) => {
            const { employee, manager } = data;
            const employee_id = employeeList.find(employeeChoice => employeeChoice.name == employee).id;
            const manager_id = managerList.find(managerChoice => managerChoice.name ==manager).id;
            //   set the SQL query
            const query = 'UPDATE employee SET manager_id=? WHERE ID=?'
            //   run the SQL query
            return new Promise(function (resolve, reject) {
                db.query(query, [manager_id, employee_id], function (err, results) {
                    if (err) return reject(err);
                    console.log(colourize, `Employee: ${employee} manager changed to ${manager}`);
                    resolve('success');
                });
            })
        })
 
};
// Update employee managers.
// View employees by manager.
// View employees by department.

module.exports.add = add;
module.exports.update = update;
module.exports.updateManager = updateManager;
