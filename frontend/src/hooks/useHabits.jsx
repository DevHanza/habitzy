import { useContext } from "react";
import { HabitContext } from "@/context/HabitContext.js";

function useHabits() {
  return useContext(HabitContext);
}

export default useHabits;
