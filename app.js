const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000;

app.use(express.json());

app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Add your MySQL password if set
    database: 'dearborn_safetynet' // Replace with your database name
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
db.connect((err) => {
    if (err) {
      console.error('Database connection error:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }
  
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Error registering user.' });
      }
      return res.status(200).json({ message: 'Registration successful!' });
    });
  });
  

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password.' });
      }
    
      // Query to check if the user exists with the provided name, email, and password
      const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
      
      db.query(sql, [email, password], (err, results) => {
        if (err) {
          console.error('Error checking login:', err);
          return res.status(500).json({ message: 'Error logging in. Please try again.' });
        }
        
        // Check if any user matches the provided credentials
        if (results.length > 0) {
          const user = results[0];
          return res.status(200).json({ user: user });
        } else {
          return res.status(401).json({ message: 'email, or password.' });
        }
      });
    });
    
      app.get('/incidents', (req, res) => {
        console.log('Incident Page');
        const sql = 'SELECT * FROM incidents';
        db.query(sql, (err, results) => {
          if (err) {
            console.error('Error fetching incidents:', err);
            return res.status(500).json({ message: 'Error fetching incidents' });
          }
          res.status(200).json(results);
        });
      });
    
      app.post('/incidents', (req, res) => {
        const { title, description, location, photoURL, user_id } = req.body;
      
        if (!title || !description || !location) {
          return res.status(400).json({ message: 'Please fill in all fields.' });
        }
      
        const sql = 'INSERT INTO incidents (title, description, location, photo, user_id) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [title, description, location, photoURL, user_id], (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error registering user.' });
          }
          return res.status(200).json({ message: 'Report succefully was added!' });
        });
      });
  
