USE employeeTracker_db;

INSERT INTO departments(department_name) VALUES 
("Management"),
("Sales"),
("IT"),
("Human Resources"),
("Finance"),
("Accounting"),
("Design");

INSERT INTO roles(title, salary, department_id) VALUES
("Lead", 180000, 1),
("Sales Rep", 100000, 2),
("Software Engineer", 110000, 3),
("HR Rep", 90000, 4),
("Accountant", 90000, 6),
("Corportate Finance", 100000, 5);

INSERT INTO employees(first_name, last_name, role_id) VALUES
("Mike", "Jordan", 1),
("May", "Day", 4),
("Coors", "Light", 2),
("Cate", "Blanchett", 3),
("Idris", "Elba", 6),
("Kate", "Winslet", 5);

