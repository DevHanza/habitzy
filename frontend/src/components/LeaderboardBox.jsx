import { VStack } from "@chakra-ui/react";
import WidgetsWrapper from "@/components/ui/WidgetWrapper";
import LeaderboardCard from "@/components/LeaderboardCard";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

function LeaderboardBox() {
  const { authFetch } = useAuth();
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
    <WidgetsWrapper
      title={"Leaderboard"}
      linkText={"See more"}
      link={"/leaderboard"}
    >
      <VStack gap={2}>
        {users.map((user, index) => (
          <LeaderboardCard
            key={user._id}
            rank={index + 1}
            name={user.name}
            username={user.username}
            streak={user.streak.currentStreak}
          />
        ))}
      </VStack>
    </WidgetsWrapper>
  );
}

export default LeaderboardBox;
