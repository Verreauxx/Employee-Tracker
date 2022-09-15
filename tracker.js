const inquirer = require("inquirer");
const mysql = require("mysql");
//Table
const cTable = require("console.table");

//Choices 
const choiceOptions = ["View all employees", "View all departments", "View all roles", "Update role", "Add department", "Add employee", "Remove employee", "Exit"]

const connection = mysql.createConnection({
    host: 'localhost',

    //Create a port
    port: 3306,

    //Username
    user: 'root',

    //password
    password: 'Tino@2002',
    database: 'employeeTracker_db',
});

console.log(`Welcome to the Employee Tracker! What would you like to do?`);

const start = () => {
    inquirer.prompt(
        {
            name: "optionChoices",
            type: 'list',
            message: "Please select an option?",
            choices: choiceOptions

        }).then(answer => {
            switch (answer.optionChoices){
                case "View all employees":
                 viewEmployees();
                 break;
                case "View all departments":
                 viewDepartment();
                 break;
                case "View all roles":
                 viewRoles();
                 break;
                 case "Update role":
                 updateRole();
                 break;
                case "Add department":
                 addDepartment();
                 break;
                case "Add employee":
                 addEmployee();
                 break;
                 case "Remove employee":
                 removeEmployee();
                 break;
                case "Exit":
                    console.log("Thank you for using Employee Tracker!");
                    connection.end();
                 break;
                
                };   
            });
        };

         // VIEW ALL EMPLOYEES
         const viewEmployees = () => {
            connection.query (`SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
            FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id
            LEFT JOIN employees m ON m.id = e.manager_id ORDER BY e.id;`, (err, res) => {
                if (err) throw err;
                console.table("All Employees", res);
                start();
            });
        };

        // VIEW DEPARTMENT
        const viewDepartment = () => {
            connection.query(`SELECT * FROM departments`, (err, res) => {
                if (err) throw err;
                console.table("All Departments", res);
                start();
            });
        };

        // VIEW ROLES
        const viewRoles = () => {
            connection.query(`SELECT * FROM roles`, (err, res) => {
                if (err) throw err;
                console.table("All Roles", res);
                start();
            });
        };

         // UPDATE ROLE
         const updateRole = () => {
                inquirer.prompt([
                {
                    name: "updateName",
                    type: "input",
                    message: "Which employee would you like to update: 1. Mike, 2. May, 3. Coors, 4. Cate, 5. Idris, 6. Kate?",
                    choices: [1,2,3,4,5,6]
                },
                {
                    name: "updateRole",
                    type: "list",
                    message: "Enter the new role id: 1. Management, 2. Sales , 3. IT , 4: Human Resources , 5. Finance , 6. Accounting , 7. Design",
                    choices: [1,2,3,4,5,6,7]

                }]).then(answer => {
                    connection.query(`UPDATE employees SET role_id = ${answer.updateRole} WHERE id = ${answer.updateName}`,  (err, res) => {
                        if (err) throw err;
                    console.table("Updated Roles", res);
                    start();
                    });
                });
        };

        // ADD DEPARTMENT
        const addDepartment = () => {
            inquirer.prompt([
                {
                    name: "addDept",
                    type: "input",
                    message: "What is the name of the department you want to add?"

                }]).then(answer => {
                    connection.query(`INSERT INTO departments (department_name) VALUES ("${answer.addDept}")`, (err, res) => {
                    if (err) throw err;
                    console.table("Add Department", res);
                    start();
                });
            });
        };

        // ADD EMPLOYEE
        const addEmployee = () => {
            inquirer.prompt([
                {
                    name: "addFName",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "addLName",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "addEmpRole",
                    type: "input",
                    message: "What is the employee's Role - 1: Management, 2: Sales, 3: IT, 4: Human Resources, 5: Finance, 6: Accounting, 7: Design?"
                },
                {
                    name: "addEmpManager",
                    type: "input",
                    message: "What is the employee's manager's ID - 1: Mike Jordan, 2: May Day, 3: Coors Light, 4: Cate Blanchett , 5: Idris Elba, 6: Kate Winslet?"

                }]).then(res => {
                    connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.addFName, res.addLName, res.addEmpRole, res.addEmpManager], (err, res) => {
                    if (err) throw err;
                    console.table("Successfully Inserted");
                    start();
                    });
                });
            };

        // REMOVE EMPLOYEE
        const removeEmployee = () => {
                    connection.query(`SELECT employees.first_name, employees.id FROM employees`, (err, res) => {
                        if (err) throw err;
                    });
                inquirer.prompt([
                    {
                        name: 'removeID',
                        type: 'input',
                        message: "Which employee ID would you like to remove?",
                    }
                ]).then(answer => {
                    connection.query(`DELETE FROM employees WHERE id = ?`, [answer.removeID], (err, res) => {
                        if (err) throw err;
                        console.log("Successfully deleted");
                        start();
                    });
                });
            };


    connection.connect(err => {
    if(err) throw err;
      start();
    });