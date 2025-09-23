import WidgetsWrapper from "./ui/WidgetWrapper";
import HabitCard from "./HabitCard";
import { Plus } from "lucide-react";
import { Button, Stack, VStack } from "@chakra-ui/react";
import AddHabitBox from "./AddHabitBox";
import useHabits from "@/hooks/useHabits";
import { useRef } from "react";

function HabitsBox() {
  const addHabitBoxRef = useRef();
  const { habits, isAddingHabits, setIsAddingHabits, toggleHabit } =
    useHabits();

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
          {habits.toReversed().map((habit) => (
            <HabitCard
              key={habit.id}
              id={habit.id}
              habit={habit.title}
              icon={habit.icon}
              isCompleted={habit.isCompleted}
              toggleHabit={toggleHabit}
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
