import WidgetsWrapper from "./ui/WidgetWrapper";
import HabitCard from "./HabitCard";
import { Plus } from "lucide-react";
import { Button, For, Stack, VStack } from "@chakra-ui/react";
import AddHabitBox from "./AddHabitBox";
import useHabits from "@/hooks/useHabits";

function HabitsBox() {
  const { habits, isAddingHabits, setIsAddingHabits } = useHabits();
  return (
    <WidgetsWrapper
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
          {isAddingHabits && <AddHabitBox />}
          <For each={habits}>
            {(habit) => (
              <HabitCard
                key={habit.name}
                habit={habit.name}
                icon={habit.icon}
              />
            )}
          </For>
        </VStack>
        <VStack>
          <Button
            variant="solid"
            colorPalette={"teal"}
            width={"100%"}
            onClick={() => setIsAddingHabits(true)}
          >
            <Plus /> Add a Habit
          </Button>
        </VStack>
      </Stack>
    </WidgetsWrapper>
  );
}

export default HabitsBox;
