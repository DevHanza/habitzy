import mongoose from "mongoose";
const { Schema } = mongoose;

const habitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
      required: [true, "Icon is required."],
    },
    isCompleted: {
      type: Boolean,
      required: [true, "isCompleted is required."],
      default: false,
    },
  },
  { timestamps: true } // auto-manages createdAt and updatedAt
);

export const Habit = mongoose.model("Habit", habitSchema);
