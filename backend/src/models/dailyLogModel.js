import mongoose from "mongoose";
const { Schema } = mongoose;

const dailyLogSchema = new Schema(
  {
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    completedHabits: [
      {
        type: Schema.Types.ObjectId,
        ref: "Habit",
      },
    ],

    // allCompleted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }, // auto-manages createdAt and updatedAt
);

// Ensure one log per user per date
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export const DailyLog = mongoose.model("DailyLog", dailyLogSchema);
