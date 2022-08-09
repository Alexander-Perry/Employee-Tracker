const inquirer = require("inquirer");
const colourize = '\x1b[33m%s\x1b[0m';
const db = require("../connection");

//#################################
// add Department Function
//#################################
async function add() {
    // Questions for inquirer
    const questions = [{
        message: 'What department would you like to Add?',
        name: 'name',
        type: 'input',
        validate: (input) => {
            if (input) return true
            else {
                console.log(colourize, "Department Name required");
                return false;
            };
        }
    }];
    // run inquirer function
    await inquirer
        .prompt(questions)
        .then((data) => {
            return new Promise(function (resolve, reject) {
                // update database
                db.query("INSERT INTO department(name) VALUES (?)", data.name, function (err, rows) {
                    if (err) return reject(err);
                    console.log(colourize, `${data.name} department added to Database`);
                    resolve(rows);
                })
            });
        });
};

module.exports.add = add;