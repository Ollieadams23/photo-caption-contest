const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { body, validationResult } = require('express-validator');
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: demo_user
 *               email:
 *                 type: string
 *                 example: demo@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Registration failed
 */

// Registration endpoint
router.post('/register', 
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('username').notEmpty().escape().trim().withMessage('Username is required.'),
  async (req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });
    req.session.userId = user.id;
    res.status(201).sendFile(require('path').join(__dirname, '../public/login.html'));
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.' });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: demo@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed
 */

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    req.session.loggedIn = true;
    req.session.isAdmin = !!user.isAdmin;
    if (user.isAdmin) {
      res.status(200).sendFile(require('path').join(__dirname, '../private/admin.html'));
    } else {
      res.status(200).sendFile(require('path').join(__dirname, '../private/profile.html'));
    }
  } catch (err) {
    res.status(500).json({ error: 'Login failed.' });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

// Logout endpoint
router.post('/logout', (req, res) => {
  req.session.loggedIn = false;
  req.session.isAdmin = false;
  res.status(200).json({ message: 'Logged out successfully.' });
});

module.exports = router;
