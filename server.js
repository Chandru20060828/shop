const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ❗ Ensure MongoDB URI exists
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined');
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');

    // Routes
    app.use('/api/products', require('./routes/products'));
    app.use('/api/users', require('./routes/users'));
    app.use('/api/orders', require('./routes/orders'));

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });