const mongoose = require('mongoose');
require('dotenv').config();

console.log('=== Database Connection Starting ===');
console.log('MongoDB URI:', process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;