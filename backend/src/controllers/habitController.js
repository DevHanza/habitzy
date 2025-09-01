import { Habit } from "../models/habitModel.js";

export async function getHabits(req, res) {
  try {
    const { userId } = req.params;
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

//
export async function getHabitByID(req, res) {
  try {
    const { userId, habitId } = req.params;
    const habit = await Habit.find({
      _id: habitId,
      userId: userId,
    });

    if (!habit) {
      return res.status(404).json({ message: "No habit found." });
    }

    res.json(habit);
  } catch (errr) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteHabit(req, res) {}
export async function updateHabit(req, res) {}
