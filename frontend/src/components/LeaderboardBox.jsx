import { Heading, HStack, Image } from "@chakra-ui/react";
import WidgetsWrapper from "./ui/WidgetsWrapper";

function LeaderboardBox() {
  return (
    <WidgetsWrapper>
      <HStack
        justifyContent={"space-between"}
        marginBottom={{ base: "1rem", md: "1.5rem" }}
      >
        <Heading>Leaderboard</Heading>
        <Image
          src="https://emojicdn.elk.sh/👑?style=facebook"
          height={{ base: "3.5rem", md: "2rem" }}
          width={{ base: "3.5rem", md: "2rem" }}
        ></Image>
      </HStack>
    </WidgetsWrapper>
  );
}

export default LeaderboardBox;
