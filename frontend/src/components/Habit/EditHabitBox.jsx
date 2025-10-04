import { useRef, useState, useEffect } from "react";
import { Box, Input, Stack, IconButton } from "@chakra-ui/react";
import { Check, X } from "lucide-react";
import EmojiPickerButton from "@/components/EmojiPickerButton/EmojiPickerButton";
import useHabits from "@/hooks/useHabits";

function EditHabitBox({ setIsEditing, id, label, icon }) {
  const inputRef = useRef();
  const { editHabit, removeHabit } = useHabits();
  const [selectedEmoji, setSelectedEmoji] = useState(icon);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleEdit = () => {
    if (inputRef.current.value.trim().length === 0) {
      removeHabit(id);
    } else if (inputRef.current) {
      // Edit Habit
      editHabit(id, selectedEmoji, inputRef.current.value);
      inputRef.current.value = "";
      setIsEditing((prev) => !prev);
    }
  };

  const handleCancel = () => {
    setIsEditing((prev) => !prev);
    inputRef.current.value = "";
  };

  return (
    <Box
      borderRadius={6}
      bg={"bg"}
      width={"100%"}
      position={"relative"}
      borderWidth={2}
      borderColor={"teal"}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
      >
        <Stack direction={"row"} alignItems={"center"} px={3}>
          {/* Add Emoji Button */}
          <EmojiPickerButton
            selectedEmoji={selectedEmoji}
            setSelectedEmoji={setSelectedEmoji}
          />
          <Input
            required
            defaultValue={label}
            ref={inputRef}
            py={4}
            px={0}
            placeholder="Enter habit name"
            size={"lg"}
            fontSize={{ base: "1.125rem", md: "1.25rem" }}
            fontWeight={500}
            height={"auto"}
            border={0}
            outline={"transparent"}
          />
          {/* Done Button */}
          <IconButton
            type="submit"
            size="sm"
            colorPalette={"teal"}
            aria-label="Add habit"
          >
            <Check />
          </IconButton>
          {/* Cancel Button */}
          <IconButton
            size="sm"
            variant={"surface"}
            colorPalette={"teal"}
            aria-label="Cancel Adding a habit"
            onClick={handleCancel}
          >
            <X />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
}

export default EditHabitBox;
