import {
  Container,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <Container maxW={"xl"}>
      <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Stack alignItems={"center"}>
          <Image
            src="https://emojicdn.elk.sh/⁉️?style=facebook"
            height={{ base: "3rem", md: "3.5rem" }}
            width={"fit-content"}
            marginBottom={5}
          />
          <Heading size={{ base: "2xl", md: "3xl" }}>
            Something Went Wrong!
          </Heading>
          <Text textAlign={"center"} color={"fg.subtle"}>
            Oops! We couldn’t find that page. You can go back to the homepage.
          </Text>
          <a href={"/"}>
            <Button marginTop={5} colorPalette={"teal"}>
              Go to Homepage
            </Button>
          </a>
        </Stack>
      </Flex>
    </Container>
  );
}

export default ErrorPage;
