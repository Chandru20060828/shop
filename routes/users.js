const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route   POST api/users/register
// @desc    Register user with Password
// @access  Public
router.post('/register', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Please provide name and password' });
  }

  if (!name.includes('@')) {
    return res.status(400).json({ message: 'Username must contain @ symbol' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upsert user: create if not exists, update password if exists
    await User.findOneAndUpdate(
      { name },
      { password: hashedPassword, isVerified: true },
      { upsert: true, new: true }
    );

    res.json({ message: 'Registration successful' });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// @route   POST api/users/login
// @desc    Login user with name
// @access  Public
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json({ msg: 'Please enter name and password' });

  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id, name: user.name } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

module.exports = router;
