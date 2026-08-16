import { useHabits } from "@/hooks/useHabits";
import WidgetsWrapper from "./ui/WidgetWrapper";
import { Stack, HStack, Progress, Heading, Text } from "@chakra-ui/react";

function ProgressBox() {
  const { habits } = useHabits();

  const totalHabits = habits.length;
  const completedHabits = habits.filter((habit) => habit.isCompleted).length;
  const habitProgress = Math.floor((completedHabits / totalHabits) * 100);

  if (isNaN(habitProgress)) {
    return "";
  }

  return (
    <WidgetsWrapper
      p={{ base: "0.75rem", md: "1rem" }}
      w={"100%"}
      h={{ mdDown: "100%" }}
    >
      <Stack>
        <Stack
          mb={{ base: "0.5rem", md: "1rem" }}
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "start", md: "end" }}
          gap={{ base: 0.5, md: 0 }}
          flexWrap={"wrap"}
        >
          <Heading
            display={"inline-block"}
            size={{ base: "3xl", md: "4xl" }}
            fontWeight={700}
            lineHeight={{ mdDown: 1 }}
          >
            {habitProgress}%&nbsp;
          </Heading>
          <Heading
            color={"fg.muted"}
            display={"inline-block"}
            size={{ base: "sm", md: "lg" }}
            fontWeight={500}
          >
            out of 100%.
          </Heading>
        </Stack>

        <Progress.Root
          size={{ base: "xs", md: "md" }}
          value={habitProgress}
          defaultValue={0}
          colorPalette={import.meta.env.VITE_APP_COLOR}
        >
          <HStack>
            <Progress.Track flex="1">
              <Progress.Range />
            </Progress.Track>
          </HStack>
        </Progress.Root>
        <Text
          marginTop={".5em"}
          color={"fg.muted"}
          display={{ base: "none", md: "block" }}
        >
          Complete your daily goals to win both of your day and streak.
        </Text>
      </Stack>
    </WidgetsWrapper>
  );
}

export default ProgressBox;
