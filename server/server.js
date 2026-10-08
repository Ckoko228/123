const express = require('express');
const path = require('path');

const pool = require('./utils/database');

const serviceRoutes = require('./routes/serviceRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const pageRoutes = require('./routes/pageRoutes');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/services', serviceRoutes);
app.use('/api/projects', portfolioRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS test');

    res.json({
      message: 'Server is working',
      database: rows
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Database connection error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});