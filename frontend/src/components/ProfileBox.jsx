import {
  Avatar,
  Text,
  Stack,
  HStack,
  Menu,
  Portal,
  Switch,
} from "@chakra-ui/react";
import {
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
  MoonStarIcon,
} from "lucide-react";
import { Link } from "react-router";

const profileBoxMenu = [
  { label: "Your Profile", link: "#", icon: UserRound },
  { label: "Settings", link: "#", icon: Settings },
];

function ProfileBox({ extended = false }) {
  const user = {
    name: "Jhon Doe",
    email: "jhondoe@dot.com",
    avatar: "/",
  };

  return (
    // Profile Box Menu - Start

    <Menu.Root positioning={{ placement: "top-start" }}>
      {/* Profile Box - Start */}
      <Menu.Trigger asChild cursor={"pointer"}>
        <HStack
          cursor={"pointer"}
          w="100%"
          justifyContent={extended ? "space-between" : "flex-start"}
        >
          <HStack gap={extended ? 4 : 2}>
            <Avatar.Root shape="rounded" size="md">
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={user.avatar} />
            </Avatar.Root>

            {extended && (
              <Stack gap={0}>
                <Text fontWeight="medium">{user.name}</Text>
                <Text color="fg.muted" textStyle="sm">
                  {user.email}
                </Text>
              </Stack>
            )}
          </HStack>

          <ChevronDown size={16} />
        </HStack>
      </Menu.Trigger>
      {/* Profile Box - End */}

      <Portal>
        <Menu.Positioner>
          <Menu.Content maxWidth={"300px"} width={"100%"} p={3}>
            {/* Profile  */}
            <HStack
              gap="4"
              px={2}
              py={2}
              cursor={"pointer"}
              borderRadius={4}
              _hover={{ bg: "bg.emphasized/60" }}
            >
              <Avatar.Root>
                <Avatar.Fallback name={"DevHanza"} />
                <Avatar.Image />
              </Avatar.Root>
              <Stack gap="0">
                <Text fontWeight="medium">Hansana</Text>
                <Text
                  color="fg.muted"
                  textStyle="sm"
                  width={"200px"}
                  whiteSpace={"nowrap"}
                  textOverflow={"ellipsis"}
                  overflow={"hidden"}
                >
                  devhanza@domain.com
                </Text>
              </Stack>
            </HStack>
            <hr style={{ margin: "0.5em 0" }} />
            {/* Profile  */}
            {profileBoxMenu.map((item) => {
              return (
                <Menu.Item value={item.label} py={2.5} px={2} gap={4}>
                  <Link to={item.link} style={{ outline: "transparent" }}>
                    <Stack direction={"row"}>
                      <item.icon
                        size={"1.125rem"}
                        style={{ color: "#a1a1aa" }}
                      />
                      <Text fontSize={"md"}>{item.label}</Text>
                    </Stack>
                  </Link>
                </Menu.Item>
              );
            })}

            <Stack
              direction={"row"}
              py={2.5}
              px={2}
              borderRadius={2}
              justifyContent={"space-between"}
              _hover={{ bg: "bg.emphasized/60" }}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <MoonStarIcon size={"1.125rem"} style={{ color: "#a1a1aa" }} />
                Switch to Dark
              </Stack>

              <Switch.Root size={"md"}>
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
                borderRadius={2}
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

    // Profile Box Menu - End
  );
}

export default ProfileBox;
