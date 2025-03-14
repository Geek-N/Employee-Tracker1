INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Marketing'),
('Human Resources');


INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 70000, 1),
('Software Engineer', 90000, 2),
('Marketing Specialist', 60000, 3),
('HR Coordinator', 55000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, NULL),  
('Bob', 'Smith', 2, 1),         
('Charlie', 'Brown', 3, 1),    
('David', 'Lee', 4, 2);         