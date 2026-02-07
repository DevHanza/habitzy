import { useMemo, memo, useEffect } from "react";
import WidgetWrapper from "./ui/WidgetWrapper";
import {
  HStack,
  VStack,
  Stack,
  Image,
  Heading,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import useHabits from "@/hooks/useHabits";
import { useUser } from "@/hooks/useUser";

import runOncePerDay from "@/utils/runOncePerDay";

function StreakBox() {
  const { habits } = useHabits();
  const { user, isUserLoading, incrementStreak } = useUser();

  const hasStreak = user?.streak?.currentStreak > 0;

  const allCompleted = useMemo(() => {
    return habits.every((habit) => habit.isCompleted);
  }, [habits]);

  useEffect(() => {
    if (allCompleted && habits.length > 0) {
      runOncePerDay("#incrementStreak", () => {
        incrementStreak();
        // console.log("Streak incremented!");
      });
    }
  }, [allCompleted, incrementStreak, habits.length]);

  return (
    <WidgetWrapper py={6}>
      <Stack>
        <Skeleton loading={isUserLoading}>
          <HStack gap={1} alignItems={"center"} justifyContent={"center"}>
            <Heading
              display={"inline-block"}
              size={{ base: "3xl", md: "5xl" }}
              fontWeight={700}
              lineHeight={1}
              letterSpacing={1}
            >
              {user?.streak?.currentStreak}
            </Heading>
            <Image
              src={
                hasStreak
                  ? "https://emojicdn.elk.sh/🔥?style=facebook"
                  : "https://emojicdn.elk.sh/🌱?style=facebook"
              }
              height={{ base: "1.75rem", md: "2.75rem" }}
            />
          </HStack>
        </Skeleton>

        <Skeleton loading={isUserLoading}>
          <VStack gap={0}>
            <Heading size={{ base: "lg", md: "xl" }}>
              {hasStreak ? "Keep the streak alive!" : "Start a streak!"}
            </Heading>
            <Text color={"fg.muted"}>
              {hasStreak
                ? "Consistency is power."
                : "Consistency starts today."}
            </Text>
          </VStack>
        </Skeleton>
      </Stack>
    </WidgetWrapper>
  );
}

export default memo(StreakBox);
