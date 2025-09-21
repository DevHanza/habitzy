import { Box, Input, Stack, IconButton } from "@chakra-ui/react";
import { Check, X } from "lucide-react";
import EmojiPickerButton from "./EmojiPickerButton/EmojiPickerButton";
import useHabits from "@/hooks/useHabits";
import { useRef, useState, useEffect } from "react";

function AddHabitBox() {
  const inputRef = useRef();
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const { addHabit, setIsAddingHabits } = useHabits();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddHabit = () => {
    if (inputRef.current.value.trim().length === 0) return;

    if (inputRef.current) {
      addHabit({
        icon: selectedEmoji || "✨",
        title: inputRef.current.value,
      });
      inputRef.current.value = "";
      setIsAddingHabits((prev) => !prev);
    }
  };

  const handleCancelAddHabit = () => {
    setIsAddingHabits((prev) => !prev);
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
      // _hover={{
      //   borderColor: "teal.500",
      // }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddHabit();
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
            // onClick={handleAddHabit}
          >
            <Check />
          </IconButton>
          {/* Cancel Button */}
          <IconButton
            size="sm"
            variant={"surface"}
            colorPalette={"teal"}
            aria-label="Cancel Adding a habit"
            onClick={handleCancelAddHabit}
          >
            <X />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
}

export default AddHabitBox;
