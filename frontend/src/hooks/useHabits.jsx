import { useContext } from "react";
import { HabitContext } from "@/context/HabitContext";

export const useHabits = () => useContext(HabitContext);
