const express = require('express');
const { User } = require('../models');
const router = express.Router();


// Serve the profile page (HTML)
router.get('/', (req, res) => {
  if (req.session.loggedIn !== true) {
    return res.redirect('/login');
  }
  res.sendFile(require('path').join(__dirname, '../private/profile.html'));
});

// API endpoint to get user profile data (username, email)
router.get('/data', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;
