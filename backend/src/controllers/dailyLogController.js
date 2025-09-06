import { DailyLog } from "../models/dailyLogModel.js";
import normalizeDate from "../utils/normalizeDate.js";

export async function getDailyLogsByUser(req, res) {
  try {
    const { userId } = req.params;
    const dailyLogs = await DailyLog.find({
      userId,
    });

    if (!dailyLogs) {
      return res.status(404).json({
        message: "No Daily Logs found.",
      });
    }

    res.json(dailyLogs);
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}
export async function addDailyLog(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(404).json({ message: "userId not found." });
    }

    const { completedHabits, allCompleted } = req.body;

    const today = normalizeDate();

    const dailyLogData = {
      userId,
      date: today,
      completedHabits,
      allCompleted,
    };

    const newDailyLog = new DailyLog(dailyLogData);
    await newDailyLog.save();

    res.status(201).json(newDailyLog);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Daily log for this user is already exists." });
    }
    //
    res.status(400).json({ message: err.message });
    //
  }
}
export async function updateDailyLog(req, res) {
  try {
    const { userId, dailyLogId } = req.params;

    if (!userId) {
      res.status(404).json({ message: "userId not found." });
    }

    const newlogData = req.body;

    const updatedDailyLog = await DailyLog.findOneAndUpdate(
      {
        _id: dailyLogId,
        userId: userId,
      },
      { $set: newlogData },
      { new: true, runValidators: true }
    );

    if (!updatedDailyLog) {
      return res.status(404).json({ message: "Daily log not found." });
    }

    res.json(updatedDailyLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
