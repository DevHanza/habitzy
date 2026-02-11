import { useState, useCallback } from "react";

import WidgetsWrapper from "@/components/ui/WidgetWrapper";
import HabitCard from "@/components/Habit/HabitCard";
import AddHabitBox from "@/components/Habit/AddHabitBox";
import useHabits from "@/hooks/useHabits";
import HabitCardSkeleton from "@/components/Habit/HabitCardSkeleton";
import HabitsBoxEmpty from "@/components/Habit/HabitsBoxEmpty";

import { Plus } from "lucide-react";
import { Button, Stack, VStack } from "@chakra-ui/react";

import { moveItemsInList } from "@/utils/moveItemsInList";

function HabitsBox() {
  const [isAddingHabits, setIsAddingHabits] = useState(false);

  const { habits, isHabitLoading, setHabits, toggleHabit, removeHabit } =
    useHabits();

  const hasHabits = habits.length > 0;

  // Pragmatic Drag & Drop Features

  const moveItems = useCallback(
    (fromIndex, toIndex) => {
      setHabits((currentHabits) => {
        return moveItemsInList(currentHabits, fromIndex, toIndex);
      });
    },
    [setHabits],
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

  const skeletonHabitCards = Array.from({ length: 7 }, (_, index) => (
    <HabitCardSkeleton key={index} />
  ));

  const habitCards = habits.map((habit, index) => (
    <HabitCard
      key={habit._id}
      index={index}
      id={habit._id}
      icon={habit.icon}
      label={habit.title}
      toggleHabit={toggleHabit}
      isCompleted={habit.isCompleted}
      removeHabit={removeHabit}
      moveItems={moveItems}
    />
  ));

  const renderHabits = () => {
    if (isHabitLoading) return skeletonHabitCards;

    if (hasHabits) {
      return habitCards;
    } else {
      return (
        <HabitsBoxEmpty
          isAddingHabits={isAddingHabits}
          handleBottomAddHabit={handleBottomAddHabit}
        />
      );
    }
  };

  return (
    <WidgetsWrapper
      btnlinkprops={{
        onClick: handleAddHabit,
        disabled: isAddingHabits,
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
          {isAddingHabits && (
            <AddHabitBox setIsAddingHabits={setIsAddingHabits} />
          )}

          {
            //
            renderHabits()
            //
          }
        </VStack>
        <VStack display={habits.length > 0 ? "flex" : "none"}>
          <Button
            variant="solid"
            colorPalette={"teal"}
            width={"100%"}
            onClick={handleBottomAddHabit}
            disabled={isAddingHabits}
          >
            <Plus /> Add a Habit
          </Button>
        </VStack>
      </Stack>
    </WidgetsWrapper>
  );
}

export default HabitsBox;
