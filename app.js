
const express = require('express');// Import the 'express' module, which is a web application framework for Node.js. This allows us to create a server and handle HTTP requests and responses.
const app = express();// Import the 'express' module and create an instance of it called 'app'.

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

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