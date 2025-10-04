import { Box, Stack, Checkbox, Image } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import HabitControlMenu from "@/components/Habit/HabitControlMenu";
import EditHabitBox from "@/components/Habit/EditHabitBox";

const HabitCard = memo(function HabitCard({
  id,
  index,
  label = "Habit Name",
  icon = "✨",
  isCompleted = false,
  toggleHabit,
  moveItems,
}) {
  const ref = useRef();
  const [isDragging, setIsDragging] = useState();
  const [isDraggingOver, setIsDraggingOver] = useState();
  const [isEditing, setIsEditing] = useState(false);

  // draggable
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return draggable({
      element,
      onDragStart({ source }) {
        source.data = { index, id };
        setIsDragging(true);
      },
      onDrop() {
        setIsDragging(false);
      },
    });
  }, [index, id]);

  // dropTargetForElements
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      onDragEnter() {
        setIsDraggingOver(true);
      },
      onDragLeave() {
        setIsDraggingOver(false);
      },

      onDrop({ source }) {
        setIsDraggingOver(false);
        setIsDragging(false);

        const fromIndex = source.data?.index;
        const toIndex = index;
        if (fromIndex != null && toIndex != null && fromIndex !== toIndex) {
          moveItems(fromIndex, toIndex);
        }
      },
      canDrop() {
        return true;
      },
    });
  }, [index, moveItems]);

  return (
    <>
      {isEditing ? (
        <EditHabitBox
          setIsEditing={setIsEditing}
          id={id}
          label={label}
          icon={icon}
        />
      ) : (
        <HabitControlMenu id={id} setIsEditing={setIsEditing}>
          <Box
            borderRadius={6}
            px={3}
            py={4}
            border={"0.5px solid"}
            borderColor={"border"}
            bg={"bg.subtle"}
            width={"100%"}
            position={"relative"}
            _hover={{
              bg: "bg.emphasized",
              cursor: "pointer",
            }}
            ref={ref}
            opacity={isDragging ? 0.5 : 1}
            outline={isDraggingOver ? "2px dashed" : 0}
            outlineColor={"teal.500"}
          >
            <span
              style={{ position: "absolute", inset: 0, zIndex: 5 }}
              onClick={() => {
                toggleHabit(id);
              }}
            ></span>

            <Stack
              flexDirection={"row"}
              align="flex-start"
              flex="1"
              alignItems={"center"}
            >
              <Image
                src={`https://emojicdn.elk.sh/${icon}?style=facebook`}
                opacity={isCompleted ? 0.5 : 1}
                height={{ base: "1rem", md: "1.5rem" }}
                width={{ base: "1rem", md: "1.5rem" }}
              />
              <Checkbox.Root
                variant={"solid"}
                colorPalette={"teal"}
                checked={isCompleted}
                onCheckedChange={() => {
                  toggleHabit(id);
                }}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <Checkbox.Label
                  textDecoration={isCompleted ? "line-through" : ""}
                  fontSize={{ base: "1.125rem", md: "1.25rem" }}
                  color={isCompleted ? "fg.subtle" : ""}
                >
                  {label}
                </Checkbox.Label>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            </Stack>
          </Box>
        </HabitControlMenu>
      )}
    </>
  );
});

export default HabitCard;
