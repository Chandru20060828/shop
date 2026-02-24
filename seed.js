const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce').then(async () => {
  console.log('✅ Connected to MongoDB');

  // Clear existing products
  await Product.deleteMany({});
  console.log('🗑️ Cleared existing products');

  const products = [
    {
      name: 'Elegant Evening Dress',
      description: 'A stunning black evening gown perfect for special occasions. Made from premium silk fabric with elegant details.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
      category: 'Evening Dresses',
      stock: 15
    },
    {
      name: 'Casual Summer Dress',
      description: 'Light and breezy dress ideal for summer outings. Perfect for beach trips and casual gatherings.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
      category: 'Casual Dresses',
      stock: 25
    },
    {
      name: 'Party Cocktail Dress',
      description: 'Chic cocktail dress with elegant details. Perfect for parties, weddings, and special events.',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
      category: 'Party Dresses',
      stock: 12
    },
    {
      name: 'Vintage Floral Dress',
      description: 'Beautiful vintage-inspired floral print dress with a timeless design. Comfortable and stylish.',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
      category: 'Vintage',
      stock: 18
    },
    {
      name: 'Professional Work Dress',
      description: 'Elegant dress suitable for office and professional settings. Look sharp and confident at work.',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=80',
      category: 'Professional',
      stock: 20
    },
    {
      name: 'Bohemian Maxi Dress',
      description: 'Free-spirited bohemian maxi dress with flowing fabric. Perfect for relaxed and laid-back vibes.',
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
      category: 'Bohemian',
      stock: 14
    },
    {
      name: 'Elegant Wrap Dress',
      description: 'Timeless wrap dress that flatters every figure. A wardrobe essential for any occasion.',
      price: 74.99,
      image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=600&q=80',
      category: 'Classic',
      stock: 16
    },
    {
      name: 'Romantic Lace Dress',
      description: 'Romantic dress featuring delicate lace details. Perfect for dates and romantic occasions.',
      price: 84.99,
      image: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=600&q=80',
      category: 'Romantic',
      stock: 10
    }
  ];

  await Product.insertMany(products);
  console.log('✅ 8 beautiful dress products added successfully!');
  console.log('🎉 Your Dress Collections store is ready to go!');
  process.exit();
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
