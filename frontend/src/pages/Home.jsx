import GreetingBox from "@/components/GreetingBox";
import ProgressBox from "@/components/ProgressBox";
import QuoteBox from "@/components/QuoteBox";
import { Container, Flex, Stack } from "@chakra-ui/react";

function Home() {
  return (
    <Container>
      <Flex gap={4} direction={{ base: "column", md: "row" }}>
        <Stack flex={1}>
          <GreetingBox />
          <ProgressBox />
        </Stack>

        <Stack flex={2}>
          <QuoteBox />
        </Stack>
        <Stack flex={1}>
          <QuoteBox />
        </Stack>
      </Flex>
    </Container>
  );
}

export default Home;
