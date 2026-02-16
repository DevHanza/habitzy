import { Types } from "mongoose";

import { User } from "../models/userModel.js";
import { Habit } from "../models/habitModel.js";
import { DailyLog } from "../models/dailyLogModel.js";

import { verifyRefreshToken } from "../utils/jwt.js";
import { isProduction } from "../utils/envCheck.js";
import normalizeDate from "../utils/normalizeDate.js";

// USER

export async function getUser(req, res) {
  try {
    //
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    const user = await User.findById(userId)
      .select("name email username streak")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
        streak: user.streak,
      },
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

export async function updateUser(req, res) {
  try {
    //
    const allFieldsEmpty = !req.body || Object.keys(req.body).length === 0;

    if (allFieldsEmpty) {
      return res.status(400).json({ message: "No fields provided to update." });
    }

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    const { name, username } = req.body;
    const newUserData = { name, username };

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          ...newUserData,
        },
      },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "User updated successfully.",
      _id: updatedUser._id,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

export async function deleteUser(req, res) {
  try {
    //
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(404).json({ message: "No token found." });
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // 48-Hour Logout Security
    const now = new Date();
    const issuedAt = new Date(payload?.iat * 1000);
    const twoDaysAfter = new Date(issuedAt);
    twoDaysAfter.setDate(issuedAt.getDate() + 2);

    const isTwoDays = now > twoDaysAfter;

    if (!isTwoDays) {
      return res.status(403).json({
        message:
          "You must wait 48 hours after login before deleting your account.",
      });
    }
    //

    const userId = payload.userId ?? req.user.userId;

    if (!userId) {
      return res.status(404).json({ message: "User not found." });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const deletedHabits = await Habit.deleteMany({ userId });
    const deletedDailyLogs = await DailyLog.deleteMany({ userId });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: isProduction, // set to false for local envs
    });

    res.json({
      message: "User deleted successfully.",
      _id: deletedUser._id,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

// LEADERBOARD

export async function getDailyLeaderboard(req, res) {
  try {
    //

    const leaderboardUsers = await User.find({
      "streak.currentStreak": { $gt: 0 },
    })
      .sort({ "streak.currentStreak": -1 })
      .select("name username streak.currentStreak")
      .limit(20)
      .lean();

    if (!leaderboardUsers) {
      return res.status(404).json({
        message: "No Users found.",
      });
    }

    res.json(leaderboardUsers);
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

export async function getDailyLeaderboardRank(req, res) {
  try {
    //

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    //  --------------------------------------
    //
    const user = await User.findOne({ _id: userId }).lean();

    if (!user) {
      return res
        .status(404)
        .json({ message: "We couldn't find your account." });
    }

    const leaderboardUsersCount = await User.countDocuments({
      "streak.currentStreak": { $gt: 0 },
    }).lean();

    if (!leaderboardUsersCount) {
      return res
        .status(404)
        .json({ message: "We couldn't find your leaderboard data." });
    }

    const leaderboardRank = await User.aggregate([
      {
        $setWindowFields: {
          sortBy: { "streak.currentStreak": -1 },
          output: {
            rank: { $rank: {} },
          },
        },
      },
      {
        $match: {
          _id: new Types.ObjectId(`${userId}`),
        },
      },
      // only keep relavant fields
      {
        $project: {
          _id: 0,
          rank: 1,
        },
      },
    ]);

    if (!leaderboardRank) {
      return res
        .status(404)
        .json({ message: "We couldn't find your leaderboard data." });
    }

    const rank = leaderboardRank[0].rank;
    let rankPercentage = Math.floor(
      1 + ((rank - 1) / (leaderboardUsersCount - 1)) * 100,
    );

    if (rankPercentage === 101) {
      rankPercentage = 100;
    }

    res.json({
      rank,
      total: leaderboardUsersCount,
      percentage: rankPercentage,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

// STREAK
export async function incrementStreak(req, res) {
  try {
    //

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    const currentDate = normalizeDate();

    // Check if streak is already incremented for the day

    const user = await User.findById(userId).select("streak").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedAt = normalizeDate(user.streak.updatedAt);
    const isStreakUpdated = updatedAt.getTime() === currentDate.getTime();

    if (isStreakUpdated) {
      return res
        .status(409)
        .send({ message: "Streak already updated for today." });
    }

    const habits = await Habit.find({ userId: userId })
      .select("_id")
      .sort({ createdAt: -1 })
      .lean();

    if (!habits) {
      return res
        .status(404)
        .json({ message: "No habits found for this user." });
    }

    const dailyLog = await DailyLog.findOne({
      userId,
      date: currentDate,
    }).lean();

    if (!dailyLog) {
      return res
        .status(404)
        .json({ message: "No daily log found for this user." });
    }

    // Compare habits lists

    const userHabitsList = habits
      .map((habit) => {
        return habit._id;
      })
      .sort();

    const dailyLogList = dailyLog.completedHabits.sort();

    if (userHabitsList.length !== dailyLogList.length) {
      return res.status(409).json({
        message: "All habits must be completed.",
      });
    }

    const isAllHabitsCompleted = userHabitsList.every((value, i) => {
      return value.equals(dailyLogList[i]);
    });

    if (!isAllHabitsCompleted) {
      return res.status(409).json({
        message: "All habits must be completed.",
      });
    }

    // Increment the streak

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      [
        //
        {
          $set: {
            "streak.currentStreak": { $add: ["$streak.currentStreak", 1] },
            "streak.updatedAt": currentDate,
          },
        },
        //
        {
          $set: {
            "streak.longestStreak": {
              $cond: {
                if: { $gt: ["$streak.currentStreak", "$streak.longestStreak"] },
                then: "$streak.currentStreak",
                else: "$streak.longestStreak",
              },
            },
          },
        },
        //
      ],
      { new: true }, // returns the updated document
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update the user." });
    }

    res.json({
      streak: updatedUser.streak,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

export async function clearStreak(req, res) {
  try {
    //
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ message: "User not found." });
    }

    const currentDate = normalizeDate();

    const user = await User.findById(userId).select("streak").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedAt = normalizeDate(user.streak.updatedAt);

    // Check: Is streak expired?

    const streakUpdatedDiff =
      (currentDate.getTime() - updatedAt.getTime()) / 86400000;
    const isStreakExpired = streakUpdatedDiff > 1;

    console.log("streakUpdatedDiff: ", streakUpdatedDiff);
    console.log("isStreakExpired: ", isStreakExpired);

    if (!isStreakExpired) {
      return res.status(409).json({
        message: "Streak has not expired yet.",
      });
    }

    // Check: Is streak already incremented for the day

    const isStreakUpdated = updatedAt.getTime() === currentDate.getTime();

    if (isStreakUpdated) {
      return res
        .status(409)
        .send({ message: "Streak already updated for today." });
    }

    // Query for habits & daily log

    const habits = await Habit.find({ userId: userId })
      .select("_id")
      .sort({ createdAt: -1 })
      .lean();

    if (!habits) {
      return res
        .status(404)
        .json({ message: "No habits found for this user." });
    }

    const dailyLog = await DailyLog.findOne({
      userId,
      date: currentDate,
    }).lean();

    if (!dailyLog) {
      return res
        .status(404)
        .json({ message: "No daily log found for this user." });
    }

    // Compare habits lists

    const userHabitsList = habits
      .map((habit) => {
        return habit._id;
      })
      .sort();

    const dailyLogList = dailyLog.completedHabits.sort();

    if (userHabitsList.length === dailyLogList.length) {
      return res.status(409).json({
        message: "Cannot reset the streak, while you have it.",
      });
    }

    const isAllHabitsCompleted = userHabitsList.every((value, i) => {
      return value.equals(dailyLogList[i]);
    });

    if (isAllHabitsCompleted) {
      return res.status(409).json({
        message: "Cannot reset the streak, while you have it.",
      });
    }

    // Decrement the streak

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        "streak.currentStreak": 0,
        "streak.updatedAt": currentDate,
      },
      { new: true }, // returns the updated document
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update the user." });
    }

    res.json({
      streak: updatedUser.streak,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}
