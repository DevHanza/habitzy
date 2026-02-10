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
import LeaderboardCard from "@/components/Leaderboard/LeaderboardCard";
import UserLeaderboardCard from "@/components/Leaderboard/UserLeaderboardCard";
import NavigateControls from "@/components/layout/NavigateControls";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import LeaderboardCardSkeleton from "@/components/Leaderboard/LeaderboardCardSkeleton";
import LeaderboardBoxEmpty from "@/components/Leaderboard/LeaderboardBoxEmpty";

function Leaderboard() {
  const { isLoggedIn, authFetch, isAuthLoading } = useAuth();
  const { user } = useUser();

  // leaderboard
  // setLeaderboard

  const [leaderboard, setLeaderboard] = useState({
    users: [],
    rank: null,
    isLoadingUsers: true,
    isLoadingRank: true,
  });

  const hasleadUsers = leaderboard.users.length > 0;

  // Fetch Leaderboard
  useEffect(() => {
    if (isAuthLoading) return;
    //
    authFetch({
      url: "user/leaderboard",
    })
      .then(async (response) => {
        const data = await response.json();
        //
        setLeaderboard((prev) => ({
          ...prev,
          users: data,
          isLoadingUsers: false,
        }));
        //
      })
      .catch((err) => {
        console.log(err);
        //
        setLeaderboard((prev) => ({
          ...prev,
          isLoadingUsers: false,
        }));
        //
      });
    //
  }, [authFetch, setLeaderboard, isAuthLoading]);

  // Fetch Leaderboard Rank
  useEffect(() => {
    if (isAuthLoading || !isLoggedIn) return;
    //
    authFetch({
      url: "user/leaderboard-rank",
    })
      .then(async (response) => {
        const data = await response.json();
        //
        setLeaderboard((prev) => ({
          ...prev,
          rank: data,
          isLoadingRank: false,
        }));
        //
      })
      .catch((err) => {
        console.log(err);
        //
        setLeaderboard((prev) => ({
          ...prev,
          isLoadingRank: false,
        }));
        //
      });
    //
  }, [authFetch, setLeaderboard, isAuthLoading]);

  const skeletonLeaderboardCards = Array.from({ length: 8 }, (_, index) => (
    <LeaderboardCardSkeleton key={index} />
  ));

  const leaderboardCards = leaderboard.users.map((user, index) => (
    <LeaderboardCard
      key={user._id}
      rank={index + 1}
      name={user.name}
      username={user.username}
      streak={user.streak?.currentStreak}
    />
  ));

  const renderLeaderboardCards = () => {
    if (leaderboard.isLoadingUsers) return skeletonLeaderboardCards;

    if (hasleadUsers) {
      return leaderboardCards;
    } else {
      return <LeaderboardBoxEmpty />;
    }
  };

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
              {renderLeaderboardCards()}
            </VStack>
          </Container>
        </VStack>
      </Container>
      {isLoggedIn && (
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
              isLoading={leaderboard.isLoadingRank}
              rank={leaderboard.rank?.percentage + "%"}
              streak={user?.streak?.currentStreak}
              // name={user?.name}
            />
          </Container>
        </HStack>
      )}
    </>
  );
}

export default Leaderboard;
