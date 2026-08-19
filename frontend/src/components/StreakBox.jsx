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
  Button,
  CloseButton,
  Dialog,
  Portal,
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

  const [isModelOpen, setIsModelOpen] = useState(null);

  const hasStreak = user?.streak?.currentStreak > 0;

  const allCompleted = useMemo(() => {
    return habits.length > 0 && habits.every((habit) => habit.isCompleted);
  }, [habits]);

  // Increment Streak
  useEffect(() => {
    if (!allCompleted) return;

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
      } catch (err) {
        toaster.create({
          title: `${err.message}`,
          type: "warning",
          closable: true,
        });
      }
    }

    if (isLoggedIn) {
      //
      incrementStreak();
      //
    } else {
      //
      userDispatch({
        type: "INCREMENT_STREAK",
        payload: {
          currentStreak: 1,
        },
      });
      setIsModelOpen(true);
      //
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
      if (!isLoggedIn && !allCompleted) {
        return;
      } else if (isLoggedIn && !allCompleted) {
        clearStreak();
      }
    });
  }, [isUserLoading]);

  return (
    <WidgetWrapper
      p={{ base: "0.75rem" }}
      py={{ md: 6 }}
      w={"100%"}
      h={{ lgDown: "100%" }}
      
      // h={"100%"}
    >
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

      <StreakModel open={isModelOpen} setOpen={setIsModelOpen} />
    </WidgetWrapper>
  );
}

export default memo(StreakBox);

function StreakModel({ open, setOpen }) {
  const { userDispatch } = useUser();
  const navigate = useNavigate();

  return (
    <Dialog.Root
      size={"sm"}
      placement={"center"}
      lazyMount
      open={open}
      onOpenChange={(e) => {
        //
        setOpen(e.open);
        userDispatch({
          type: "INCREMENT_STREAK",
          payload: {
            currentStreak: 0,
          },
        });
        //
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={4}>
          <Dialog.Content>
            <Dialog.Body p={{ base: 4, md: 6 }}>
              <Stack alignItems={"center"} pt={{ base: 8, md: 11 }} gap={0}>
                <Image
                  src="https://emojicdn.elk.sh/🔥?style=facebook"
                  height={20}
                  width={20}
                  mb={{ base: 6, md: 8 }}
                ></Image>

                <Stack alignItems={"center"}>
                  <Heading size={{ base: "2xl", md: "3xl" }}>
                    Streak unlocked!
                  </Heading>
                  <Text
                    fontSize={"md"}
                    lineHeight={1.5}
                    textAlign={"center"}
                    color={"gray.400"}
                  >
                    Create an account to start a streak <br />
                    and keep your momentum going.
                  </Text>
                </Stack>
                <Button
                  mt={{ base: 8, md: 12 }}
                  colorPalette={import.meta.env.VITE_APP_COLOR}
                  width={"full"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Save it!
                </Button>
              </Stack>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
