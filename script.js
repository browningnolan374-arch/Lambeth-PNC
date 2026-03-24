const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory database (for now - works without MongoDB)
let officers = [];
let arrests = [];
let reports = [];

// ============= HEALTH CHECK =============
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Lambeth PNC Backend is running' });
});

// ============= AUTH ROUTES =============

// SIGNUP
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { fullname, officeid, badge, email, department, password } = req.body;

    if (!fullname || !officeid || !badge || !email || !department || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Check if officer already exists
    const existingOfficer = officers.find(o => o.officerId === officeid || o.email === email);
    if (existingOfficer) {
      return res.status(400).json({ error: 'Officer ID or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOfficer = {
      id: Date.now().toString(),
      fullName: fullname,
      officerId: officeid,
      badge,
      email,
      department,
      password: hashedPassword,
      createdAt: new Date()
    };

    officers.push(newOfficer);

    res.json({ 
      success: true, 
      message: 'Account created successfully',
      officer: { fullName: fullname, officerId: officeid, badge, email, department }
    });
  } catch (err) {
    res.status(500).json({ error: 'Signup error: ' + err.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const officer = officers.find(o => o.officerId === username || o.email === username);
    if (!officer) {
      return res.status(400).json({ error: 'Officer not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, officer.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: officer.id, officerId: officer.officerId, fullName: officer.fullName },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      officer: {
        id: officer.id,
        fullName: officer.fullName,
        officerId: officer.officerId,
        badge: officer.badge,
        email: officer.email,
        department: officer.department
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login error: ' + err.message });
  }
});

// ============= START SERVER =============

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚔 Lambeth PNC Backend running on port ${PORT}`);
});
