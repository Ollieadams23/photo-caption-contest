
const express = require('express');// Import the 'express' module, which is a web application framework for Node.js. This allows us to create a server and handle HTTP requests and responses.
const app = express();// Import the 'express' module and create an instance of it called 'app'.
const db = require('./models'); // Import the database models from the 'models' directory. This allows us to interact with the database using Sequelize.

// Set up middleware to parse incoming request bodies as JSON and URL-encoded data.
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory. This allows us to serve HTML, CSS, and JavaScript files to the client.
app.use(express.static(__dirname + '/public'));


// Optional: Test the connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .then(db.User.findAll().then(users => console.log('Users:', users))) // Test fetching users
  .catch(err => console.error('Database connection error:', err));
  



// Set up the server to handle GET requests to the root URL ('/').
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Set up the server to handle GET requests to the '/login' URL.
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Set up the server to handle GET requests to the '/logout' URL.
app.get('/logout', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.post('/auth', (req, res) => {
    if (req.body.username === 'admin' && req.body.password === 'password') {
        res.send('Login successful!');
    } else {
        res.send('Invalid username or password');
    }
});





// Set up the server to listen on port 3000.
app.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});