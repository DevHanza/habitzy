import { getToday } from "@/utils/getToday";
import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import WidgetsWrapper from "./ui/WidgetsWrapper";

function GreetingBox() {
  return (
    <WidgetsWrapper>
      <Stack>
        <Image
          src="https://emojicdn.elk.sh/👋?style=facebook"
          height={{ base: "3.5rem", md: "4rem" }}
          width={{ base: "3.5rem", md: "4rem" }}
          marginBottom={{ base: "1rem", md: "1.5rem" }}
        ></Image>
        <Heading
          size={{ base: "xl", md: "2xl" }}
          lineHeight={{ base: 1.25, md: 1.3 }}
        >
          Good Morning,
          <br />
          Hansana.
        </Heading>
        <Text
          textTransform={"uppercase"}
          fontSize={"0.875rem"}
          color={"fg.muted"}
        >
          {getToday()}
        </Text>
      </Stack>
    </WidgetsWrapper>
  );
}

export default GreetingBox;
