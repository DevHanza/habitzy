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
      match: [/^.+@.+$/, "Please enter a valid email address"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "This username is already taken."],
      match: [/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, "Please enter a valid username"],
      /* 
      Regex explanation for validating a username:
      ^                   → start of the string
      [a-zA-Z]            → first character must be a letter (uppercase or lowercase)
      [a-zA-Z0-9_]{2,15}  → next 2 to 15 characters can be letters, numbers, or underscores
      $                   → end of the string
      length allowed: 3 to 16 characters 
      */
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
