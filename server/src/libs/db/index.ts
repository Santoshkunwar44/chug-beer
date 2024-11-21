import mongoose from "mongoose";
import dotenv from "dotenv";
import { env } from "../../config/env";

dotenv.config();

const mongoURI = env.DATABASE_URL;

if (!mongoURI) {
  throw new Error("MongoDB URI not provided in .env file");
}

const connectDB = async () => {
  try {
    await mongoose.connect(
      env.DATABASE_URL
    );

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

connectDB;
export default connectDB;
