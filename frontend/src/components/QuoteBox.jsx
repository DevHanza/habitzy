import { Heading, Stack, Text } from "@chakra-ui/react";
import WidgetsWrapper from "./ui/WidgetWrapper";

function QuoteBox() {
  return (
    <WidgetsWrapper py={6}>
      <Stack gap={4}>
        <Heading
          fontWeight={500}
          size={{ base: "md", md: "lg" }}
          lineHeight={{ base: 1.25, md: 1.3 }}
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
