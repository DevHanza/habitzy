import { useState, useCallback } from "react";
import { HabitContext } from "@/context/HabitContext";

const habitsList = [
  { id: 1, icon: "📖", title: "Read a book", isCompleted: false },
  { id: 2, icon: "🏃‍♂️", title: "Go for a run", isCompleted: false },
  { id: 3, icon: "🧘‍♀️", title: "Meditate", isCompleted: false },
  { id: 4, icon: "💧", title: "Drink water", isCompleted: false },
  { id: 5, icon: "📝", title: "Journal", isCompleted: false },
  { id: 6, icon: "🍎", title: "Eat healthy", isCompleted: false },
  { id: 7, icon: "🛏️", title: "Sleep early", isCompleted: false },
  { id: 8, icon: "🎸", title: "Practice guitar", isCompleted: false },
  { id: 9, icon: "🌱", title: "Gardening", isCompleted: false },
  { id: 10, icon: "🚿", title: "Cold shower", isCompleted: false },
  // { id: 11, icon: "🏊‍♂️", title: "Go swimming", isCompleted: false },
  // { id: 12, icon: "🚴‍♀️", title: "Cycle outdoors", isCompleted: false },
  // { id: 13, icon: "🥗", title: "Prepare salad", isCompleted: false },
  // { id: 14, icon: "🎨", title: "Draw something", isCompleted: false },
  // { id: 15, icon: "🎹", title: "Practice piano", isCompleted: false },
  // { id: 16, icon: "📓", title: "Write notes", isCompleted: false },
  // { id: 17, icon: "🧩", title: "Solve a puzzle", isCompleted: false },
  // { id: 18, icon: "📰", title: "Read news", isCompleted: false },
  // { id: 19, icon: "🧹", title: "Clean room", isCompleted: false },
  // { id: 20, icon: "🧺", title: "Do laundry", isCompleted: false },
  // { id: 21, icon: "🧴", title: "Skincare routine", isCompleted: false },
  // { id: 22, icon: "🍵", title: "Drink tea", isCompleted: false },
  // { id: 23, icon: "🍋", title: "Lemon water", isCompleted: false },
  // { id: 24, icon: "🍊", title: "Eat fruit", isCompleted: false },
  // { id: 25, icon: "🍌", title: "Banana snack", isCompleted: false },
  // { id: 26, icon: "🥛", title: "Drink milk", isCompleted: false },
  // { id: 27, icon: "🥤", title: "Smoothie", isCompleted: false },
  // { id: 28, icon: "🥜", title: "Eat nuts", isCompleted: false },
  // { id: 29, icon: "🥯", title: "Healthy breakfast", isCompleted: false },
  // { id: 30, icon: "🍲", title: "Cook soup", isCompleted: false },
  // { id: 31, icon: "🍝", title: "Cook pasta", isCompleted: false },
  // { id: 32, icon: "🥪", title: "Make sandwich", isCompleted: false },
  // { id: 33, icon: "🍳", title: "Cook eggs", isCompleted: false },
  // { id: 34, icon: "🥘", title: "Try new recipe", isCompleted: false },
  // { id: 35, icon: "🍫", title: "Limit sweets", isCompleted: false },
  // { id: 36, icon: "🚶‍♂️", title: "Go for a walk", isCompleted: false },
  // { id: 37, icon: "🧗‍♀️", title: "Rock climbing", isCompleted: false },
  // { id: 38, icon: "🥊", title: "Boxing workout", isCompleted: false },
  // { id: 39, icon: "🧎‍♂️", title: "Stretching", isCompleted: false },
  // { id: 40, icon: "🏋️‍♀️", title: "Weight training", isCompleted: false },
  // { id: 41, icon: "🤸‍♀️", title: "Do yoga poses", isCompleted: false },
  // { id: 42, icon: "🧘", title: "Breathing exercise", isCompleted: false },
  // { id: 43, icon: "🦵", title: "Leg workout", isCompleted: false },
  // { id: 44, icon: "💪", title: "Arm workout", isCompleted: false },
  // { id: 45, icon: "🏂", title: "Snowboarding", isCompleted: false },
  // { id: 46, icon: "⛷️", title: "Skiing", isCompleted: false },
  // { id: 47, icon: "🏐", title: "Play volleyball", isCompleted: false },
  // { id: 48, icon: "🏀", title: "Play basketball", isCompleted: false },
  // { id: 49, icon: "⚽", title: "Play football", isCompleted: false },
  // { id: 50, icon: "🏈", title: "Play rugby", isCompleted: false },
  // { id: 51, icon: "🎾", title: "Play tennis", isCompleted: false },
  // { id: 52, icon: "🏓", title: "Play ping pong", isCompleted: false },
  // { id: 53, icon: "🥅", title: "Practice shooting goals", isCompleted: false },
  // { id: 54, icon: "🥍", title: "Play lacrosse", isCompleted: false },
  // { id: 55, icon: "🏏", title: "Play cricket", isCompleted: false },
  // { id: 56, icon: "🏑", title: "Play hockey", isCompleted: false },
  // { id: 57, icon: "🏹", title: "Practice archery", isCompleted: false },
  // { id: 58, icon: "🤿", title: "Go diving", isCompleted: false },
  // { id: 59, icon: "🛹", title: "Skateboarding", isCompleted: false },
  // { id: 60, icon: "🚣‍♂️", title: "Rowing", isCompleted: false },
  // { id: 61, icon: "⛸️", title: "Ice skating", isCompleted: false },
  // { id: 62, icon: "🚤", title: "Boating", isCompleted: false },
  // { id: 63, icon: "🛶", title: "Canoeing", isCompleted: false },
  // { id: 64, icon: "🪂", title: "Paragliding", isCompleted: false },
  // { id: 65, icon: "🚁", title: "Helicopter ride", isCompleted: false },
  // { id: 66, icon: "✈️", title: "Travel somewhere", isCompleted: false },
  // { id: 67, icon: "🚗", title: "Road trip", isCompleted: false },
  // { id: 68, icon: "🚂", title: "Train journey", isCompleted: false },
  // { id: 69, icon: "🚲", title: "City cycling", isCompleted: false },
  // { id: 70, icon: "🛴", title: "Ride scooter", isCompleted: false },
  // { id: 71, icon: "🚍", title: "Take bus ride", isCompleted: false },
  // { id: 72, icon: "🚕", title: "Taxi ride", isCompleted: false },
  // { id: 73, icon: "🚊", title: "Tram ride", isCompleted: false },
  // { id: 74, icon: "⛵", title: "Sailing", isCompleted: false },
  // { id: 75, icon: "⚓", title: "Harbor walk", isCompleted: false },
  // { id: 76, icon: "🛳️", title: "Cruise", isCompleted: false },
  // { id: 77, icon: "🏖️", title: "Beach day", isCompleted: false },
  // { id: 78, icon: "🏝️", title: "Island walk", isCompleted: false },
  // { id: 79, icon: "🏞️", title: "Hike trail", isCompleted: false },
  // { id: 80, icon: "🌄", title: "Watch sunrise", isCompleted: false },
  // { id: 81, icon: "🌅", title: "Watch sunset", isCompleted: false },
  // { id: 82, icon: "🌌", title: "Stargazing", isCompleted: false },
  // { id: 83, icon: "🌠", title: "Wish on star", isCompleted: false },
  // { id: 84, icon: "🌈", title: "Enjoy rainbow", isCompleted: false },
  // { id: 85, icon: "🔥", title: "Campfire", isCompleted: false },
  // { id: 86, icon: "⛺", title: "Camping", isCompleted: false },
  // { id: 87, icon: "🏕️", title: "Outdoor night", isCompleted: false },
  // { id: 88, icon: "🪵", title: "Collect firewood", isCompleted: false },
  // { id: 89, icon: "🔭", title: "Use telescope", isCompleted: false },
  // { id: 90, icon: "🧭", title: "Compass practice", isCompleted: false },
  // { id: 91, icon: "🗺️", title: "Map reading", isCompleted: false },
  // { id: 92, icon: "🏛️", title: "Visit museum", isCompleted: false },
  // { id: 93, icon: "🎭", title: "Watch theater", isCompleted: false },
  // { id: 94, icon: "🎬", title: "Watch movie", isCompleted: false },
  // { id: 95, icon: "📺", title: "Watch series", isCompleted: false },
  // { id: 96, icon: "🎧", title: "Listen to music", isCompleted: false },
  // { id: 97, icon: "🎤", title: "Karaoke", isCompleted: false },
  // { id: 98, icon: "🎷", title: "Play saxophone", isCompleted: false },
  // { id: 99, icon: "🥁", title: "Drum practice", isCompleted: false },
  // { id: 100, icon: "🎻", title: "Play violin", isCompleted: false },
];

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(habitsList);
  const [isAddingHabits, setIsAddingHabits] = useState(true);

  const addHabit = (habit) => {
    setHabits((prev) => [
      ...prev,
      { id: habits.length + 1, isCompleted: false, ...habit },
    ]);
  };

  const editHabit = (id, selectedEmoji, label) => {
    const habit = habits.find((habit) => habit.id === id);

    // Return if there's no changes
    if (selectedEmoji === habit.icon && label === habit.title) return;

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? { ...habit, icon: selectedEmoji, title: label }
          : habit
      )
    );
  };

  const removeHabit = useCallback((id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }, []);

  const toggleHabit = useCallback((id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
      )
    );
  }, []);

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        isAddingHabits,
        setIsAddingHabits,
        addHabit,
        editHabit,
        removeHabit,
        toggleHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
