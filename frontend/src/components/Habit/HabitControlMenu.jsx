import { Menu, Portal } from "@chakra-ui/react";
import { CheckCheck, SquarePen, Trash } from "lucide-react";

function HabitControlMenu({ children, setIsEditing }) {
  return (
    <Menu.Root>
      <Menu.ContextTrigger width="full">{children}</Menu.ContextTrigger>
      <Portal>
        <Menu.Positioner width={150}>
          <Menu.Content>
            <Menu.Item
              cursor={"pointer"}
              value="edit"
              onClick={() => setIsEditing(true)}
            >
              <SquarePen size={18} />
              Edit
            </Menu.Item>

            <Menu.Item cursor={"pointer"} value="select">
              <CheckCheck size={18} />
              Multi-Select
            </Menu.Item>

            <Menu.Item
              value="delete"
              color="fg.error"
              cursor={"pointer"}
              _hover={{ bg: "bg.error", color: "fg.error" }}
            >
              <Trash size={18} />
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default HabitControlMenu;
