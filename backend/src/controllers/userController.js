import { User } from "../models/userModel.js";

export async function getUsers(req, res) {
  try {
    //
    const users = await User.find();
    res.json(users);
    //
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getUserByID(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    //
    res.status(200).json(user);
    //
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function addUser(req, res) {
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

export async function deleteUser(req, res) {}

export async function updateUser(req, res) {}
