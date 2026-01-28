import HabitsTrackerLogo from "@/components/layout/Logo";
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
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react";

import {
  House,
  Crown,
  UserRound,
  Settings,
  Sun,
  Moon,
  User,
  LogOut,
} from "lucide-react";
import { Link } from "react-router";
import { useColorMode } from "@/components/ui/color-mode";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

const desktopMenuItems = [
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
  {
    label: "Settings",
    link: "/settings",
    icon: <Settings />,
  },
];

const bottomNavItems = [
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
  {
    label: "Account",
    link: "/account",
    icon: <UserRound />,
  },
  {
    label: "Settings",
    link: "/settings",
    icon: <Settings />,
  },
];

const avatarMenuItems = [
  { label: "Account", link: "/account", icon: User },
  { label: "Settings", link: "/settings", icon: Settings },
];

function Header() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { isLoggedIn } = useAuth();
  const { user } = useUser();

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
            {isDesktop ? (
              <DesktopMenu user={user} isLoggedIn={isLoggedIn} />
            ) : (
              <MobileMenu user={user} isLoggedIn={isLoggedIn} />
            )}
          </Flex>
        </Container>
      </Box>
      {!isDesktop ? <BottomNav /> : ""}
    </header>
  );
}

function DesktopMenu({ isLoggedIn, user }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack direction={"row"} gap={4} alignItems={"center"}>
      <Stack gap={2} direction={"row"}>
        <For each={desktopMenuItems}>
          {(item) => (
            <Link to={item.link} key={item.link}>
              <IconButton
                aria-label={item.label}
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

      {isLoggedIn && (
        <Menu.Root positioning={{ placement: "bottom" }}>
          <Menu.Trigger rounded="full" focusRing="outside" cursor={"pointer"}>
            <Avatar.Root size={"sm"} colorPalette={"teal"}>
              <Avatar.Fallback name={user?.name} />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {avatarMenuItems.map((item) => (
                  <Menu.Item
                    key={item.label}
                    value={item.label}
                    as={Link}
                    to={item.link}
                    cursor={"pointer"}
                  >
                    <Box flex="1">{item.label}</Box>
                    <item.icon size={16} />
                  </Menu.Item>
                ))}
                <Menu.Item
                  value={"logout"}
                  as={Link}
                  to={"/logout"}
                  cursor={"pointer"}
                >
                  <Box flex="1">Log out</Box>
                  <LogOut size={16} />
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}

      {!isLoggedIn && (
        <Button as={Link} to={"/login"} size={"xs"} colorPalette={"teal"}>
          Sign in
        </Button>
      )}
    </Stack>
  );
}

function MobileMenu({ user, isLoggedIn }) {
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack direction={"row"} gap={4} alignItems={"center"}>
      <Stack gap={2} direction={"row"}>
        {/* <IconButton
          aria-label="Switch Theme"
          rounded="full"
          variant={"solid"}
          onClick={toggleColorMode}
          size={"xs"}
        >
          {colorMode === "light" ? <Sun /> : <Moon />}
        </IconButton> */}
        {isLoggedIn && (
          <Menu.Root positioning={{ placement: "bottom" }}>
            <Menu.Trigger rounded="full" focusRing="outside" cursor={"pointer"}>
              <Avatar.Root size={"sm"} colorPalette={"teal"}>
                <Avatar.Fallback name={user?.name} />
              </Avatar.Root>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {avatarMenuItems.map((item) => (
                    <Menu.Item
                      key={item.label}
                      value={item.label}
                      as={Link}
                      to={item.link}
                      cursor={"pointer"}
                    >
                      <Box flex="1">{item.label}</Box>
                      <item.icon size={16} />
                    </Menu.Item>
                  ))}
                  <Menu.Item
                    value={"logout"}
                    as={Link}
                    to={"/logout"}
                    cursor={"pointer"}
                  >
                    <Box flex="1">Log out</Box>
                    <LogOut size={16} />
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )}

        {!isLoggedIn && (
          <Button as={Link} to={"/login"} size={"xs"} colorPalette={"teal"}>
            Sign in
          </Button>
        )}
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
          <For each={bottomNavItems}>
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
