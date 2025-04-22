import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get DB URI and Name from environment variables
const dbUri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

export const connectToDatabase = async () => {
  try {
    if (!dbUri || !dbName) {
      throw new Error('DB_URI and DB_NAME must be set in environment variables');
    }

    // Connect to the MongoDB database using Mongoose
    await mongoose.connect(dbUri, { dbName });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to the database');
  }
};
