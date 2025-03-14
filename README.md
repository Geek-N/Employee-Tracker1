Employee Management System

Description

The Employee Management System is a command-line application that allows business owners to manage employee information, including departments, roles, and employee data. The system enables users to interact with a PostgreSQL database to perform CRUD (Create, Read, Update, Delete) operations via a user-friendly command-line interface using Node.js, Inquirer, and PostgreSQL.

Key Features:
View all departments, roles, and employees.
Add new departments, roles, and employees.
Update employee roles.
Utilize PostgreSQL for data storage and Inquirer for user interactions.
User Story

As a business owner, I want to be able to view and manage the departments, roles, and employees in my company So that I can organize and plan my business effectively.

Acceptance Criteria

Command-Line Interface (CLI):
Upon starting the application, the user is presented with options to:
View all departments.
View all roles.
View all employees.
Add a department.
Add a role.
Add an employee.
Update an employee's role.
View all departments:
Displays a formatted table showing department names and department IDs.
View all roles:
Displays job titles, role IDs, the department each role belongs to, and the salary for each role.
View all employees:
Displays a formatted table with employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers.
Add a department:
Prompts the user to enter the name of a new department, which is then added to the database.
Add a role:
Prompts the user to enter a name, salary, and department for a new role, which is then added to the database.
Add an employee:
Prompts the user to enter the employee's first name, last name, role, and manager, and adds the employee to the database.
Update an employee's role:
Prompts the user to select an employee and their new role, and updates this information in the database.
Database Schema

The system is designed with the following PostgreSQL tables:

Department Table:
id (SERIAL PRIMARY KEY)
name (VARCHAR(30) UNIQUE NOT NULL)
Role Table:
id (SERIAL PRIMARY KEY)
title (VARCHAR(30) UNIQUE NOT NULL)
salary (DECIMAL NOT NULL)
department_id (INTEGER NOT NULL, foreign key to the Department table)
Employee Table:
id (SERIAL PRIMARY KEY)
first_name (VARCHAR(30) NOT NULL)
last_name (VARCHAR(30) NOT NULL)
role_id (INTEGER NOT NULL, foreign key to the Role table)
manager_id (INTEGER, foreign key to another employee, NULL if no manager)
Getting Started

Prerequisites
Install Node.js and npm (Node Package Manager) on your system.
Install PostgreSQL and create a database for the application.
Installation
Clone the repository:
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
Install the required npm packages:
npm install
Ensure you have Inquirer version 8.2.4 installed:
npm i inquirer@8.2.4
Set up your PostgreSQL database with the schema described above, and ensure your credentials are correctly configured in your application.
Running the Application
To run the application, use the following command in your terminal:

node index.js
Follow the prompts in the command line interface to manage departments, roles, and employees.

Walkthrough Video

A walkthrough video demonstrating the functionality of the Employee Management System will show all the acceptance criteria being met. This includes:

How to interact with the application from the command line.
A demonstration of viewing and managing departments, roles, and employees.
The update functionality for employee roles.
[Insert Walkthrough Video Link Here]

Bonus Features

In addition to the core functionality, the application has bonus features that can be implemented to further enhance the user experience:

Update employee managers.
View employees by manager.
View employees by department.
Delete departments, roles, and employees.
View the total utilized budget of a department, calculated as the combined salaries of all employees in that department.
Contributing

If you'd like to contribute to the project, please fork the repository and create a pull request with your improvements. Be sure to follow best practices for file structure, naming conventions, and code quality.

License

This project is licensed under the MIT License - see the LICENSE file for details.

