import { Flex } from "@chakra-ui/react/flex";
import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { Stack } from "@chakra-ui/react/stack";

import { Link } from "react-router";

import ProfileIcon from "./ProfileIcon";

const menuItems = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Leaderboard",
    link: "/leaderboard",
  },
  {
    label: "Other",
    link: "#",
  },
];

function Header() {
  return (
    <header>
      <Box borderBlockWidth={1}>
        <Container>
          <Flex
            justifyContent={"space-between"}
            minHeight={"4rem"}
            alignItems={"center"}
          >
            <Heading size="xl">Habit Tracker</Heading>
            <DesktopMenu />
          </Flex>
        </Container>
      </Box>
    </header>
  );
}

function DesktopMenu() {
  return (
    <Stack direction={"row"} gap={"10"} alignItems={"center"}>
      {menuItems.map((item) => {
        return (
          <Link key={item.link} to={item.link}>
            <Text>{item.label}</Text>
          </Link>
        );
      })}
      <ProfileIcon />
    </Stack>
  );
}

function MobileMenu() {}

export default Header;
