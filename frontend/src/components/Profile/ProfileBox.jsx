import { Avatar, Text, Stack, HStack } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

function ProfileBox({ extended = false }) {
  const user = {
    name: "Jhon Doe",
    email: "jhondoe@dot.com",
    avatar: "/",
  };

  return (
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
  );
}

export default ProfileBox;
