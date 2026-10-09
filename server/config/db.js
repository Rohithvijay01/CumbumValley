import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agri-app', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}. Attempting local fallback...`);
    try {
      const conn = await mongoose.connect('mongodb://127.0.0.1:27017/agri-app');
      console.log(`Local MongoDB Connected: ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`Local MongoDB Fallback Error: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
