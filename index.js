// Import
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Start message
console.log("----")
console.log("---- MANAGER DATABASE ----")
console.log("----")

// Terminal Prompt
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
                "Add Roles",
                "View All Departments",
                "Add Departments",
                "Quit"
            ]
        }
    ])
    .then((response) => {
        const nextQuestion = response.name;

        if (nextQuestion === "View All Employees") {
            showEmployees();
        } else if (nextQuestion === "Add Employee") {
            addEmployee();
        } else if (nextQuestion === "Update Employee Role") {
            updateEmployeeRole();
        } else if (nextQuestion === "View All Roles") {
            showRoles();
        } else if (nextQuestion === "Add Roles") {
            addRoles();
        } else if (nextQuestion === "View All Departments") {
            showDepartments();
        } else if (nextQuestion === "Add Departments") {
            addDepartment();
        } else {
            process.exit();
        }
    });