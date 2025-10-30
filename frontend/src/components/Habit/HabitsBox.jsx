import WidgetsWrapper from "../ui/WidgetWrapper";
import HabitCard from "./HabitCard";
import { Plus } from "lucide-react";
import { Button, Stack, VStack } from "@chakra-ui/react";
import AddHabitBox from "./AddHabitBox";
import useHabits from "@/hooks/useHabits";
import { useCallback, useRef } from "react";
import { moveItemsInList } from "@/utils/moveItemsInList";

function HabitsBox() {
  const addHabitBoxRef = useRef();
  const {
    habits,
    setHabits,
    isAddingHabits,
    setIsAddingHabits,
    toggleHabit,
    removeHabit,
  } = useHabits();

  // Pragmatic Drag & Drop Features

  const moveItems = useCallback((fromIndex, toIndex) => {
    setHabits((currentHabits) => {
      return moveItemsInList(currentHabits, fromIndex, toIndex);
    });
  }, []);

  // Functions for adding habits
  function handleAddHabit() {
    setIsAddingHabits((prev) => !prev);
  }

  function handleBottomAddHabit() {
    handleAddHabit();
    if (addHabitBoxRef.current) {
      addHabitBoxRef.current.scrollIntoView();
    }
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
        <VStack gap={2} ref={addHabitBoxRef}>
          {!isAddingHabits && <AddHabitBox />}
          {habits.map((habit, index) => (
            <HabitCard
              key={habit.id}
              id={habit.id}
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
