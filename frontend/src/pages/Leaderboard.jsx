import {
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  Separator,
  HStack,
} from "@chakra-ui/react";
// import LeaderboardCard from "@/components/LeaderboardCard";
import LeaderboardCard from "@/components/LeaderboardCard";
import UserLeaderboardCard from "@/components/UserLeaderboardCard";
const users = [
  { name: "Brook Lesnar", username: "brookkiller", streak: 45 },
  { name: "Diego Ramirez", username: "drz_90", streak: 34 },
  { name: "Alice Wong", username: "awong23", streak: 27 },
  { name: "Hana Kimura", username: "hanak", streak: 22 },
  { name: "Sophia Turner", username: "sophiat", streak: 19 },
  { name: "Liam Carter", username: "lcarter7", streak: 16 },
  { name: "Shane Nelson", username: "shanethedev", streak: 12 },
  { name: "Marcus Reid", username: "mr_reid", streak: 8 },
  { name: "Emma Brooks", username: "emmbrooks", streak: 5 },
  { name: "John Lennon", username: "johnnybeat", streak: 3 },
];

function Leaderboard() {
  return (
    <Container maxW={"xl"}>
      <Flex direction={"column"} gap={8}>
        <VStack>
          <Heading size={"3xl"}>Leaderboard</Heading>
          <Text textAlign={"center"} color={"fg.muted"} pb={6}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque a
            pariatur doloribus.
          </Text>
          <Separator width={"100%"} />
        </VStack>
        <VStack gap={2} width={"100%"}>
          {users.map((user, index) => (
            <LeaderboardCard
              key={user.username}
              rank={index + 1}
              name={user.name}
              username={user.username}
              streak={user.streak}
            />
          ))}
        </VStack>
        <HStack
          position={"sticky"}
          bottom={0}
          left={0}
          background={"bg.muted"}
          width={"100%"}
          zIndex={10}
          py={2}
        >
          <UserLeaderboardCard />
        </HStack>
      </Flex>
    </Container>
  );
}

export default Leaderboard;
