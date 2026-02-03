import { useState, useCallback, useEffect } from "react";
import { HabitContext } from "@/context/HabitContext";
import { useAuth } from "@/hooks/useAuth";

const habitsList = [
  { _id: 1, icon: "📖", title: "Read a book", isCompleted: false },
  { _id: 2, icon: "🏃‍♂️", title: "Go for a run", isCompleted: false },
  { _id: 3, icon: "🧘‍♀️", title: "Meditate", isCompleted: false },
  { _id: 4, icon: "💧", title: "Drink water", isCompleted: false },
  { _id: 5, icon: "📝", title: "Journal", isCompleted: false },
  { _id: 6, icon: "🍎", title: "Eat healthy", isCompleted: false },
  { _id: 7, icon: "🛏️", title: "Sleep early", isCompleted: false },
  { _id: 8, icon: "🎸", title: "Practice guitar", isCompleted: false },
  { _id: 9, icon: "🌱", title: "Gardening", isCompleted: false },
  { _id: 10, icon: "🚿", title: "Cold shower", isCompleted: false },
  // { _id: 11, icon: "🏊‍♂️", title: "Go swimming", isCompleted: false },
  // { _id: 12, icon: "🚴‍♀️", title: "Cycle outdoors", isCompleted: false },
  // { _id: 13, icon: "🥗", title: "Prepare salad", isCompleted: false },
  // { _id: 14, icon: "🎨", title: "Draw something", isCompleted: false },
  // { _id: 15, icon: "🎹", title: "Practice piano", isCompleted: false },
  // { _id: 16, icon: "📓", title: "Write notes", isCompleted: false },
  // { _id: 17, icon: "🧩", title: "Solve a puzzle", isCompleted: false },
  // { _id: 18, icon: "📰", title: "Read news", isCompleted: false },
  // { _id: 19, icon: "🧹", title: "Clean room", isCompleted: false },
  // { _id: 20, icon: "🧺", title: "Do laundry", isCompleted: false },
  // { _id: 21, icon: "🧴", title: "Skincare routine", isCompleted: false },
  // { _id: 22, icon: "🍵", title: "Drink tea", isCompleted: false },
  // { _id: 23, icon: "🍋", title: "Lemon water", isCompleted: false },
  // { _id: 24, icon: "🍊", title: "Eat fruit", isCompleted: false },
  // { _id: 25, icon: "🍌", title: "Banana snack", isCompleted: false },
  // { _id: 26, icon: "🥛", title: "Drink milk", isCompleted: false },
  // { _id: 27, icon: "🥤", title: "Smoothie", isCompleted: false },
  // { _id: 28, icon: "🥜", title: "Eat nuts", isCompleted: false },
  // { _id: 29, icon: "🥯", title: "Healthy breakfast", isCompleted: false },
  // { _id: 30, icon: "🍲", title: "Cook soup", isCompleted: false },
  // { _id: 31, icon: "🍝", title: "Cook pasta", isCompleted: false },
  // { _id: 32, icon: "🥪", title: "Make sandwich", isCompleted: false },
  // { _id: 33, icon: "🍳", title: "Cook eggs", isCompleted: false },
  // { _id: 34, icon: "🥘", title: "Try new recipe", isCompleted: false },
  // { _id: 35, icon: "🍫", title: "Limit sweets", isCompleted: false },
  // { _id: 36, icon: "🚶‍♂️", title: "Go for a walk", isCompleted: false },
  // { _id: 37, icon: "🧗‍♀️", title: "Rock climbing", isCompleted: false },
  // { _id: 38, icon: "🥊", title: "Boxing workout", isCompleted: false },
  // { _id: 39, icon: "🧎‍♂️", title: "Stretching", isCompleted: false },
  // { _id: 40, icon: "🏋️‍♀️", title: "Weight training", isCompleted: false },
  // { _id: 41, icon: "🤸‍♀️", title: "Do yoga poses", isCompleted: false },
  // { _id: 42, icon: "🧘", title: "Breathing exercise", isCompleted: false },
  // { _id: 43, icon: "🦵", title: "Leg workout", isCompleted: false },
  // { _id: 44, icon: "💪", title: "Arm workout", isCompleted: false },
  // { _id: 45, icon: "🏂", title: "Snowboarding", isCompleted: false },
  // { _id: 46, icon: "⛷️", title: "Skiing", isCompleted: false },
  // { _id: 47, icon: "🏐", title: "Play volleyball", isCompleted: false },
  // { _id: 48, icon: "🏀", title: "Play basketball", isCompleted: false },
  // { _id: 49, icon: "⚽", title: "Play football", isCompleted: false },
  // { _id: 50, icon: "🏈", title: "Play rugby", isCompleted: false },
  // { _id: 51, icon: "🎾", title: "Play tennis", isCompleted: false },
  // { _id: 52, icon: "🏓", title: "Play ping pong", isCompleted: false },
  // { _id: 53, icon: "🥅", title: "Practice shooting goals", isCompleted: false },
  // { _id: 54, icon: "🥍", title: "Play lacrosse", isCompleted: false },
  // { _id: 55, icon: "🏏", title: "Play cricket", isCompleted: false },
  // { _id: 56, icon: "🏑", title: "Play hockey", isCompleted: false },
  // { _id: 57, icon: "🏹", title: "Practice archery", isCompleted: false },
  // { _id: 58, icon: "🤿", title: "Go diving", isCompleted: false },
  // { _id: 59, icon: "🛹", title: "Skateboarding", isCompleted: false },
  // { _id: 60, icon: "🚣‍♂️", title: "Rowing", isCompleted: false },
  // { _id: 61, icon: "⛸️", title: "Ice skating", isCompleted: false },
  // { _id: 62, icon: "🚤", title: "Boating", isCompleted: false },
  // { _id: 63, icon: "🛶", title: "Canoeing", isCompleted: false },
  // { _id: 64, icon: "🪂", title: "Paragl_iding", isCompleted: false },
  // { _id: 65, icon: "🚁", title: "Helicopter r_ide", isCompleted: false },
  // { _id: 66, icon: "✈️", title: "Travel somewhere", isCompleted: false },
  // { _id: 67, icon: "🚗", title: "Road trip", isCompleted: false },
  // { _id: 68, icon: "🚂", title: "Train journey", isCompleted: false },
  // { _id: 69, icon: "🚲", title: "City cycling", isCompleted: false },
  // { _id: 70, icon: "🛴", title: "R_ide scooter", isCompleted: false },
  // { _id: 71, icon: "🚍", title: "Take bus r_ide", isCompleted: false },
  // { _id: 72, icon: "🚕", title: "Taxi r_ide", isCompleted: false },
  // { _id: 73, icon: "🚊", title: "Tram r_ide", isCompleted: false },
  // { _id: 74, icon: "⛵", title: "Sailing", isCompleted: false },
  // { _id: 75, icon: "⚓", title: "Harbor walk", isCompleted: false },
  // { _id: 76, icon: "🛳️", title: "Cruise", isCompleted: false },
  // { _id: 77, icon: "🏖️", title: "Beach day", isCompleted: false },
  // { _id: 78, icon: "🏝️", title: "Island walk", isCompleted: false },
  // { _id: 79, icon: "🏞️", title: "Hike trail", isCompleted: false },
  // { _id: 80, icon: "🌄", title: "Watch sunrise", isCompleted: false },
  // { _id: 81, icon: "🌅", title: "Watch sunset", isCompleted: false },
  // { _id: 82, icon: "🌌", title: "Stargazing", isCompleted: false },
  // { _id: 83, icon: "🌠", title: "Wish on star", isCompleted: false },
  // { _id: 84, icon: "🌈", title: "Enjoy rainbow", isCompleted: false },
  // { _id: 85, icon: "🔥", title: "Campfire", isCompleted: false },
  // { _id: 86, icon: "⛺", title: "Camping", isCompleted: false },
  // { _id: 87, icon: "🏕️", title: "Outdoor night", isCompleted: false },
  // { _id: 88, icon: "🪵", title: "Collect firewood", isCompleted: false },
  // { _id: 89, icon: "🔭", title: "Use telescope", isCompleted: false },
  // { _id: 90, icon: "🧭", title: "Compass practice", isCompleted: false },
  // { _id: 91, icon: "🗺️", title: "Map reading", isCompleted: false },
  // { _id: 92, icon: "🏛️", title: "Visit museum", isCompleted: false },
  // { _id: 93, icon: "🎭", title: "Watch theater", isCompleted: false },
  // { _id: 94, icon: "🎬", title: "Watch movie", isCompleted: false },
  // { _id: 95, icon: "📺", title: "Watch series", isCompleted: false },
  // { _id: 96, icon: "🎧", title: "Listen to music", isCompleted: false },
  // { _id: 97, icon: "🎤", title: "Karaoke", isCompleted: false },
  // { _id: 98, icon: "🎷", title: "Play saxophone", isCompleted: false },
  // { _id: 99, icon: "🥁", title: "Drum practice", isCompleted: false },
  // { _id: 100, icon: "🎻", title: "Play violin", isCompleted: false },
];

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(habitsList);
  const [isAddingHabits, setIsAddingHabits] = useState(true);

  const { isLoggedIn, authFetch } = useAuth();

  // Load User's Habits from DB on Init.
  useEffect(() => {
    //
    if (!isLoggedIn) return;

    authFetch({
      url: "user/habits",
    })
      .then(async (response) => {
        const data = await response.json();
        setHabits(data);
      })
      .catch((err) => {
        console.log(err);
      });
    //
  }, [isLoggedIn, authFetch, setHabits]);

  const addHabit = (habit) => {
    //

    if (isLoggedIn) {
      authFetch({
        url: "user/habits",
        method: "POST",
        body: {
          icon: habit?.icon,
          title: habit?.title,
        },
      })
        .then(async (response) => {
          //
          const data = await response.json();
          // console.log(data);

          setHabits((prev) => [
            {
              _id: data._id,
              ...habit,
              isCompleted: false,
            },
            ...prev,
          ]);
          //
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setHabits((prev) => [
        { _id: habits.length + 1, isCompleted: false, ...habit },
        ...prev,
      ]);
    }
  };

  const editHabit = (id, selectedEmoji, label) => {
    const habit = habits.find((habit) => habit._id === id);

    // Return if there's no changes
    if (selectedEmoji === habit.icon && label === habit.title) return;

    if (isLoggedIn) {
      //
      authFetch({
        url: `user/habits/${id}`,
        method: "PATCH",
        body: {
          icon: selectedEmoji,
          title: label,
          // description: "",
          // isCompleted: false,
        },
      })
        .then(async () =>
          // response
          {
            //
            // const data = await response.json();
            // console.log(data);

            // #########

            setHabits((prevHabits) =>
              prevHabits.map((habit) =>
                habit._id === id
                  ? { ...habit, icon: selectedEmoji, title: label }
                  : habit,
              ),
            );
            //
          },
        )
        .catch((err) => {
          console.log(err);
        });
    } else {
      //
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === id
            ? { ...habit, icon: selectedEmoji, title: label }
            : habit,
        ),
      );
      //
    }
  };

  const removeHabit = useCallback(
    (id) => {
      if (isLoggedIn) {
        //
        authFetch({
          url: `user/habits/${id}`,
          method: "DELETE",
        })
          .then(async () =>
            // response
            {
              //
              // const data = await response.json();
              // console.log(data);

              setHabits((prev) => prev.filter((habit) => habit._id !== id));
              //
            },
          )
          .catch((err) => {
            console.log(err);
          });
      } else {
        setHabits((prev) => prev.filter((habit) => habit._id !== id));
      }
    },
    [authFetch, isLoggedIn],
  );

  const toggleHabit = useCallback(
    (id) => {
      //
      //
      if (isLoggedIn) {
        authFetch({
          url: `user/habits/${id}/toggleStatus`,
          method: "PATCH",
        })
          .then(async () =>
            // response
            {
              //
              // const data = await response.json();
              // console.log(data);
              //

              setHabits((prev) =>
                prev.map((habit) =>
                  habit._id === id
                    ? { ...habit, isCompleted: !habit.isCompleted }
                    : habit,
                ),
              );
            },
          )
          .catch((err) => {
            console.log(err);
          });
      } else {
        setHabits((prev) =>
          prev.map((habit) =>
            habit._id === id
              ? { ...habit, isCompleted: !habit.isCompleted }
              : habit,
          ),
        );
      }
    },
    [authFetch, isLoggedIn],
  );

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
