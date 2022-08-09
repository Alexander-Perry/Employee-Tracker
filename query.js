const db = require("./connection");

// The main display queries based on parameter sent to function
function select(table) {
    switch (table) {
        case 'department':
            query = "SELECT * FROM department";
            break;
        case 'employee':
            query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT_WS('',m.first_name,' ', m.last_name) AS 'Manager'
                    FROM employee
                    JOIN role ON role.id=employee.role_id 
                    JOIN department ON department.id = role.department_id
                    LEFT JOIN employee m ON employee.manager_id = m.id
                    ORDER BY employee.id`
            break;
        case 'role':
            query = `SELECT role.id, role.title, role.salary, department.name AS 'Department' 
                    FROM role
                    JOIN department ON department.id = role.department_id`;
            break;
        case 'manager':
            query = 'SELECT * FROM employee WHERE manager_id IS NULL';
            break;
        default: return false;
    };
    // Run the SQL query
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, rows) {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

module.exports.select = select;