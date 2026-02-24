const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce').then(async () => {
  console.log('✅ Connected to MongoDB');

  // Clear existing users
  await User.deleteMany({});
  console.log('🗑️ Cleared existing users');

  console.log('🎉 Users collection cleared!');
  process.exit();
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
