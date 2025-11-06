import { Flex, Image, Stack, Container } from "@chakra-ui/react";

function AuthPage({ children }) {
  return (
    <Flex>
      {/* Background Two Column Layout */}
      <Flex
        height={"100%"}
        maxHeight={"100vh"}
        p={2}
        gap={8}
        position={"absolute"}
        inset={0}
        zIndex={-1}
      >
        <Stack flex={1}>
          <Image
            src="/login-screen-1.jpg"
            h={"100%"}
            w={"100%"}
            fit={"cover"}
            borderRadius={"lg"}
          ></Image>
        </Stack>
        <Stack flex={1}></Stack>
      </Flex>
      {/* Background Two Column Layout */}
      <Container maxHeight={"100vh"}>
        <Flex height={"100vh"} alignItems={"center"} gap={8}>
          <Stack flex={1}></Stack>
          <Stack flex={1}>{children}</Stack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default AuthPage;
