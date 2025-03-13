INSERT INTO "department" (name) VALUES
('Engineering'),
('Finance'),
('Marketing');

INSERT INTO "eoles" (title,salary,department) VALUES
('Civil Engineer', 102000, 1),
('Software Engineer', 95000, 1),
('Sales Representative', 84500, 2),
('Sales Manager', 80000, 2),
('Marketing Manager', 76000, 3),
('Marketing Agent', 90000, 3);

INSERT INTO "mployee"(first_name.last_name,role_id,manager_id) VALUES
('Jessica', 'Flores', 1, NULL),
('Ileana', 'Zedler', 2, 1),
('Collin', 'Patterson', 3, NULL),
('Luz', 'Lopez', 4, NULL),
('Tiffany', 'Martinez', 5, NULL),
('Mika', 'Rodriguez', 6, NULL);
