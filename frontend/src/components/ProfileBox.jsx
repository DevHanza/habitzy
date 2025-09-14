import {
  Avatar,
  Text,
  Stack,
  HStack,
  Box,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { ChevronDown, UserRound, Settings } from "lucide-react";

function ProfileBox({ extended = false }) {
  const user = {
    name: "Jhon Doe",
    email: "jhondoe@dot.com",
    avatar: "/",
  };

  return (
    // Profile Box Menu - Start

    <Menu.Root positioning={{ placement: "bottom" }}>
      {/* Profile Box - Start */}
      <Menu.Trigger asChild cursor={"pointer"}>
        <HStack
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
          <Menu.Content>
            <Menu.Item value="profile">
              <UserRound size={"1.125rem"} />
              <Text fontSize={"md"}>My Profile</Text>
            </Menu.Item>
            <Menu.Item value="settings">
              <Settings size={"1.125rem"} />
              <Text fontSize={"md"}>Settings</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    // Profile Box Menu - End
  );
}

export default ProfileBox;
