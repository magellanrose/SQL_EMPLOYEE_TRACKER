USE employeeTracker_db

INSERT INTO departments (department_name) 
VALUES
('Kitchen'),
('Customer Service'),
('Maintence'),
('Cleaning');


INSERT INTO roles (title, salary, department_id) 
VALUES
('Chef', 30000.00, 1),
('Line Cook', 20000.00, 2),
('Front Desk', 20000.00, 3),
('Manager', 29000.00, 4),
('Head Cleaner', 25000.00, 5),
('Floors', 10000.00, 6)



INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
('Sam', 'Smith', 1, 1),
('Jerry', 'Sanchez', 2, 2),
('Eric', 'Cartman', 3, 3),
('Randy', 'Darsh', 4, 4),
('Bobs', 'Burgers', 5, 5),
('George', 'Washington', 6, 6),