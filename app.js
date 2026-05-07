
const express = require('express');// Import the 'express' module, which is a web application framework for Node.js. This allows us to create a server and handle HTTP requests and responses.
const app = express();// Import the 'express' module and create an instance of it called 'app'.
const db = require('./models'); // Import the database models from the 'models' directory. This allows us to interact with the database using Sequelize.


app.use(express.json());// Set up middleware to parse incoming request bodies as JSON. This allows us to access the data sent in the body of HTTP requests as JavaScript objects.

// Set up middleware to parse incoming request bodies as JSON and URL-encoded data.
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory. This allows us to serve HTML, CSS, and JavaScript files to the client.
app.use(express.static(__dirname + '/public'));


const bcrypt = require('bcrypt');

//hash a hard coded pass
// bcrypt.hash('test', 10, (err, hash) => {
//   if (err) {
//     console.error('Error hashing password:', err);
//     } else {
//         console.log('Hashed password:', hash);
//     }
// });


const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));
// Auth routes
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);


app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});


// Optional: Test the connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .then(db.User.findAll().then(users => console.log('Users:', users))) // Test fetching users
  .catch(err => console.error('Database connection error:', err));
  

//include images route
const imagesRouter = require('./routes/images');
app.use('/images', imagesRouter);

//captions route
const captionsRouter = require('./routes/captions');
app.use('/captions', captionsRouter);

// Set up the server to handle GET requests to the root URL ('/').
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});








// Set up the server to listen on port 3000.
app.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});