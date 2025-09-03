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
export async function addDailyLog(req, res) {}
export async function updateDailyLog(req, res) {}
