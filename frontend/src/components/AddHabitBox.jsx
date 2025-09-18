import { Box, Input, Stack, Button } from "@chakra-ui/react";
import { Plus, X } from "lucide-react";

function AddHabitBox() {
  return (
    <Box
      borderRadius={6}
      bg={"bg"}
      width={"100%"}
      position={"relative"}
      borderWidth={2}
      borderColor={"teal"}
      _hover={{
        borderColor: "teal.500",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} px={3}>
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
        <Button size="sm" colorPalette={"teal"} p={3}>
          <Plus />
        </Button>
        <Button size="sm" variant={"surface"} colorPalette={"teal"} p={3}>
          <X />
        </Button>
      </Stack>
    </Box>
  );
}

export default AddHabitBox;
