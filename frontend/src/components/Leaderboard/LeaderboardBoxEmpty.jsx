import { VStack, EmptyState } from "@chakra-ui/react";
import { TrendingUp } from "lucide-react";

function LeaderboardBoxEmpty() {
  return (
    <EmptyState.Root size={"sm"}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <TrendingUp />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>No rankings yet</EmptyState.Title>
          <EmptyState.Description>
            Start completing tasks to rank up.
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}

export default LeaderboardBoxEmpty;
