import ProgressBox from "@/components/ProgressBox";
import { useBreakpointValue } from "@chakra-ui/react";
import QuoteBox from "@/components/QuoteBox";
import HabitsBox from "@/components/Habit/HabitsBox";
import { Container, Flex, Stack } from "@chakra-ui/react";
// import GreetingBox from "@/components/GreetingBox";

import LeaderboardBox from "@/components/LeaderboardBox";
import StreakBox from "@/components/StreakBox";

function Home() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Container>
      <Flex
        gap={4}
        direction={{ base: "column", md: "row" }}
        minHeight={"100vh"}
      >
        {isDesktop ? (
          <Stack flex={1} display={{ base: "none", lg: "flex" }}>
            <QuoteBox />
            {/* <GreetingBox /> */}
            <ProgressBox />
          </Stack>
        ) : (
          ""
        )}

        <Stack flex={2}>
          <HabitsBox />
        </Stack>

        {isDesktop ? (
          <Stack flex={1} display={{ base: "none", lg: "flex" }}>
            <StreakBox />
            <LeaderboardBox />
          </Stack>
        ) : (
          ""
        )}
      </Flex>
    </Container>
  );
}

export default Home;
