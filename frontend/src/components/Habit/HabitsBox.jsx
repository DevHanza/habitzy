import { useCallback, useEffect } from "react";

import WidgetsWrapper from "@/components/ui/WidgetWrapper";
import HabitCard from "@/components/Habit/HabitCard";
import AddHabitBox from "@/components/Habit/AddHabitBox";
import useHabits from "@/hooks/useHabits";

import { Plus } from "lucide-react";
import { Button, Stack, VStack } from "@chakra-ui/react";

import { moveItemsInList } from "@/utils/moveItemsInList";
import { useAuth } from "@/hooks/useAuth";

function HabitsBox() {
  const { isLoggedIn, authFetch } = useAuth();

  const {
    habits,
    setHabits,
    isAddingHabits,
    setIsAddingHabits,
    toggleHabit,
    removeHabit,
  } = useHabits();

  // Load Habits from DB on Init.
  useEffect(() => {
    //
    if (!isLoggedIn) return;

    authFetch({
      url: "user/habits",
    })
      .then(async (response) => {
        const data = await response.json();
        // console.log(data);
        setHabits(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    //
  }, [isLoggedIn, authFetch, setHabits]);

  // Pragmatic Drag & Drop Features

  const moveItems = useCallback(
    (fromIndex, toIndex) => {
      setHabits((currentHabits) => {
        return moveItemsInList(currentHabits, fromIndex, toIndex);
      });
    },
    [setHabits]
  );

  // Functions for adding habits
  function handleAddHabit() {
    setIsAddingHabits((prev) => !prev);
  }

  function handleBottomAddHabit() {
    handleAddHabit();
    window.scrollTo(0, 0);
    // if (addHabitBoxRef.current) {
    //   addHabitBoxRef.current.scrollIntoView();
    // }
  }

  return (
    <WidgetsWrapper
      btnlinkprops={{
        onClick: handleAddHabit,
        disabled: !isAddingHabits,
      }}
      // bg={"none"}
      // bg={"bg.subtle"}
      // border="none"
      // height={"100%"}
      title={"Habits"}
      buttonText={"Add Habit"}
      buttonIcon={<Plus />}
    >
      <Stack gap={6}>
        <VStack gap={2}>
          {!isAddingHabits && <AddHabitBox />}
          {habits.map((habit, index) => (
            <HabitCard
              key={habit._id}
              id={habit._id}
              index={index}
              label={habit.title}
              icon={habit.icon}
              isCompleted={habit.isCompleted}
              toggleHabit={toggleHabit}
              moveItems={moveItems}
              removeHabit={removeHabit}
            />
          ))}
        </VStack>
        <VStack>
          <Button
            variant="solid"
            colorPalette={"teal"}
            width={"100%"}
            onClick={handleBottomAddHabit}
            disabled={!isAddingHabits}
          >
            <Plus /> Add a Habit
          </Button>
        </VStack>
      </Stack>
    </WidgetsWrapper>
  );
}

export default HabitsBox;
