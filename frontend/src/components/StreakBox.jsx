import React from "react";
import WidgetWrapper from "./ui/WidgetWrapper";
import { HStack, VStack, Stack, Image, Heading, Text } from "@chakra-ui/react";

function StreakBox() {
  return (
    <WidgetWrapper py={6}>
      <Stack>
        {/*  */}

        <HStack gap={1} alignItems={"center"} justifyContent={"center"}>
          <Heading
            display={"inline-block"}
            size={{ base: "3xl", md: "5xl" }}
            fontWeight={700}
            lineHeight={1}
            letterSpacing={1}
          >
            27
          </Heading>
          <Image
            src="https://emojicdn.elk.sh/🔥?style=facebook"
            height={{ base: "1.75rem", md: "2.75rem" }}
          />
        </HStack>

        <VStack gap={0}>
          <Heading size={{ base: "lg", md: "xl" }}>You're on a streak!</Heading>
          <Text color={"fg.muted"}>Consistency is power.</Text>
        </VStack>
      </Stack>
    </WidgetWrapper>
  );
}

export default StreakBox;
