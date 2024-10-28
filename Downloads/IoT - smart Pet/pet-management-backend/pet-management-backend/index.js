const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mysql = require('mysql');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

const db = mysql.createPool({
  host: 'smart-pet-guardian.cj0aig6qa4vd.eu-north-1.rds.amazonaws.com', 
  user: 'admin', 
  password: '123456789', 
  database: 'Smart-Pet-Guardian' 
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Database connected successfully');
  connection.release(); // Release the connection
});



app.post('/register', (req, res) => {
  const { userid , username, password, email, confirm_email } = req.body;

 
  // Compare email with confirm email
  if (email !== confirm_email) {
    return res.redirect('/registration.html?error=emailMismatch');
  }



  // Insert registration data into MySQL database
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).send('Error connecting to database');
    }

    const sql = 'INSERT INTO User (userid, username, password, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [userid, username, password, email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // Username already exists
        //alert('User Already Exists')
        return res.redirect('/registration.html?error=userExists');
      } else {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error registering user');
      }
    }
    console.log('User registered successfully');
    return res.redirect('/registration.html?success=true');
    });

    });

});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to check if the user exists and credentials are correct
  const sql = 'SELECT * FROM User WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send('Error logging in');
    }
    if (result.length === 0) {
      // User not found or credentials are incorrect
      return res.redirect('/login.html?error=invalidCredentials');
    }
    // User authenticated, redirect to dashboard or homepage
    return res.redirect(`/dashboard.html?username=${username}`)
  });
});

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(4000);


