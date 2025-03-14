import inquirer from 'inquirer';
import { client } from './config.js';


const viewDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
};

const viewRoles = async () => {
    const res = await client.query(`
        SELECT role.title, role.id, department.name AS department, role.salary
        FROM role
        JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
};

const viewEmployees = async () => {
    const res = await client.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, m.first_name AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `);
    console.table(res.rows);
};

const addDepartment = async () => {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter department name:'
    });
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Department "${name}" added.`);
};

const addRole = async () => {
    const departmentsRes = await client.query('SELECT * FROM department');
    const departmentChoices = departmentsRes.rows.map(department => ({
        name: department.name,
        value: department.id
    }));

    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role salary:',
            validate: input => !isNaN(input) || 'Please enter a valid salary.'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Choose department for the role:',
            choices: departmentChoices
        }
    ]);

    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Role "${title}" added.`);
};

const addEmployee = async () => {
    const rolesRes = await client.query('SELECT * FROM role');
    const roleChoices = rolesRes.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employeesRes = await client.query('SELECT * FROM employee');
    const managerChoices = employeesRes.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Choose employee role:',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Choose employee manager:',
            choices: managerChoices,
            when: () => managerChoices.length > 0
        }
    ]);

    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id || null]);
    console.log(`Employee "${first_name} ${last_name}" added.`);
};

const updateEmployeeRole = async () => {
    const employeesRes = await client.query('SELECT * FROM employee');
    const employeeChoices = employeesRes.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const rolesRes = await client.query('SELECT * FROM role');
    const roleChoices = rolesRes.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const { employee_id, role_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select employee to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select new role for the employee:',
            choices: roleChoices
        }
    ]);

    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log('Employee role updated.');
};


const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Exiting the application...');
            client.end();
            return;
    }

    
    await mainMenu();
};


mainMenu().catch((err) => console.error(err));