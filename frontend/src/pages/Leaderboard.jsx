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
    <Container paddingInline={{ smDown: 0 }} position={"relative"}>
      <NavigateControls />
      <VStack>
        <Container maxW={"xl"}>
          <Flex direction={"column"} gap={8}>
            <VStack px={{ base: "1rem", md: "none" }}>
              <Heading size={{ base: "2xl", md: "2xl" }}>Leaderboard</Heading>
              <Text textAlign={"center"} color={"fg.muted"} pb={6}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque a
                pariatur doloribus.
              </Text>
              <Separator width={"100%"} />
            </VStack>
          </Flex>
        </Container>

        <VStack width={"100%"}>
          <Container maxW={"xl"}>
            <VStack gap={2} width={"100%"} px={{ base: "1rem", md: "none" }}>
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

          <HStack
            position={"sticky"}
            bottom={{ base: "var(--bottom-nav-height)", md: 0 }}
            left={{ base: "var(--bottom-nav-height)", md: 0 }}
            background={"bg.muted"}
            borderRadius={4}
            width={"100%"}
            zIndex={10}
            py={2}
            mt={2}
          >
            <Container maxW={"xl"}>
              <UserLeaderboardCard
                rank={"10%"}
                streak={users.streak?.currentStreak}
                name={user?.name}
              />
            </Container>
          </HStack>
        </VStack>
      </VStack>
    </Container>
  );
}

export default Leaderboard;
