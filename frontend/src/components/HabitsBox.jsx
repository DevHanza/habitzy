import WidgetsWrapper from "./ui/WidgetWrapper";
import HabitCard from "./HabitCard";
import { Plus } from "lucide-react";
import { Button, For, Stack, VStack } from "@chakra-ui/react";
import AddHabitBox from "./AddHabitBox";

const habits = [
  { icon: "📖", name: "Read a book" },
  { icon: "🏃‍♂️", name: "Go for a run" },
  { icon: "🧘‍♀️", name: "Meditate" },
  { icon: "💧", name: "Drink water" },
  { icon: "📝", name: "Journal" },
  { icon: "🍎", name: "Eat healthy" },
  { icon: "🛏️", name: "Sleep early" },
  { icon: "🎸", name: "Practice guitar" },
  { icon: "🌱", name: "Gardening" },
  { icon: "🚿", name: "Cold shower" },
];

function HabitsBox() {
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
          <AddHabitBox />
          <For each={habits}>
            {(habit) => <HabitCard habit={habit.name} icon={habit.icon} />}
          </For>
        </VStack>
        <VStack>
          <Button variant="solid" colorPalette={"teal"} width={"100%"}>
            <Plus /> Add a Habit
          </Button>
        </VStack>
      </Stack>
    </WidgetsWrapper>
  );
}

export default HabitsBox;
