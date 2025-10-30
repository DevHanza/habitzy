import { Flex, Container, Stack, Heading, Text } from "@chakra-ui/react";

function Leaderboard() {
  return (
    <Container maxW={"xl"}>
      <Flex direction={"column"} gap={8}>
        <Heading fontSize={"3xl"}>Settings</Heading>
        {/* About - Start */}
        <Stack gap={4}>
          <Heading>Profile</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit,
            numquam! Quas tempora est aliquid dolorem sit provident nam ducimus
            quis autem.
          </Text>
        </Stack>
        {/* About - ENd */}
      </Flex>
    </Container>
  );
}

export default Leaderboard;
