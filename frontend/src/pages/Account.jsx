import { Flex, Container, Stack, Heading, Text } from "@chakra-ui/react";

function Account() {
  return (
    <Container maxW={"xl"}>
      <Flex direction={"column"}>
        {/* Profile Card - START*/}
        <Stack
          gap={2}
          background={"bg.emphasized"}
          border={"2px solid"}
          borderColor={"fg.subtle"}
          px={4}
          py={8}
          width={"100%"}
          borderRadius={12}
        >
          <Heading fontSize={"1.5rem"} lineHeight={1}>
            DevHanza
          </Heading>
          <Text lineHeight={1}>@devhanza</Text>
        </Stack>
        {/* Profile Card - END */}
      </Flex>
    </Container>
  );
}

export default Account;
