import { User } from "../config/schema.js";

export async function addUser(userData) {
  try {
    //
    const user = new User(userData);
    await user.save();
    //
  } catch (error) {
    //
    return error;
    //
  }
}
