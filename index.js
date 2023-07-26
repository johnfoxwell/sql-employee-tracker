// Import
const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require("console.table");

// MySql Connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'track_db'
    },
    console.log(`Connected to the track_db database.`)
);


// Start message
console.log("----")
console.log("---- MANAGER DATABASE ----")
console.log("----")


// Show Functions
function showDepartments() {
    db.query("SELECT * FROM department", (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log("Showing All Departments")
        console.log("---------------------")
        console.table(result);
        init();
    });
};

function showRoles() {
    db.query("SELECT role.id, title, salary, department.name FROM role JOIN department ON department.id = role.department_id", (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log("Showing All Roles")
        console.log("---------------------")
        console.table(result);
        init();
    });
};

function showEmployees() {
    db.query("SELECT employee.id, first_name, last_name, role.title, manager_id FROM employee JOIN role ON role.id = employee.role_id", (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log("Showing All Employees")
        console.log("---------------------")
        console.table(result);
        init();
    });
};


// Add Functions
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter new Department name: ",
                name: "name"
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO department(name) VALUES("${response.name}")`,  (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("Department Added")
                console.log("---------------------")
                console.table(result);
                init();
            })
        })
};

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter a title for the new role: ",
                name: "title"
            },
            {
                type: "input",
                message: "Enter a salary for the new role: ",
                name: "salary"
            },
            {
                type: "input",
                message: "Enter the department ID that the new role belongs to: ",
                name: "department"
            },
        ])
        .then((response) => {
            db.query(`INSERT INTO role(title, salary, department_id) VALUES("${response.title}", ${response.salary}, ${response.department})`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("New Role Added")
                console.log("---------------------")
                console.table(result);
                init();
            })
        })
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee's first name: ",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter employee's last name: ",
                name: "last_name"
            },
            {
                type: "input",
                message: "Enter employee's role id: ",
                name: "role"
            },
            {
                type: "input",
                message: "Enter the employee's manager id: ",
                name: "manager"
            },
        ])
        .then((response) => {
            db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${response.first_name}", "${response.last_name}", ${response.role}, ${response.manager})`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("New Employee Added")
                console.log("---------------------")
                console.table(result);
                init();
            })
        })
};


// Update function
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee's id: ",
                name: "id"
            },
            {
                type: "input",
                message: "Enter employee's first name: ",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter employee's last name: ",
                name: "last_name"
            },
            {
                type: "input",
                message: "Enter employee's role id: ",
                name: "role"
            },
            {
                type: "input",
                message: "Enter the employee's manager id: ",
                name: "manager"
            },
        ])
        .then((response) => {
            db.query(`UPDATE employee SET
            first_name = "${response.first_name}",
            last_name = "${response.last_name}",
            role_id = ${response.role},
            manager_id = ${response.manager}
            WHERE id = ${response.id}`,
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("Updated Employee Information")
                console.log("---------------------")
                console.table(result);
                init();
            })
        })
}


// Terminal Prompt
function init() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "start",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "Quit"
                ]
            }
        ])
        .then((response) => {
            const nextQuestion = response.start

            if (nextQuestion === "View All Employees") {
                showEmployees();
            } else if (nextQuestion === "Add Employee") {
                addEmployee();
            } else if (nextQuestion === "Update Employee Role") {
                updateEmployeeRole();
            } else if (nextQuestion === "View All Roles") {
                showRoles();
            } else if (nextQuestion === "Add Role") {
                addRole();
            } else if (nextQuestion === "View All Departments") {
                showDepartments();
            } else if (nextQuestion === "Add Department") {
                addDepartment();
            } else {
                process.exit();
            }
        });
}


// Start prompts
init();