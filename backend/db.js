const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ujju@2026', // Double-check that your real password is here!
  database: 'employee_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Database Connection Failed:');
    console.error(err);
  } else {
    console.log('Database Connected Successfully');
  }
});

// This ensures server.js can call db.query directly
module.exports = connection;