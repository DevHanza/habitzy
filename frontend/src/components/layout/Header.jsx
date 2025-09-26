import ProfileBox from "@/components/Profile/ProfileBox";
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
  Drawer,
  useBreakpointValue,
  Portal,
  CloseButton,
  VStack,
  Menu,
  Switch,
} from "@chakra-ui/react";

import {
  Menu as MenuIcon,
  House,
  Crown,
  UserRound,
  Settings,
  LogOut,
  Sun,
} from "lucide-react";
import { Link } from "react-router";
import { useRef } from "react";
import { useColorMode } from "../ui/color-mode";

const menuItems = [
  {
    label: "Home",
    link: "/",
    icon: <House />,
  },
  {
    label: "Leaderboard",
    link: "/leaderboard",
    icon: <Crown />,
  },
];

const profileBoxMenu = [
  { label: "Your Profile", link: "#", icon: UserRound },
  { label: "Settings", link: "#", icon: Settings },
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
    <Stack direction={"row"} gap={"10"} alignItems={"center"}>
      <Stack gap={"1rem"} direction={"row"}>
        <For each={menuItems}>
          {(item) => (
            <HoverWrapper key={item.link} px={"0.5rem"}>
              <Link to={item.link}>
                <Text
                  fontSize={"1rem"}
                  color={"fg.muted"}
                  _hover={{ color: "fg" }}
                >
                  {item.label}
                </Text>
              </Link>
            </HoverWrapper>
          )}
        </For>
      </Stack>

      <Menu.Root positioning={{ placement: "top-start" }}>
        {/* Profile Box - Start */}
        <Menu.Trigger>
          <HoverWrapper>
            <ProfileBox />
          </HoverWrapper>
        </Menu.Trigger>
        {/* Profile Box - End */}

        <Portal>
          <Menu.Positioner maxWidth={"300px"} width={"100%"}>
            <Menu.Content p={3}>
              <Menu.Item
                _hover={{ bg: "bg.emphasized/60" }}
                borderRadius={4}
                py={2.5}
                px={2}
              >
                <ProfileBox extended={true} p={3} />
              </Menu.Item>
              <hr style={{ margin: "0.5em 0" }} />

              {profileBoxMenu.map((item) => {
                return (
                  <Link to={item.link} style={{ outline: "transparent" }}>
                    <Menu.Item
                      key={item.label}
                      value={item.label}
                      py={2.5}
                      px={2}
                      gap={4}
                      borderRadius={4}
                    >
                      <Stack direction={"row"}>
                        <item.icon
                          size={"1.125rem"}
                          style={{ color: "#a1a1aa" }}
                        />
                        <Text fontSize={"md"}>{item.label}</Text>
                      </Stack>
                    </Menu.Item>
                  </Link>
                );
              })}

              <Stack
                direction={"row"}
                py={2.5}
                px={2}
                cursor={"pointer"}
                onClick={toggleColorMode}
                borderRadius={4}
                justifyContent={"space-between"}
                userSelect={"none"}
                _hover={{ bg: "bg.emphasized/60" }}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <Sun size={"1.125rem"} style={{ color: "#a1a1aa" }} />
                  Light Mode
                </Stack>

                <Switch.Root
                  size={"md"}
                  checked={colorMode === "light"}
                  colorPalette={"teal"}
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                  <Switch.Label />
                </Switch.Root>
              </Stack>

              <hr style={{ margin: "0.5em 0" }} />

              <Link to={"#"} style={{ outline: "transparent" }}>
                <Stack
                  direction={"row"}
                  py={2.5}
                  px={2}
                  borderRadius={4}
                  alignItems={"center"}
                  _hover={{ bg: "bg.emphasized/60" }}
                >
                  <LogOut size={"1.125rem"} style={{ color: "#a1a1aa" }} />
                  <Text fontSize={"md"}>Log Out</Text>
                </Stack>
              </Link>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Stack>
  );
}

function MobileMenu() {
  const closeBtnRef = useRef(null);

  return (
    <>
      <Drawer.Root key={"xs"} size={"xs"}>
        <Drawer.Trigger asChild>
          <IconButton
            aria-label="Open Mobile Menu"
            variant={"outline"}
            size={"sm"}
          >
            <MenuIcon />
          </IconButton>
        </Drawer.Trigger>

        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title></Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <VStack alignItems={"stretch"}>
                  <For each={menuItems}>
                    {(item) => (
                      <Link
                        to={item.link}
                        key={item.link}
                        onClick={() => {
                          closeBtnRef.current.click();
                        }}
                      >
                        <Box
                          p={"1em"}
                          borderBottomWidth={"1px"}
                          _hover={{
                            bg: "bg.muted",
                            borderRadius: "sm",
                          }}
                        >
                          {item.label}
                        </Box>
                      </Link>
                    )}
                  </For>
                </VStack>
              </Drawer.Body>
              <Drawer.Footer>
                <Box width={"100%"}>
                  <HoverWrapper size="0.5rem">
                    <ProfileBox extended={true} />
                  </HoverWrapper>
                </Box>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" variant={"outline"} ref={closeBtnRef} />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
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
