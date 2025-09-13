import { Box, Avatar, HStack, Text, VStack, Image } from "@chakra-ui/react";

function LeaderboardCard() {
  return (
    <Box
      borderRadius={6}
      px={3}
      py={2}
      _hover={{
        bg: "bg.emphasized",
      }}
      borderColor={"fg.subtle"}
      width={"100%"}
    >
      <HStack gap={4}>
        {/* Rank */}
        <Text fontWeight={700} color={"fg.muted"}>
          1
        </Text>
        {/* Rank */}
        <HStack justifyContent={"space-between"} flex={3}>
          {/* User */}
          <HStack gap={3}>
            <Avatar.Root>
              <Avatar.Fallback name="Jhon Doe" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
            <VStack gap={1} alignItems={"flex-start"}>
              <Text fontSize={"md"} fontWeight={500} lineHeight={1}>
                Hansana
              </Text>
              <Text
                fontSize={"xs"}
                fontWeight={300}
                lineHeight={1}
                color={"fg.muted"}
              >
                @devhanza
              </Text>
            </VStack>
          </HStack>
          {/* User */}

          {/* Streak */}
          <HStack gap={1.5}>
            <Text fontWeight={500}>100</Text>
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

export default LeaderboardCard;
