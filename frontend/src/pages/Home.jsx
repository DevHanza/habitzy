import GreetingBox from "@/components/GreetingBox";
import ProgressBox from "@/components/ProgressBox";
import QuoteBox from "@/components/QuoteBox";
import HabitsBox from "@/components/HabitsBox";
import { Container, Flex, Stack } from "@chakra-ui/react";

import LeaderboardBox from "@/components/LeaderboardBox";
import StreakBox from "@/components/StreakBox";

function Home() {
  return (
    <Container>
      <Flex
        gap={4}
        direction={{ base: "column", md: "row" }}
        minHeight={"85vh"}
      >
        <Stack flex={1}>
          <GreetingBox />
          <ProgressBox />
        </Stack>

        <Stack flex={2}>
          <HabitsBox />
        </Stack>
        <Stack flex={1}>
          <StreakBox />
          <QuoteBox />
          <LeaderboardBox />
        </Stack>
      </Flex>
    </Container>
  );
}

export default Home;
