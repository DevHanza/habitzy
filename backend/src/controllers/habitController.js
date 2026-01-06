import { Habit } from "../models/habitModel.js";

export async function getHabits(req, res) {
  try {
    const userId = req.user.userId;

    if (!userId) {
      res.status(404).json({ message: "User not found." });
    }

    const habits = await Habit.find({ userId: userId });

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

export async function deleteHabit(req, res) {}

// export async function deleteHabit(req, res) {
//   try {
//     const { userId, habitId } = req.params;

//     if (!userId) {
//       return res.status(404).json({ message: "userId not found." });
//     }

//     const deletedHabit = await Habit.deleteOne({
//       _id: habitId,
//       userId: userId,
//     });

//     if (!deletedHabit) {
//       return res.status(404).json({ message: "Habit not found." });
//     }

//     res.json({ message: "Habit  is Deleted.", deletedHabit });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }

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
