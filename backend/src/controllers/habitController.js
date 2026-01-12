import { Habit } from "../models/habitModel.js";
import { DailyLog } from "../models/dailyLogModel.js";
import normalizeDate from "../utils/normalizeDate.js";

export async function getHabits(req, res) {
  try {
    const userId = req.user.userId;

    if (!userId) {
      res.status(404).json({ message: "User not found." });
    }

    const habits = await Habit.find({ userId: userId }).select(
      "_id icon title description isCompleted"
    );

    if (!habits) {
      return res
        .status(404)
        .json({ message: "No habits found for this user." });
    }

    res.json(habits);
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: err.message });
  }
}

export async function addHabit(req, res) {
  try {
    const userId = req.user.userId;
    const { title, description, icon } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    if (!icon) {
      return res.status(400).json({ message: "Icon is required." });
    }

    const habitData = {
      userId,
      icon,
      title,
      description: description ? description : "",
    };

    const newHabit = new Habit(habitData);
    await newHabit.save();

    res.status(201).json({
      message: "Habit created successfully.",
      _id: newHabit._id,
    });
    //
  } catch (err) {
    //
    // console.log(err);
    res.status(400).json({ message: err.message });
    //
  }
}

export async function updateHabit(req, res) {
  try {
    //
    const userId = req.user.userId;
    const { habitId } = req.params;

    if (!req.body) {
      return res.status(400).json({
        message: "At least one field must be provided.",
      });
    }

    const { icon, title, description, isCompleted } = req.body;
    const newHabitData = { icon, title, description, isCompleted };

    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!habitId) {
      return res.status(400).json({ message: "Habit ID is required." });
    }

    // Check if, all the fields are empty?

    const allFieldsEmpty = Object.values(newHabitData).every(
      (value) => value === undefined
    );

    if (allFieldsEmpty) {
      return res.status(400).json({ message: "No fields provided to update." });
    }

    const updatedHabit = await Habit.findOneAndUpdate(
      {
        _id: habitId,
        userId: userId,
      },
      { $set: newHabitData },
      { new: true, runValidators: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found." });
    }

    res.json({
      message: "Habit updated successfully.",
      _id: updatedHabit._id,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

export async function deleteHabit(req, res) {
  try {
    //
    const userId = req.user.userId;
    const { habitId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!habitId) {
      return res.status(400).json({ message: "Habit ID is required." });
    }

    const deletedHabit = await Habit.findOneAndDelete({
      _id: habitId,
      userId: userId,
    });

    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found." });
    }

    res.json({
      message: "Habit deleted successfully.",
      _id: deletedHabit._id,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

export async function toggleHabitStatus(req, res) {
  try {
    //
    const userId = req.user.userId;
    const { habitId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!habitId) {
      return res.status(400).json({ message: "Habit ID is required." });
    }

    const habit = await Habit.findById(habitId).lean();

    if (!habit) {
      return res.status(404).json({ message: "Habit not found." });
    }

    const currentDate = normalizeDate();

    const dailyLog = await DailyLog.findOneAndUpdate(
      { userId, date: currentDate },
      { $setOnInsert: { userId, date: currentDate, completedHabits: [] } },
      { new: true, upsert: true }
    );

    if (!dailyLog) {
      return res.status(404).json({ message: "Daily Log not found." });
    }

    const isCompleted = dailyLog.completedHabits.some(
      (id) => id.toString() === habitId
    );

    // Update completion
    await DailyLog.updateOne(
      { _id: dailyLog._id },
      isCompleted
        ? { $pull: { completedHabits: habitId } }
        : { $addToSet: { completedHabits: habitId } }
    );

    res.json({
      message: "Habit status updated.",
      _id: habit._id,
      isCompleted: !isCompleted,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

// //
// export async function getHabitByID(req, res) {
//   try {
//     const { userId, habitId } = req.params;
//     const habit = await Habit.find({
//       _id: habitId,
//       userId: userId,
//     });

//     if (!habit) {
//       return res.status(404).json({ message: "No habit found." });
//     }

//     res.json(habit);
//   } catch (errr) {
//     res.status(500).json({ message: err.message });
//   }
// }
