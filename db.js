const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Default XAMPP MySQL user
    password: '',        // Leave empty if no password set
    database: 'dearborn_safetynet'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('MySQL connected!');
});

module.exports = db;
