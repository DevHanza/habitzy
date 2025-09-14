import WidgetsWrapper from "./ui/WidgetWrapper";
import HabitCard from "./HabitCard";
import { Plus } from "lucide-react";
import { Button, Stack, VStack } from "@chakra-ui/react";

function HabitsBox() {
  return (
    <WidgetsWrapper
      // bg={"none"}
      // bg={"bg.subtle"}
      // border="none"
      height={"100%"}
      title={"Habits"}
      buttonText={"Add Habit"}
      buttonIcon={<Plus />}
    >
      <Stack gap={6}>
        <VStack gap={2}>
          <HabitCard />
          <HabitCard />
          <HabitCard />
          <HabitCard />
          <HabitCard />
        </VStack>
        <VStack>
          <Button variant="outline" colorPalette={"teal"} width={"100%"}>
            <Plus /> Add a Habit
          </Button>
        </VStack>
      </Stack>
    </WidgetsWrapper>
  );
}

export default HabitsBox;
