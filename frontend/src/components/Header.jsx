import ProfileBox from "./ProfileBox";
import HabitsTrackerLogo from "./Logo";

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

import { Menu } from "lucide-react";
import { Link } from "react-router";
import { useRef } from "react";

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
        <For each={menuItems}>
          {(item) => (
            <Link key={item.link} to={item.link}>
              <Text color={"gray.400"} _hover={{ color: "gray.50" }}>
                {item.label}
              </Text>
            </Link>
          )}
        </For>
      </Stack>
      <ProfileBox />
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
                            bg: "gray.900",
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
                <ProfileBox extended={true} />
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

export default Header;
