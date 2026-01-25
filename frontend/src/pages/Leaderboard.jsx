import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Separator,
} from "@chakra-ui/react";
import LeaderboardCard from "@/components/LeaderboardCard";
import UserLeaderboardCard from "@/components/UserLeaderboardCard";
import NavigateControls from "@/components/layout/NavigateControls";
import { useAuth } from "@/hooks/useAuth";

function Leaderboard() {
  const { user, authFetch } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //
    authFetch({
      url: "user/leaderboard",
    })
      .then(async (response) => {
        const data = await response.json();
        setUsers(data.slice(0, 20));
      })
      .catch((err) => {
        console.log(err);
      });
    //
  }, [authFetch, setUsers]);

  return (
    <>
      <Container paddingInline={{ smDown: 0 }} position={"relative"}>
        <NavigateControls />
        <VStack>
          <Container maxW={"xl"}>
            <Flex direction={"column"} gap={8}>
              <VStack>
                <Heading size={{ base: "2xl", md: "2xl" }}>Leaderboard</Heading>
                <Text textAlign={"center"} color={"fg.muted"} pb={6}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  a pariatur doloribus.
                </Text>
                <Separator width={"100%"} />
              </VStack>
            </Flex>
          </Container>

          <Container maxW={"xl"}>
            <VStack gap={2} width={"100%"}>
              {users.map((user, index) => (
                <LeaderboardCard
                  key={user._id}
                  rank={index + 1}
                  name={user.name}
                  username={user.username}
                  streak={user.streak?.currentStreak}
                />
              ))}
            </VStack>
          </Container>
        </VStack>
      </Container>
      <HStack
        position={"fixed"}
        bottom={{ base: "var(--bottom-nav-height)", md: 0 }}
        // left={{ base: "var(--bottom-nav-height)", md: 0 }}
        background={"bg.muted"}
        width={"100%"}
        zIndex={10}
        py={2}
        mt={2}
      >
        <Container maxW={"xl"}>
          <UserLeaderboardCard
            rank={"10%"}
            streak={user?.streak?.currentStreak}
            name={user?.name}
          />
        </Container>
      </HStack>
    </>
  );
}

export default Leaderboard;
