import { Box, HStack, Stack, SkeletonCircle, Skeleton } from "@chakra-ui/react";

function LeaderboardCardSkeleton() {
  return (
    <Box
      borderRadius={6}
      // px={3}
      py={2}
      width={"100%"}
    >
      <HStack gap={3} flex={1}>
        <SkeletonCircle size="10" />
        <Stack flex={1}>
          <Skeleton height="3" width="80%" />
          <Skeleton height="3" width="60%" />
        </Stack>
      </HStack>
    </Box>
  );
}

export default LeaderboardCardSkeleton;
