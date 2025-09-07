import { Avatar, IconButton } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

function ProfileIcon() {
  return (
    <IconButton variant={"ghost"}>
      <Avatar.Root shape="rounded" size="md">
        <Avatar.Fallback name="Dev Hanza" />
        <Avatar.Image src="/" />
      </Avatar.Root>

      <ChevronDown size={16} />
    </IconButton>
  );
}

export default ProfileIcon;
