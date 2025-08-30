import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URI + process.env.DB_NAME;

export const connectDB = async () => {
  //
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log(`Connected to ${process.env.DB_NAME} Database!`);
    //
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
