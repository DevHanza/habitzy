import ProfileBox from "./ProfileBox";
import HabitsTrackerLogo from "./Logo";
import HoverWrapper from "./ui/HoverWrapper";

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
} from "@chakra-ui/react";

import { Menu, House, Crown, Grip, Settings } from "lucide-react";
import { Link } from "react-router";
import { useRef } from "react";

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
  {
    label: "Settings",
    link: "#",
    icon: <Settings />,
  },
  {
    label: "Other",
    link: "##",
    icon: <Grip />,
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
      {!isDesktop ? <BottomNav /> : ""}
    </header>
  );
}

function DesktopMenu() {
  return (
    <Stack direction={"row"} gap={"10"} alignItems={"center"}>
      <Stack gap={"1rem"} direction={"row"}>
        <For each={menuItems}>
          {(item) => (
            <HoverWrapper key={item.link} px={"0.5rem"}>
              <Link to={item.link}>
                <Text color={"fg.muted"} _hover={{ color: "fg" }}>
                  {item.label}
                </Text>
              </Link>
            </HoverWrapper>
          )}
        </For>
      </Stack>
      <HoverWrapper>
        <ProfileBox />
      </HoverWrapper>
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
            <Menu />
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
