import { Types } from "mongoose";

import { User } from "../models/userModel.js";
import { Habit } from "../models/habitModel.js";
import { DailyLog } from "../models/dailyLogModel.js";

import { verifyRefreshToken } from "../utils/jwt.js";
import { isProduction } from "../utils/envCheck.js";

// USER

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
      return res.status(401).json({ message: "No token found." });
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(404).json({ message: "Invalid token." });
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
