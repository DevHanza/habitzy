import { getHabits } from "../models/habitModel";

export const fetchHabits = async (req, res) => {
  try {
    const habits = await getHabits();
    // res.status(200).json(habits);
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the habits." });
  }
};
