import { useCallback } from "react";

import WidgetsWrapper from "@/components/ui/WidgetWrapper";
import HabitCard from "@/components/Habit/HabitCard";
import AddHabitBox from "@/components/Habit/AddHabitBox";
import useHabits from "@/hooks/useHabits";

import { BookOpenCheck, Plus } from "lucide-react";
import {
  Button,
  Stack,
  VStack,
  ButtonGroup,
  EmptyState,
} from "@chakra-ui/react";

import { moveItemsInList } from "@/utils/moveItemsInList";

function HabitsBox() {
  const {
    habits,
    setHabits,
    isAddingHabits,
    setIsAddingHabits,
    toggleHabit,
    removeHabit,
  } = useHabits();

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
          {habits.length > 0 ? (
            habits.map((habit, index) => (
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
            ))
          ) : (
            <EmptyState.Root
              // background={"#2c2c2c"}
              pt={16}
              pb={24}
            >
              <EmptyState.Content>
                <EmptyState.Indicator>
                  {/* <HiColorSwatch /> */}
                  <BookOpenCheck />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>Start adding habits</EmptyState.Title>
                  <EmptyState.Description>
                    Add a new daily habit to get started.
                  </EmptyState.Description>
                </VStack>
                <ButtonGroup>
                  <Button
                    size={"sm"}
                    onClick={handleBottomAddHabit}
                    disabled={!isAddingHabits}
                    colorPalette={"teal"}
                  >
                    Create a Habit
                  </Button>
                </ButtonGroup>
              </EmptyState.Content>
            </EmptyState.Root>
          )}

          {/* {habits.length > 0 && } */}
        </VStack>
        <VStack display={habits.length > 0 ? "flex" : "none"}>
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
