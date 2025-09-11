import WidgetsWrapper from "./ui/WidgetsWrapper";
import { Stack, HStack, Progress, Heading } from "@chakra-ui/react";

function ProgressBox() {
  return (
    <WidgetsWrapper>
      <Stack>
        <Progress.Root defaultValue={40}>
          <Heading fontSize={"1.5rem"}>40%</Heading>
          <HStack gap="5">
            <Progress.Track flex="1">
              <Progress.Range />
            </Progress.Track>
          </HStack>
        </Progress.Root>
      </Stack>
    </WidgetsWrapper>
  );
}

export default ProgressBox;
