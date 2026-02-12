import { Box, Stack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function HabitCardSkeleton() {
  return (
    <Box
      borderRadius={6}
      px={3}
      py={4}
      // border={"0.5px solid"}
      // borderColor={"border"}
      bg={"bg.subtle"}
      width={"100%"}
      position={"relative"}
      outlineColor={"teal.500"}
    >
      <Stack gap={3} direction={"vertical"} alignItems={"center"}>
        <SkeletonCircle size="6" />
        <SkeletonText noOfLines={1} />
      </Stack>
    </Box>
  );
}

export default HabitCardSkeleton;
