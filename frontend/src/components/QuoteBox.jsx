import { Heading, Stack, Text } from "@chakra-ui/react";
import WidgetsWrapper from "./ui/WidgetsWrapper";

function QuoteBox() {
  return (
    <WidgetsWrapper>
      <Stack>
        <Text
          fontSize={"0.875rem"}
          color={"fg.muted"}
          textTransform={"uppercase"}
          fontWeight={500}
        >
          Quote of the day
        </Text>
        <Heading
          fontWeight={500}
          size={{ base: "md", md: "lg" }}
          lineHeight={{ base: 1.25, md: 1.3 }}
          marginBlock={{ base: "0.75rem", md: "1rem" }}
        >
          If you don't sacrifice for your goals, your goals become the
          sacrifice.
        </Heading>
        <Text fontSize={"0.875rem"} color={"fg.muted"}>
          — Jack Harobour
        </Text>
      </Stack>
    </WidgetsWrapper>
  );
}

export default QuoteBox;
