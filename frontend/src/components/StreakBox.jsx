import React from "react";
import WidgetWrapper from "./ui/WidgetWrapper";
import {
  Box,
  Code,
  HStack,
  Stack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";

function StreakBox() {
  return (
    <WidgetWrapper>
      <Stack direction={"row"}>
        {/*  */}
        <Stack flex={2}>
          <Code
            colorPalette={"teal"}
            variant="subtle"
            width={"fit-content"}
            fontFamily={"inherit"}
            fontWeight={400}
            fontSize={"sm"}
            py={1.5}
            px={2.5}
          >
            Daily Streak
          </Code>
          <HStack gap={1} alignItems={"flex-end"}>
            <Heading
              display={"inline-block"}
              size={{ base: "2xl", md: "4xl" }}
              fontWeight={700}
              lineHeight={1}
            >
              27
            </Heading>
            <Text color={"fg.muted"} fontSize={"lg"}>day streak</Text>
          </HStack>
          <Text fontSize={"md"}>You're on a streak! Don't loose it.</Text>
        </Stack>
        {/*  */}
        <Box flex={1} justifyItems={"end"} alignContent={"center"}>
          <Image
            src="https://emojicdn.elk.sh/🔥?style=facebook"
            height={"4rem"}
            // width={"100%"}
          />
        </Box>
        {/*  */}
      </Stack>
    </WidgetWrapper>
  );
}

export default StreakBox;
