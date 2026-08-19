import { useState } from "react";
import { Button, Stack, VStack, Box } from "@chakra-ui/react";
import { Plus } from "lucide-react";

import { useHabits } from "@/hooks/useHabits";
import WidgetsWrapper from "@/components/ui/WidgetWrapper";
import HabitCard from "@/components/Habit/HabitCard";
import AddHabitBox from "@/components/Habit/AddHabitBox";
import HabitCardSkeleton from "@/components/Habit/HabitCardSkeleton";
import HabitsBoxEmpty from "@/components/Habit/HabitsBoxEmpty";

function HabitsBox() {
  const [isAddingHabits, setIsAddingHabits] = useState(false);

  const { habits, isHabitLoading, toggleHabit, removeHabit, reorderHabit } =
    useHabits();

  const hasHabits = habits.length > 0;

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
      reorderHabit={reorderHabit}
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
        variant: "ghost",
      }}
      // bg={"none"}
      // bg={"bg.subtle"}
      // border="none"
      // height={"100%"}
      title={"Habits"}
      buttonText={"Add Habit"}
      buttonIcon={<Plus />}
      px={{ base: "0.75rem", md: "1rem" }}
    >
      <Stack gap={6} position={"relative"}>
        <VStack gap={2}>
          {isAddingHabits && (
            <AddHabitBox setIsAddingHabits={setIsAddingHabits} />
          )}

          {renderHabits()}
        </VStack>
        <VStack
          display={hasHabits ? "flex" : "none"}
          position={"sticky"}
          bottom={{ base: 24, md: 4 }}
          zIndex={99}
          shadow="
            0px -20px 20px var(--shadow-color), 
            0px 20px 20px var(--shadow-color)
          "
          shadowColor={"gray.contrast"}
        >
          <Button
            variant="solid"
            colorPalette={import.meta.env.VITE_APP_COLOR}
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
