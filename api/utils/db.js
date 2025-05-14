import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/feedback_app");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
