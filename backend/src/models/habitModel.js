import { connectDB } from "../config/db.js";

export async function getHabits() {
  const db = await connectDB();
  return db.collection("habits").find({}).toArray();
}
