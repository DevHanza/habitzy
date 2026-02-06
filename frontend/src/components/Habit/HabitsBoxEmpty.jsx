import { BookOpenCheck } from "lucide-react";
import { Button, VStack, ButtonGroup, EmptyState } from "@chakra-ui/react";

function HabitsBoxEmpty({ isAddingHabits, handleBottomAddHabit }) {
  return (
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
            disabled={isAddingHabits}
            colorPalette={"teal"}
          >
            Create a Habit
          </Button>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}

export default HabitsBoxEmpty;
