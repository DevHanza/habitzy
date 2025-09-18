import { Box, Input, Stack, IconButton } from "@chakra-ui/react";
import { Check, X, SmilePlus } from "lucide-react";

function AddHabitBox() {
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
      <Stack direction={"row"} alignItems={"center"} px={3}>
        {/* Add Emoji Button */}
        </IconButton>
        <Input
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
        <IconButton size="sm" colorPalette={"teal"} aria-label="Add habit">
          <Check />
        </IconButton>
        {/* Cancel Button */}
        <IconButton
          size="sm"
          variant={"surface"}
          colorPalette={"teal"}
          aria-label="Cancel Adding a habit"
        >
          <X />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default AddHabitBox;
