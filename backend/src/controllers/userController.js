import { addUser } from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      currentStreak: 0,
      longestStreak: 0,
      // hello: 6,
    };

    const result = await addUser(newUser);

    res
      .status(201)
      .json({ result, message: "Successfully added the new user." });
    //
  } catch (erroerrr) {
    res
      .status(500)
      .json({ error: err.message, message: "Failed to add the user." });
  }
};
