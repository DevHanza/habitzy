import { useState } from "react";
import { HabitContext } from "./HabitContext";

const habitsList = [
  { icon: "📖", name: "Read a book" },
  { icon: "🏃‍♂️", name: "Go for a run" },
  { icon: "🧘‍♀️", name: "Meditate" },
  { icon: "💧", name: "Drink water" },
  { icon: "📝", name: "Journal" },
  { icon: "🍎", name: "Eat healthy" },
  { icon: "🛏️", name: "Sleep early" },
  { icon: "🎸", name: "Practice guitar" },
  { icon: "🌱", name: "Gardening" },
  { icon: "🚿", name: "Cold shower" },
];

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(habitsList);
  const [isAddingHabits, setIsAddingHabits] = useState(false);

  const addHabit = (habit) => {
    setHabits((prev) => [...prev, habit]);
  };

  const removeHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        isAddingHabits,
        setIsAddingHabits,
        addHabit,
        removeHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
