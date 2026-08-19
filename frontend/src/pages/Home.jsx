import { useState } from "react";
import {
  useBreakpointValue,
  Container,
  Flex,
  Stack,
  Button,
} from "@chakra-ui/react";

import { HabitProvider } from "@/context/HabitProvider";

import ProgressBox from "@/components/ProgressBox";
import QuoteBox from "@/components/QuoteBox";
import HabitsBox from "@/components/Habit/HabitsBox";
import LeaderboardBox from "@/components/Leaderboard/LeaderboardBox";
import StreakBox from "@/components/StreakBox";
import { Plus } from "lucide-react";
// import GreetingBox from "@/components/GreetingBox";

function Home() {
  const [isAddingHabits, setIsAddingHabits] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <HabitProvider>
      <Container>
        <Flex gap={4} direction={{ base: "column", md: "row" }}>
          {isDesktop && (
            <Stack flex={1} hideBelow={"lg"} minW={0}>
              {/*  */}
              <Button
                mb={4}
                variant="solid"
                colorPalette={import.meta.env.VITE_APP_COLOR}
                width={"100%"}
                disabled={isAddingHabits}
                onClick={() => {
                  setIsAddingHabits((prev) => !prev);
                }}
              >
                Add Habit <Plus />
              </Button>
              {/*  */}
              <QuoteBox />
              {/* <GreetingBox /> */}
              <ProgressBox />
            </Stack>
          )}

          <Stack flex={2} minW={0}>
            {!isDesktop && (
              <>
                {/* <QuoteBox /> */}
                <Stack direction={"row"} display={"flex"}>
                  <Stack flex={1}>
                    <StreakBox />
                  </Stack>
                  <Stack flex={1}>
                    <ProgressBox />
                  </Stack>
                </Stack>
              </>
            )}

            <HabitsBox
              isAddingHabits={isAddingHabits}
              setIsAddingHabits={setIsAddingHabits}
            />
          </Stack>

          {isDesktop && (
            <Stack flex={1} hideBelow={"lg"} minW={0}>
              <StreakBox />
              <LeaderboardBox />
            </Stack>
          )}
        </Flex>
      </Container>
    </HabitProvider>
  );
}

export default Home;
