import { Menu, Portal } from "@chakra-ui/react";
import { CheckCheck, SquarePen, Trash } from "lucide-react";

const menuItems = [
  { label: "Multi-Select ", icon: CheckCheck, value: "select" },
  { label: "Edit ", icon: SquarePen, value: "edit" },
  //   { label: "Delete Habit", icon: <Trash />, value: "delete" },
];

function HabitControlMenu({ children }) {
  return (
    <Menu.Root>
      <Menu.ContextTrigger width="full">{children}</Menu.ContextTrigger>
      <Portal>
        <Menu.Positioner width={150}>
          <Menu.Content>
            {menuItems.map(({ label, icon: Icon, value }) => {
              return (
                <Menu.Item cursor={"pointer"} value={value}>
                  <Icon size={18} />
                  {label}
                </Menu.Item>
              );
            })}
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
