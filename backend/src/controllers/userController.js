import { User } from "../models/userModel.js";

export async function fetchUsers(req, res) {
  try {
    //
    const users = await User.find();
    res.json(users);
    //
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createUser(req, res) {
  try {
    //
    const userData = {
      name: req.body.name,
      email: req.body.email,
      currentStreak: 0,
      longestStreak: 0,
    };
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json(newUser);
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}
