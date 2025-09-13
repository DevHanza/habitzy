import {
  Heading,
  Stack,
  VStack,
  HStack,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import WidgetsWrapper from "./ui/WidgetsWrapper";
import LeaderboardCard from "./LeaderboardCard";
import { Link } from "react-router";

function LeaderboardBox() {
  return (
    <WidgetsWrapper>
      <Stack gap={0}>
        <HStack
          justifyContent={"space-between"}
          marginBottom={{ base: "1rem", md: "1.5rem" }}
        >
          <Heading>Leaderboard</Heading>
          <ChakraLink
            as={Link}
            to={"/leaderboard"}
            outlineColor={"transparent"}
            fontSize={"0.75rem"}
          >
            See more <ArrowRight size={"1rem"} />
          </ChakraLink>
        </HStack>
        <VStack gap={2}>
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
        </VStack>
      </Stack>
    </WidgetsWrapper>
  );
}

export default LeaderboardBox;
