import { Flex } from "@chakra-ui/react/flex";
import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { Text } from "@chakra-ui/react/text";
import { Stack } from "@chakra-ui/react/stack";

import { Link } from "react-router";

import ProfileIcon from "./ProfileIcon";
import HabitsTrackerLogo from "./Logo";

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
            <HabitsTrackerLogo />
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
            <Text color={"gray.400"} _hover={{ color: "gray.50" }}>
              {item.label}
            </Text>
          </Link>
        );
      })}
      <ProfileIcon />
    </Stack>
  );
}

function MobileMenu() {}

export default Header;
