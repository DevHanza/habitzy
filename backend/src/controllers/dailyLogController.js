import { DailyLog } from "../models/dailyLogModel.js";

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

    const dailyLogData = {
      userId,
      completedHabits: req.body.completedHabits,
      allCompleted: req.body.allCompleted,
    };

    const newDailyLog = new DailyLog(dailyLogData);
    await newDailyLog.save();
    res.status(201).json(newDailyLog);
  } catch (err) {
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
