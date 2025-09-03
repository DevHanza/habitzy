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
      date: req.body.date || new Date().setHours(0, 0, 0, 0),
      completedHabits: req.body.completedHabits,
      allCompleted: req.body.allCompleted || false,
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
export async function updateDailyLog(req, res) {}
