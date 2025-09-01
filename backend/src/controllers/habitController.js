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

export async function addHabit(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(404).json({ message: "userId not found." });
    }

    const habitData = {
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      isCompleted: false,
    };

    const newHabit = new Habit(habitData);
    await newHabit.save();
    res.status(201).json(newHabit);
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}
export async function deleteHabit(req, res) {
  try {
    const { userId, habitId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "userId not found." });
    }

    const deletedHabit = await Habit.deleteOne({
      _id: habitId,
      userId: userId,
    });

    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found." });
    }

    res.json({ message: "Habit  is Deleted.", deletedHabit });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
export async function updateHabit(req, res) {}
