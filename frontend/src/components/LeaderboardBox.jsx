import { VStack } from "@chakra-ui/react";
import WidgetsWrapper from "./ui/WidgetWrapper";
import LeaderboardCard from "./LeaderboardCard";

function LeaderboardBox() {
  return (
    <WidgetsWrapper title={"Leaderboard"} linkText={"See more"} link={"/leaderboard"}>
      <VStack gap={2}>
        <LeaderboardCard />
        <LeaderboardCard />
        <LeaderboardCard />
        <LeaderboardCard />
      </VStack>
    </WidgetsWrapper>
  );
}

export default LeaderboardBox;
