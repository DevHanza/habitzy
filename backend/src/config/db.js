import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  //
  try {
    
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });

    console.log(`Connected to ${process.env.DB_NAME} Database!`);
    //
  } catch (error) {
    console.log("Error: ", error.message);
    process.exit(1);
  }
};
