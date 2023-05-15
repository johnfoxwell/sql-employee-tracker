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
        console.log(response.start)
    })