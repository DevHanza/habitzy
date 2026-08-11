import {
  useReducer,
  useEffect,
  useCallback,
  useOptimistic,
  startTransition,
} from "react";
import { HabitContext } from "@/context/HabitContext";
import { useAuth } from "@/hooks/useAuth";
import { moveItemsInList } from "@/utils/moveItemsInList";
import { toaster } from "@/components/ui/toaster";
import habitsList from "../../data/demoHabitsList";

const initialState = {
  habits: [],
  isHabitLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    //
    case "SET_HABITS":
      return {
        ...state,
        habits: [...action.payload],
        isHabitLoading: false,
      };
    //
    case "ADD_HABIT":
      return {
        ...state,
        habits: [action.payload, ...state.habits],
      };
    //
    case "EDIT_HABIT":
      const { id: editHabitID, selectedEmoji, title } = action.payload;

      const updatedHabits = state.habits.map((habit) =>
        habit._id === editHabitID
          ? { ...habit, icon: selectedEmoji, title }
          : habit,
      );

      return {
        ...state,
        habits: [...updatedHabits],
      };
    //
    case "DELETE_HABIT":
      //
      const { id: deleteHabitID } = action.payload;
      const deletedHabits = state.habits.filter(
        (habit) => habit._id !== deleteHabitID,
      );

      return {
        ...state,
        habits: deletedHabits,
      };
    //
    case "TOGGLE_HABIT":
      const { id: toggleHabitID } = action.payload;

      const toggledHabits = state.habits.map((habit) =>
        habit._id === toggleHabitID
          ? {
              ...habit,
              isCompleted: !habit.isCompleted,
            }
          : habit,
      );

      return {
        ...state,
        habits: toggledHabits,
      };
    //
    case "MOVE_HABITS":
      return {
        ...state,
        habits: moveItemsInList(
          state.habits,
          action.payload.fromIndex,
          action.payload.toIndex,
        ),
      };
    //
    default:
      return state;
  }
}

function optimisticReducer(currentHabits, action) {
  switch (action.type) {
    case "TOGGLE_HABIT":
      const { id } = action.payload;

      return currentHabits.map((h) =>
        h._id === id ? { ...h, isCompleted: !h.isCompleted } : h,
      );

    default:
      return currentHabits;
  }
}

export const HabitProvider = ({ children }) => {
  const [habitState, habitDispatch] = useReducer(reducer, initialState);

  const [optimistcHabits, setOptimisticHabits] = useOptimistic(
    habitState.habits,
    optimisticReducer,
  );

  const { isLoggedIn, isAuthLoading, authFetch } = useAuth();

  // Load User's Habits from DB on Init.
  useEffect(() => {
    //

    if (isAuthLoading) return;

    if (!isLoggedIn) {
      habitDispatch({ type: "SET_HABITS", payload: habitsList });
      return;
    }

    authFetch({
      url: "user/habits",
    })
      .then(async (response) => {
        const data = await response.json();
        // console.log(data);

        habitDispatch({ type: "SET_HABITS", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn, authFetch, isAuthLoading]);

  // Add Habits
  const addHabit = async (habit) => {
    try {
      //
      if (isLoggedIn) {
        //
        const res = await authFetch({
          url: "user/habits",
          method: "POST",
          body: {
            icon: habit?.icon,
            title: habit?.title,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw Error(data.message);
        }

        const habitData = {
          _id: data._id,
          ...habit,
          isCompleted: false,
        };

        habitDispatch({ type: "ADD_HABIT", payload: habitData });
        //
      } else {
        const habitData = {
          _id: habitState.habits.length + 1,
          ...habit,
          isCompleted: false,
        };

        habitDispatch({ type: "ADD_HABIT", payload: habitData });
      }
      //
    } catch (err) {
      throw Error(err);
    }
  };

  // Edit Habits
  const editHabit = async (id, selectedEmoji, label) => {
    try {
      //
      const habit = habitState.habits.find((habit) => habit._id === id);

      // Return if there's no changes
      if (selectedEmoji === habit.icon && label === habit.title) return;

      if (isLoggedIn) {
        //
        const res = await authFetch({
          url: `user/habits/${id}`,
          method: "PATCH",
          body: {
            icon: selectedEmoji,
            title: label,
            // description: "",
            // isCompleted: false,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw Error(data.message);
        }

        habitDispatch({
          type: "EDIT_HABIT",
          payload: {
            id,
            selectedEmoji,
            title: label,
          },
        });
        //
      } else {
        //
        habitDispatch({
          type: "EDIT_HABIT",
          payload: {
            id,
            selectedEmoji,
            title: label,
          },
        });
        //
      }
    } catch (err) {
      throw Error(err);
    }
  };

  //  Delete Habits
  const removeHabit = useCallback(
    async (id) => {
      try {
        if (isLoggedIn) {
          //
          const res = await authFetch({
            url: `user/habits/${id}`,
            method: "DELETE",
          });

          const data = await res.json();

          if (!res.ok) {
            throw Error(data.message);
          }

          habitDispatch({
            type: "DELETE_HABIT",
            payload: {
              id,
            },
          });
          //
        } else {
          habitDispatch({
            type: "DELETE_HABIT",
            payload: {
              id,
            },
          });
        }
      } catch (err) {
        throw Error(err);
      }
    },
    [authFetch, isLoggedIn],
  );

  // Toggle Habits
  const toggleHabit = useCallback(
    async (id) => {
      startTransition(async () => {
        try {
          //
          if (isLoggedIn) {
            //
            setOptimisticHabits({
              type: "TOGGLE_HABIT",
              payload: {
                id,
              },
            });

            const res = await authFetch({
              url: `user/habits/${id}/toggleStatus`,
              method: "PATCH",
            });

            const data = await res.json();

            if (!res.ok) {
              throw Error(data.message);
            }

            startTransition(() => {
              habitDispatch({
                type: "TOGGLE_HABIT",
                payload: {
                  id,
                },
              });
            });
            //
          } else {
            habitDispatch({
              type: "TOGGLE_HABIT",
              payload: {
                id,
              },
            });
          }
        } catch (err) {
          throw Error(err);
        }
      });
    },
    [authFetch, isLoggedIn, setOptimisticHabits],
  );

  // Reorder Habit: Drag & Drop
  const reorderHabit = async (habitId, fromIndex, toIndex) => {
    //

    try {
      if (isLoggedIn) {
        //
        const res = await authFetch({
          url: `user/habits/${habitId}/orderHabit`,
          method: "PATCH",
          body: {
            toIndex,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw Error(data.message);
        }

        habitDispatch({
          type: "MOVE_HABITS",
          payload: {
            fromIndex,
            toIndex,
          },
        });

        toaster.create({
          title: `${data.message}`,
          type: "success",
          closable: true,
        });

        //
      } else {
        //
        habitDispatch({
          type: "MOVE_HABITS",
          payload: {
            fromIndex,
            toIndex,
          },
        });
        //
      }
      //
    } catch (err) {
      toaster.create({
        title: `${err.message}`,
        type: "warning",
        closable: true,
      });
      throw Error(err);
    }

    //
  };

  return (
    <HabitContext.Provider
      value={{
        habits: optimistcHabits,
        habitDispatch,
        isHabitLoading: habitState.isHabitLoading,
        addHabit,
        editHabit,
        removeHabit,
        toggleHabit,
        reorderHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
