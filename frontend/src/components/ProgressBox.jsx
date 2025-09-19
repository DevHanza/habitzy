import WidgetsWrapper from "./ui/WidgetWrapper";
import { Stack, HStack, Progress, Heading, Text } from "@chakra-ui/react";

function ProgressBox() {
  return (
    <WidgetsWrapper>
      <Stack>
        <Stack
          mb={"1rem"}
          direction={"row"}
          alignItems={"end"}
          gap={0}
          flexWrap={"wrap"}
        >
          <Heading
            display={"inline-block"}
            size={{ base: "2xl", md: "4xl" }}
            fontWeight={700}
          >
            40%&nbsp;
          </Heading>
          <Heading
            color={"fg.muted"}
            display={"inline-block"}
            size={{ base: "md", md: "lg" }}
            fontWeight={500}
          >
            out of 100%.
          </Heading>
        </Stack>

        <Progress.Root defaultValue={40} colorPalette={"teal"}>
          <HStack>
            <Progress.Track flex="1">
              <Progress.Range />
            </Progress.Track>
          </HStack>
        </Progress.Root>
        <Text marginTop={".5em"} color={"fg.muted"}>
          Complete your daily goals to win both of your day and streak.
        </Text>
      </Stack>
    </WidgetsWrapper>
  );
}

export default ProgressBox;
