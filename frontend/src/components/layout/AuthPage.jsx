import {
  Flex,
  Box,
  Image,
  Stack,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

function AuthPage({
  children,
  heading = "Create an Account",
  headingText = (
    <Text color={"fg.muted"} textAlign={{ base: "center", lg: "left" }}>
      Already have an account?{" "}
      <Link to="/login" style={{ textDecoration: "underline", color: "white" }}>
        Log in
      </Link>
    </Text>
  ),
  isNavVisible = true,
}) {
  const navigate = useNavigate();

  return (
    <Container height={"100vh"} maxW={{ base: "lg", lg: "5xl" }}>
      <Flex justifyItems={"center"} alignItems={"Center"} height={"100%"}>
        <Stack
          width={"full"}
          height={{ base: "auto", lg: "80vh" }}
          maxHeight={"600px"}
          direction={{ base: "column", lg: "row" }}
          borderRadius={"xl"}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"border.emphasized"}
          gap={0}
        >
          <Stack
            flex={1}
            bg={"bg.emphasized"}
            display={{ base: "none", lg: "flex" }}
          >
            <Image
              src="/login-screen-1.jpg"
              height={"100%"}
              w={"100%"}
              fit={"cover"}
            ></Image>
          </Stack>
          <Stack flex={1.25}>
            <Box
              px={{ base: 6, lg: 16 }}
              py={{ base: 12, lg: 20 }}
              display={"flex"}
              height={"100%"}
            >
              <Stack width={"100%"} gap={16}>
                {/* <Stack width={"fit-content"} p={2}>
                  {isNavVisible && (
                    <Link to={() => navigate(-1)}>
                      <ArrowLeft size={20} />
                    </Link>
                  )}
                </Stack> */}
                <Stack gap={8}>
                  <Stack gap={1} alignItems={{ base: "center", lg: "start" }}>
                    <Image
                      src="/habits-2.svg"
                      boxSize="3rem"
                      textAlign={"center"}
                      mb={4}
                      display={{ base: "block", lg: "none" }}
                    />
                    <Heading
                      size={{ base: "2xl", lg: "4xl" }}
                      textAlign={{ base: "center", lg: "left" }}
                    >
                      {heading}
                    </Heading>
                    {headingText}
                  </Stack>
                  {children}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </Container>
  );
}

export default AuthPage;
