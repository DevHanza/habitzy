import { IconButton, useBreakpointValue } from "@chakra-ui/react";

import { Flex } from "@chakra-ui/react/flex";
import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { Text } from "@chakra-ui/react/text";
import { Stack } from "@chakra-ui/react/stack";

import { Link } from "react-router";

import ProfileIcon from "./ProfileIcon";
import HabitsTrackerLogo from "./Logo";
import { Menu } from "lucide-react";

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
  const isDesktop = useBreakpointValue({ base: false, md: true });

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
            {isDesktop ? <DesktopMenu /> : <MobileMenu />}
          </Flex>
        </Container>
      </Box>
    </header>
  );
}

function DesktopMenu() {
  return (
    <Stack direction={"row"} gap={"10"} alignItems={"center"}>
      <Stack gap={"2rem"} direction={"row"}>
        {menuItems.map((item) => {
          return (
            <Link key={item.link} to={item.link}>
              <Text color={"gray.400"} _hover={{ color: "gray.50" }}>
                {item.label}
              </Text>
            </Link>
          );
        })}
      </Stack>
      <ProfileIcon />
    </Stack>
  );
}

function MobileMenu() {
  return (
    <IconButton aria-label="Open Mobile Menu" variant={"outline"} size={"sm"}>
      <Menu />
    </IconButton>
  );
}

export default Header;
