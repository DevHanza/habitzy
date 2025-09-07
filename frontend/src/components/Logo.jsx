import { Image } from "@chakra-ui/react/image";
import { Heading } from "@chakra-ui/react/heading";
import { Stack } from "@chakra-ui/react/stack";
import { Link } from "react-router";

function HabitsTrackerLogo() {
  return (
    <Link to="/">
      <Stack direction={"horizontal"} alignItems={"center"} gap={"0.5rem"}>
        <Image src="/habits-2.svg" boxSize="2rem" />
        <Heading size="xl">Habit Tracker</Heading>
      </Stack>
    </Link>
  );
}

export default HabitsTrackerLogo;
