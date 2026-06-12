-- Create Database Script for Employee Management System
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

-- Table Structure for Employees
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Dummy Data for Demonstration
INSERT INTO employees (name, email, department, salary) VALUES
('Avi Patel', 'patelalex1164@gmail.com', 'ITI', 50000.00),
('Akshay Kumar', 'snwh@gmail.com', 'Osis', 5641.00),
('Daksh Nehra', 'nehra@gmail.com', 'Software', 1200.00);