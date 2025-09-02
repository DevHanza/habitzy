import mongoose from "mongoose";
const { Schema } = mongoose;

import { Habit } from "./habitModel.js";

const daiyLogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required."],
    },
    date: {
      type: Schema.Types.Date,
      required: [true, "Date is required."],
    },
    completedHabits: [
      {
        type: Schema.Types.ObjectId,
        ref: Habit,
      },
    ],
    allCompleted: Schema.Types.Boolean,
  },
  { timestamps: true } // auto-manages createdAt and updatedAt
);

export const DailyLog = mongoose.model("DailyLog", daiyLogSchema);
