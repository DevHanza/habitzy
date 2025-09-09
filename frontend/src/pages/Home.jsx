import { Container, Flex, Stack } from "@chakra-ui/react";

function Home() {
  return (
    <Container>
      <Flex gap={4}>
        <Stack flexGrow={1}></Stack>

        <Stack flexGrow={4}></Stack>
        <Stack flexGrow={1}></Stack>
      </Flex>
    </Container>
  );
}

export default Home;
