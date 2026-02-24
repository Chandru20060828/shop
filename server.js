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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce').then(() => {
  console.log('MongoDB connected');
  
  // Routes - Register after connection
  app.use('/api/products', require('./routes/products'));
  app.use('/api/users', require('./routes/users'));
  app.use('/api/orders', require('./routes/orders'));

  app.listen(PORT, () => {
    console.log(`\n✅ Server running on port ${PORT}`);
    console.log(`   Open your browser at http://localhost:${PORT}\n`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
