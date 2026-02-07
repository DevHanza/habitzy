import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import WidgetsWrapper from "@/components/ui/WidgetWrapper";
import LeaderboardCard from "@/components/Leaderboard/LeaderboardCard";
import LeaderboardBoxEmpty from "@/components/Leaderboard/LeaderboardBoxEmpty";

import { useAuth } from "@/hooks/useAuth";
import LeaderboardCardSkeleton from "@/components/Leaderboard/LeaderboardCardSkeleton";

function LeaderboardBox() {
  const { authFetch } = useAuth();
  const [leadUsers, setLeadUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasleadUsers = leadUsers.length > 0;

  useEffect(() => {
    authFetch({
      url: "user/leaderboard",
    })
      .then(async (response) => {
        const data = await response.json();
        setLeadUsers(data.slice(0, 20));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [authFetch, setLeadUsers]);

  //

  const skeletonLeaderboardCards = Array.from({ length: 8 }, (_, index) => (
    <LeaderboardCardSkeleton key={index} />
  ));

  const leaderboardCards = leadUsers.map((user, index) => (
    <LeaderboardCard
      key={user._id}
      rank={index + 1}
      name={user.name}
      username={user.username}
      streak={user.streak.currentStreak}
    />
    //
  ));

  const renderLeaderboardCards = () => {
    if (isLoading) return skeletonLeaderboardCards;

    if (hasleadUsers) {
      return leaderboardCards;
    } else {
      return <LeaderboardBoxEmpty />;
    }
  };

  return (
    <WidgetsWrapper
      title={"Leaderboard"}
      linkText={"See more"}
      link={"/leaderboard"}
    >
      <VStack gap={1}>{renderLeaderboardCards()}</VStack>
    </WidgetsWrapper>
  );
}

export default LeaderboardBox;
