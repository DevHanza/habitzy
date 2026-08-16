import { useMemo, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  HStack,
  VStack,
  Stack,
  Image,
  Heading,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import NumberFlow from "@number-flow/react";

import { useHabits } from "@/hooks/useHabits";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

import runOncePerDay from "@/utils/runOncePerDay";

import { toaster } from "@/components/ui/toaster";
import WidgetWrapper from "@/components/ui/WidgetWrapper";

function StreakBox() {
  const { authFetch, isLoggedIn } = useAuth();
  const { user, isUserLoading, userDispatch } = useUser();
  const { habits } = useHabits();

  const hasStreak = user?.streak?.currentStreak > 0;

  const allCompleted = useMemo(() => {
    return habits.length > 0 && habits.every((habit) => habit.isCompleted);
  }, [habits]);

  // Increment Streak
  useEffect(() => {
    async function incrementStreak() {
      try {
        //
        const res = await authFetch({
          url: "user/increment-streak",
          method: "PATCH",
        });

        const data = await res.json();

        if (!res.ok) {
          throw Error(data.message);
        }

        userDispatch({
          type: "INCREMENT_STREAK",
        });
        //
      } catch (err) {
        toaster.create({
          title: `${err.message}`,
          type: "warning",
          closable: true,
        });
        throw Error(err);
      }
    }

    if (isLoggedIn && allCompleted) {
      // runOncePerDay("#incrementStreak", () => {
      incrementStreak();
      // });
    } else {
    }
  }, [allCompleted, habits.length]);

  // Clear Streak
  useEffect(() => {
    if (isUserLoading) return;

    async function clearStreak() {
      try {
        //
        const res = await authFetch({
          url: "user/clear-streak",
          method: "PATCH",
        });

        const data = await res.json();

        if (!res.ok) {
          throw Error(data.message);
        }

        userDispatch({
          type: "CLEAR_STREAK",
        });
        //
      } catch (err) {
        toaster.create({
          title: `${err.message}`,
          type: "warning",
          closable: true,
        });
        throw Error(err);
      }
    }

    runOncePerDay("#clearStreak", () => {
      //
      if (isLoggedIn && !allCompleted) {
        clearStreak();
      } else {
      }
    });
  }, [isUserLoading]);

  return (
    <WidgetWrapper p={{ base: "0.75rem" }} py={{ md: 6 }} w={"100%"} h={"100%"}>
      <Stack h={"100%"} justifyContent={"space-between"}>
        <Skeleton loading={isUserLoading}>
          <HStack
            gap={1}
            alignItems={"center"}
            justifyContent={{ base: "start", md: "center" }}
          >
            <Heading
              display={"inline-block"}
              size={{ base: "3xl", md: "5xl" }}
              fontWeight={700}
              lineHeight={0}
              letterSpacing={1}
            >
              {/* {user?.streak?.currentStreak} */}

              <NumberFlow
                className="streak"
                value={user?.streak?.currentStreak ?? 0}
                style={{
                  lineHeight: 1,
                  overflow: "hidden",
                  "--number-flow-mask-height": "fit-content",
                  "--number-flow-mask-width": "auto",
                }}
              />
            </Heading>
            <Image
              src={
                hasStreak
                  ? "https://emojicdn.elk.sh/🔥?style=facebook"
                  : "https://emojicdn.elk.sh/🌱?style=facebook"
              }
              height={{ base: "1.5rem", md: "2.75rem" }}
            />
          </HStack>
        </Skeleton>

        <Skeleton loading={isUserLoading}>
          <VStack gap={0} alignItems={{ base: "flex-start", md: "center" }}>
            <Heading
              size={{ base: "lg", md: "xl" }}
              textAlign={{ base: "start", md: "center" }}
              fontSize={{ base: "sm", md: "xl" }}
              lineHeight={1.25}
              fontWeight={{ base: "500", md: "600" }}
              color={{ mdDown: "fg.muted" }}
            >
              {hasStreak ? "Keep the streak alive!" : "Start a streak!"}
            </Heading>
            <Text color={"fg.muted"} hideBelow={"md"}>
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
