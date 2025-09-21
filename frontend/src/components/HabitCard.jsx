import useHabits from "@/hooks/useHabits";
import { Box, Stack, Checkbox, Image } from "@chakra-ui/react";

function HabitCard({
  id,
  habit = "Habit Name",
  icon = "✨",
  isCompleted = false,
}) {
  const { toggleHabit } = useHabits();
  return (
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
            {habit}
          </Checkbox.Label>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Stack>
    </Box>
  );
}

export default HabitCard;
