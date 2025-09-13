import { Box, Text } from "@chakra-ui/react";

function HabitCard() {
  return (
    <Box
      borderRadius={6}
      px={3}
      py={2}
      _hover={{
        bg: "bg.emphasized",
      }}
      borderColor={"fg.subtle"}
      width={"100%"}
    >
      <Text>Water the plants</Text>
      {/*  */}
      {/*  */}
      {/*  */}
    </Box>
  );
}

export default HabitCard;
