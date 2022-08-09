const inquirer = require("inquirer");
const colourize = '\x1b[33m%s\x1b[0m';
const db = require("../connection");
const queryTable = require('../query');

//#################################
// Add Role Function
//#################################
async function add() {
    // get list of departments from department table
    const departmentList = await queryTable.select('department').then((rows) => {
        return rows;
    });
    //   role questions for inquirer
    const questions = [
        {
            message: 'Enter the role title',
            type: 'input',
            name: 'title',
            validate: (input) => {
                if (input) return true
                else {
                    console.log(colourize, "Title required");
                    return false;
                }
            }
        },
        {
            message: 'Enter the role Salary',
            type: 'input',
            name: 'salary'
        },
        {
            message: 'Enter the department ID',
            type: 'rawlist',
            name: 'department',
            choices: departmentList
        }
    ];
    // run inquirer function
    await inquirer
        .prompt(questions)
        .then((data) => {
            const { title, salary, department } = data;
            // search for the department id based on selection
            const department_id = departmentList.find((departmentChoice => departmentChoice.name == department)).id; 
            return new Promise(function (resolve, reject) {
                // SQL query to add to role table
                db.query("INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)", [title, salary, department_id], function (err, results) {
                    if (err) return reject(err);
                    console.log(colourize, `${title} role added to Database`);
                    resolve('success')
                });
            });
        });
};

module.exports.add = add;