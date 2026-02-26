import { Box, Avatar, HStack, Text, VStack, Image } from "@chakra-ui/react";
import pickPalette from "@/utils/pickPallette";

function LeaderboardCard({
  rank = 1,
  name = "Hansana",
  username = "devhanza",
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
      <HStack gap={1}>
        {/* Rank */}
        <Text fontWeight={600} color={"fg.muted"} width={"2rem"}>
          #{rank}
        </Text>
        {/* Rank */}
        <HStack justifyContent={"space-between"} width={"100%"} flex={1}>
          {/* User */}
          <HStack
            gap={3}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            minWidth={0}
            // flex={1}
          >
            <Avatar.Root colorPalette={pickPalette(name)}>
              <Avatar.Fallback name={name} />
              {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
            </Avatar.Root>
            <VStack gap={1} alignItems={"flex-start"} minWidth={0} maxWidth={"fit-conten"}>
              <Text
                fontSize={"md"}
                fontWeight={500}
                lineHeight={1}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                width={"100%"}
              >
                {name}
              </Text>
              <Text
                fontSize={"xs"}
                fontWeight={300}
                lineHeight={1}
                color={"fg.muted"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
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
