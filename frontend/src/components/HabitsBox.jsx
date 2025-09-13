import WidgetsWrapper from "./ui/WidgetWrapper";
import HabitCard from "./HabitCard";
import { Plus } from "lucide-react";
import { VStack } from "@chakra-ui/react";

function HabitsBox() {
  return (
    <WidgetsWrapper
      title={"Habits"}
      buttonText={"Add Habit"}
      buttonIcon={<Plus />}
    >
      <VStack gap={3}>
        <HabitCard />
        <HabitCard />
        <HabitCard />
        <HabitCard />
        <HabitCard />
      </VStack>
    </WidgetsWrapper>
  );
}

export default HabitsBox;
