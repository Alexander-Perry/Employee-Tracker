INSERT INTO department (id, name)
VALUES  (1, "Sales"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Sales Lead", 100000, 1),
        (2, "Sales Agent", 60000, 1),
        (3, "Lead Engineer", 180000, 2),
        (4, "Software Engineer", 130000,2),
        (5, "Finance Manager", 200000, 3),
        (6, "Payroll Advisor", 80000, 3),
        (7, "Legal Team Lead", 250000,4),
        (8, "Lawyer", 190000,4);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Sarah", "Bailey", 1,null),
        (2, "Scott","Fuller", 2, 1),
        (3, "Robert", "Christopher", 2,1),
        (4, "Sam", "Chand", 3,null),
        (5, "Bob", "Builder", 4,4),
        (6, "Rebecca","Smart",4,4),
        (7, "Vinaya", "Chand", 5,null),
        (8, "Robin","Smith",6,7),
        (9, "Bruce","McAvoy", 7,null),
        (10, "Hannah", "Bobbins", 8,9);
