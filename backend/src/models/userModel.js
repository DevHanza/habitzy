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
      unique: [true, "You're already registered."],
      match: [
        /^[^@\s+]+@[^@\s]+\.[^@\s]+$/,
        "Please enter a valid email address",
      ],
      trim: true,
      lowercase: true,
      minLength: 5,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "This username is already taken."],
      match: [/^[a-zA-Z][a-zA-Z0-9_]+$/, "Please enter a valid username"],
      trim: true,
      minLength: 2,
      maxLength: 25,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 5,
      maxLength: 150,
    },
    currentStreak: {
      type: Number,
      required: [true, "Current streak is required"],
      min: [0, "Current streak cannot be negative"],
      default: 0,
    },
    longestStreak: {
      type: Number,
      required: [true, "Longest streak is required"],
      min: [0, "Longest streak cannot be negative"],
      default: 0,
    },
    refreshTokens: [
      {
        token: String,
        device: String,
        expiresAt: Date,
      },
    ],
    verifyCodes: [
      {
        code: Number,
        device: String,
        expiresAt: Date,
      },
    ],
  },
  { timestamps: true } // auto-manages createdAt and updatedAt
);

export const User = mongoose.model("User", userSchema);
