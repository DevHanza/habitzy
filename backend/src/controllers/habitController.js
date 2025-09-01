import { Habit } from "../models/habitModel.js";

export async function getHabits(req, res) {
  const { userId } = req.params;

  try {
    const habits = await Habit.find({ userId: userId });

    if (!habits) {
      return res
        .status(404)
        .json({ message: "No Habits for this user or wrong User ID." });
    }
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

  console.log(id);
  res.json({ id });
}
export async function getHabitByID(req, res) {}
export async function addHabit(req, res) {}
export async function deleteHabit(req, res) {}
export async function updateHabit(req, res) {}
