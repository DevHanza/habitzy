import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";

function UserLeaderboardCard({ rank = 1, streak = 100 }) {
  return (
    <Box
      borderRadius={6}
      px={3}
      py={2}
      borderColor={"fg.subtle"}
      width={"100%"}
    >
      <HStack gap={4}>
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
            100%
          </Text>
        </Stack>

        <HStack justifyContent={"space-between"} flex={3}>
          {/* User */}
          <HStack gap={3}>
            <VStack gap={1} alignItems={"flex-start"}>
              <Text fontSize={"md"} fontWeight={500} lineHeight={1}>
                You
              </Text>
            </VStack>
          </HStack>
          {/* User */}

          {/* Streak */}
          <HStack gap={1.5}>
            <Text fontWeight={500}>{streak}</Text>
            <Image
              src="https://emojicdn.elk.sh/🔥?style=facebook"
              height={{ base: "1rem", md: "1.15rem" }}
              width={{ base: "1rem", md: "1.15rem" }}
            ></Image>
          </HStack>
          {/* Streak */}
        </HStack>
      </HStack>
    </Box>
  );
}

export default UserLeaderboardCard;
