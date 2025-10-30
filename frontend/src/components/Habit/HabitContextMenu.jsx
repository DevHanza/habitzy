import { Menu, Portal } from "@chakra-ui/react";

function HabitContextMenu({ children, setIsEditing, removeHabit, habitId }) {
  return (
    <Menu.Root>
      <Menu.ContextTrigger width="full">{children}</Menu.ContextTrigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="edit-habit" onClick={() => setIsEditing(true)}>
              Edit
            </Menu.Item>
            <Menu.Item
              value="delete-habit"
              color="fg.error"
              _hover={{ bg: "bg.error", color: "fg.error" }}
              onClick={() => {
                removeHabit(habitId);
              }}
            >
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default HabitContextMenu;
