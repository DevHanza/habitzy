import HabitsTrackerLogo from "./Logo";
import HoverWrapper from "@/components/ui/HoverWrapper";

import {
  Flex,
  Box,
  Container,
  Text,
  Stack,
  For,
  IconButton,
  useBreakpointValue,
  VStack,
  Avatar,
} from "@chakra-ui/react";

import { House, Crown, UserRound, Settings, Sun, Moon } from "lucide-react";
import { Link } from "react-router";
import { useColorMode } from "../ui/color-mode";

const menuItems = [
  {
    label: "Home",
    link: "/=",
    icon: <House />,
  },
  {
    label: "Leaderboard",
    link: "/leaderboard",
    icon: <Crown />,
  },
  // {
  //   label: "Account",
  //   link: "/account",
  //   icon: <UserRound />,
  // },
  {
    label: "Settings",
    link: "/settings",
    icon: <Settings />,
  },
];

function Header() {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <header className="sticky-header">
      <Box bg={"bg"} borderBlockWidth={1}>
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
      {!isDesktop ? <BottomNav /> : ""}
    </header>
  );
}

function DesktopMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack direction={"row"} gap={4} alignItems={"center"}>
      <Stack gap={2} direction={"row"}>
        <For each={menuItems}>
          {(item) => (
            <Link to={item.link} key={item.link}>
              <IconButton
                aria-label="Call support"
                rounded="full"
                variant={"subtle"}
                size={"sm"}
              >
                {item.icon}
              </IconButton>
            </Link>
          )}
        </For>
        <IconButton
          aria-label="Switch Theme"
          rounded="full"
          variant={"subtle"}
          onClick={toggleColorMode}
          size={"sm"}
        >
          {colorMode === "light" ? <Sun /> : <Moon />}
        </IconButton>
      </Stack>

      <Link to="/account">
        <Avatar.Root size={"sm"} colorPalette={"teal"}>
          <Avatar.Fallback name="Dev Hanza" />
        </Avatar.Root>
      </Link>
    </Stack>
  );
}

function MobileMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack direction={"row"} gap={4} alignItems={"center"}>
      <Stack gap={2} direction={"row"}>
        <IconButton
          aria-label="Switch Theme"
          rounded="full"
          variant={"solid"}
          onClick={toggleColorMode}
          size={"xs"}
        >
          {colorMode === "light" ? <Sun /> : <Moon />}
        </IconButton>
      </Stack>
    </Stack>
  );
}

function BottomNav() {
  return (
    <>
      <Box
        minHeight={"4rem"}
        width={"100%"}
        borderTopWidth={"1px"}
        bg={"bg"}
        position={"fixed"}
        bottom={0}
        left={0}
        zIndex={999}
      >
        <Flex p={2}>
          <For each={menuItems}>
            {(item) => (
              <HoverWrapper key={item.link} size={0} flex={1} py={3}>
                <Link to={item.link}>
                  <VStack gap={1}>
                    {item.icon}
                    <Text fontSize={12} color={"fg.subtle"}>
                      {item.label}
                    </Text>
                  </VStack>
                </Link>
              </HoverWrapper>
            )}
          </For>
        </Flex>
      </Box>
    </>
  );
}

export default Header;
