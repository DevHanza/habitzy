import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^.+@.+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    currentStreak: {
      type: Number,
      required: [true, "Current streak is required"],
      min: [0, "Current streak cannot be negative"],
    },
    longestStreak: {
      type: Number,
      required: [true, "Longest streak is required"],
      min: [0, "Longest streak cannot be negative"],
    },
  },
  { timestamps: true } // auto-manages createdAt and updatedAt
);

export const User = mongoose.model("User", userSchema);
