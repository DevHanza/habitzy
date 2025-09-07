import { HStack, Avatar, Box } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

function ProfileIcon() {
  return (
    <HStack
      gap={1}
      p={1}
      borderRadius={"md"}
      cursor={"pointer"}
      _hover={{ bg: "gray.900" }}
    >
      <Avatar.Root shape="rounded" size="lg">
        <Avatar.Fallback name="Dev Hanza" />
        <Avatar.Image src="/" />
      </Avatar.Root>

      <ChevronDown size={16} />
    </HStack>
  );
}

export default ProfileIcon;
