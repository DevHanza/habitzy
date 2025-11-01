import {
  Flex,
  Container,
  HStack,
  Stack,
  Heading,
  Text,
  Box,
  Grid,
  Image,
} from "@chakra-ui/react";

function Account() {
  return (
    <Container maxW={"xl"}>
      <Flex direction={"column"} gap={8}>
        {/* Profile Card - START*/}
        <Stack
          gap={2}
          background={"teal.focusRing/15"}
          border={"2px solid"}
          borderColor={"teal.focusRing"}
          px={4}
          py={8}
          width={"100%"}
          borderRadius={12}
        >
          <Heading fontSize={"1.5rem"} lineHeight={1}>
            DevHanza
          </Heading>
          <Text lineHeight={1}>@devhanza</Text>
        </Stack>
        {/* Profile Card - END */}

        {/* About - Start */}
        <Stack gap={2}>
          <Heading>About</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit,
            numquam! Quas tempora est aliquid dolorem sit provident nam ducimus
            quis autem.
          </Text>
        </Stack>
        {/* About - ENd */}

        {/* Statistics - Start*/}
        <Stack gap={2}>
          <Heading>Statistics</Heading>
          <Grid templateColumns={"repeat(2, 1fr)"} gap={2}>
            <StatCard
              emoji="🔥"
              heading="34"
              text="Day streak"
              background={"yellow.500"}
            />
            <StatCard emoji="📈" heading="#23" text="Global rank" />
            <StatCard emoji="🎯" heading="553" text="Longest streak" />
            <StatCard emoji="📅" heading="Mar, 2024" text="Joined date" />
          </Grid>
        </Stack>
        {/* Statistics - End*/}
      </Flex>
    </Container>
  );
}

export default Account;

function StatCard({
  heading = "heading",
  text = "Text",
  emoji = "🔴",
  ...props
}) {
  return (
    <Box
      // {...props}
      p={3}
      border={"1px solid"}
      borderColor={"fg/30"}
      borderRadius={4}
    >
      <HStack alignItems={"top"} gap={4}>
        <Image
          src={`https://emojicdn.elk.sh/${emoji}?style=facebook`}
          height={{ base: "1.25rem", md: "1.5rem" }}
        />
        <Stack gap={1.5}>
          <Heading fontWeight={700} fontSize={"1.25rem"} lineHeight={1}>
            {heading}
          </Heading>
          <Text color={"fg.muted"} fontSize={"0.875rem"} lineHeight={1}>
            {text}
          </Text>
        </Stack>
      </HStack>
    </Box>
  );
}
