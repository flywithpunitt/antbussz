const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Fixed JWT secret (temporary solution)
const JWT_SECRET = 'antbus2025secretkey123';

// Generate JWT
const generateToken = (username) => {
  return jwt.sign({ username }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Fixed credentials
const FIXED_USERNAME = 'Antbus2025';
const FIXED_PASSWORD = 'antbus0987';

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Simple credential check
    if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
      // Generate token
      const token = generateToken(username);

      res.json({
        username: FIXED_USERNAME,
        token
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;