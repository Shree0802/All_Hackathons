import mongoose from 'mongoose';

export const isMemoryMode = { value: false };

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edutech', {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    isMemoryMode.value = false;
  } catch (error) {
    console.warn(`[MongoDB Warning] Database connection failed: ${error.message}`);
    console.warn(`[EDUTECH System] Switching seamlessly to In-Memory Smart Data Store for instant hackathon execution.`);
    isMemoryMode.value = true;
  }
};
