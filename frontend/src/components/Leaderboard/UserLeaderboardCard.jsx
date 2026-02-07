import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

function UserLeaderboardCard({
  isLoading,
  rank = "0%",
  streak = 0,
  name = "You",
}) {
  return (
    <Box
      borderRadius={6}
      px={3}
      py={2}
      borderColor={"fg.subtle"}
      width={"100%"}
    >
      <HStack gap={4}>
        <Skeleton loading={isLoading}>
          <Stack gap={1} width={"3rem"}>
            <Text
              fontWeight={500}
              fontSize={"0.75rem"}
              color={"fg.muted"}
              lineHeight={1}
            >
              TOP
            </Text>
            <Text fontWeight={600} color={"fg.emphasized"} lineHeight={1}>
              {isLoading ? "0" : rank}
            </Text>
          </Stack>
        </Skeleton>

        <HStack justifyContent={"space-between"} flex={3}>
          {/* User */}
          <HStack gap={3}>
            <VStack gap={1} alignItems={"flex-start"}>
              <Skeleton loading={isLoading}>
                <Text fontSize={"md"} fontWeight={500} lineHeight={1}>
                  {name}
                </Text>
              </Skeleton>
            </VStack>
          </HStack>
          {/* User */}

          {/* Streak */}
          <Skeleton loading={isLoading}>
            <HStack gap={1.5}>
              <Text fontWeight={500}>{streak}</Text>
              <Image
                src="https://emojicdn.elk.sh/🔥?style=facebook"
                height={{ base: "1rem", md: "1.15rem" }}
                width={{ base: "1rem", md: "1.15rem" }}
              ></Image>
            </HStack>
          </Skeleton>
          {/* Streak */}
        </HStack>
      </HStack>
    </Box>
  );
}

export default UserLeaderboardCard;
