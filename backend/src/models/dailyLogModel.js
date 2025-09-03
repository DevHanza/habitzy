import mongoose from "mongoose";
const { Schema } = mongoose;

const daiyLogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required."],
    },
    completedHabits: [
      {
        type: Schema.Types.ObjectId,
        // ref: "Habit",
      },
    ],

    allCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // auto-manages createdAt and updatedAt
);

export const DailyLog = mongoose.model("DailyLog", daiyLogSchema);
