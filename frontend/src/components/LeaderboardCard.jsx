import { Box, Avatar, HStack, Text, VStack, Image } from "@chakra-ui/react";
import pickPalette from "@/utils/pickPallette";

function LeaderboardCard({
  rank = "#1",
  name = "Hansana",
  username = "@devhanza",
  streak = 100,
}) {
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
        <Text fontWeight={600} color={"fg.muted"}>
          {rank}
        </Text>
        {/* Rank */}
        <HStack justifyContent={"space-between"} flex={3}>
          {/* User */}
          <HStack gap={3}>
            <Avatar.Root colorPalette={pickPalette(name)}>
              <Avatar.Fallback name={name} />
              {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
            </Avatar.Root>
            <VStack gap={1} alignItems={"flex-start"}>
              <Text fontSize={"md"} fontWeight={500} lineHeight={1}>
                {name}
              </Text>
              <Text
                fontSize={"xs"}
                fontWeight={300}
                lineHeight={1}
                color={"fg.muted"}
              >
                {username}
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

export default LeaderboardCard;
