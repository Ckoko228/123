const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminModel = require('../models/adminModel');

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required'
      });
    }

    const admin = await adminModel.findByUsername(username);

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h'
      }
    );

    res.json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Login failed'
    });
  }
}

module.exports = {
  login
};