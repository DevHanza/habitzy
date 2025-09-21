import { useState } from "react";
import { HabitContext } from "./HabitContext";

const habitsList = [
  { id: 1, icon: "📖", title: "Read a book", isCompleted: false },
  { id: 2, icon: "🏃‍♂️", title: "Go for a run", isCompleted: false },
  { id: 3, icon: "🧘‍♀️", title: "Meditate", isCompleted: false },
  { id: 4, icon: "💧", title: "Drink water", isCompleted: false },
  { id: 5, icon: "📝", title: "Journal", isCompleted: false },
  { id: 6, icon: "🍎", title: "Eat healthy", isCompleted: true },
  { id: 7, icon: "🛏️", title: "Sleep early", isCompleted: false },
  { id: 8, icon: "🎸", title: "Practice guitar", isCompleted: false },
  { id: 9, icon: "🌱", title: "Gardening", isCompleted: false },
  { id: 10, icon: "🚿", title: "Cold shower", isCompleted: false },
];

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(habitsList);
  const [isAddingHabits, setIsAddingHabits] = useState(true);

  const addHabit = (habit) => {
    setHabits((prev) => [...prev, habit]);
  };

  const removeHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
      )
    );
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        isAddingHabits,
        setIsAddingHabits,
        addHabit,
        removeHabit,
        toggleHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
