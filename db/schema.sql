DROP DATABASE IF EXISTS employeerecord;
CREATE DATABASE employeerecord;



CREATE TABLE "department"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE "roles"(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department INTEGER NOT NULL,
    FOREIGN KEY (department) REFERENCES "department"(id) ON DELETE SET NULL
);

CREATE TABLE "employee"(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    roleid INTEGER NOT NULL,
    FOREIGN KEY (roleid) REFERENCES "roles"(id) ON DELETE SET NULL,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES "employee"(id) ON DELETE SET NULL
);