import { Container, Stack, Box, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <footer>
      <Box py={"0.5rem"} mb={{ base: "var(--bottom-nav-height)", md: 0 }}>
        <Container>
          <Stack>
            <Text textAlign={"center"} fontSize={"0.75rem"} color={"fg.muted"}>
              Thanks for using {import.meta.env.VITE_APP_NAME}. ©{" "}
              <a href="https://devhanza.is-a.dev">DevHanza</a>
            </Text>
          </Stack>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
