const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. GET ALL EMPLOYEES (Read)
app.get('/api/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return res.status(500).json({ error: 'Database fetch failed' });
        }
        res.json(results);
    });
});

// 2. ADD NEW EMPLOYEE (Create)
app.post('/api/employees', (req, res) => {
    const { name, email, department, salary } = req.body;
    const query = 'INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, email, department, salary], (err, result) => {
        if (err) {
            console.error('Error inserting employee:', err);
            return res.status(500).json({ error: 'Database insertion failed' });
        }
        res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
    });
});

// 3. UPDATE EMPLOYEE (Update)
app.put('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, department, salary } = req.body;
    const query = 'UPDATE employees SET name = ?, email = ?, department = ?, salary = ? WHERE id = ?';
    
    db.query(query, [name, email, department, salary, id], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: 'Database update failed' });
        }
        res.json({ message: 'Employee updated successfully' });
    });
});

// 4. DELETE EMPLOYEE (Delete)
app.delete('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM employees WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ error: 'Database deletion failed' });
        }
        res.json({ message: 'Employee deleted successfully' });
    });
});

// Base Route
app.get('/', (req, res) => {
    res.send('Employee Management API is working perfectly!');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});