import { useAuth } from "@/hooks/useAuth";
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
  Avatar,
} from "@chakra-ui/react";

import NavigateControls from "@/components/layout/NavigateControls";
import { Navigate } from "react-router";

function Account() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  console.log("ACCOUNT PAGE RERENDERED!");

  return (
    <Container>
      <NavigateControls />
      <Container maxW={"xl"} paddingInline={{ smDown: 0 }}>
        <Flex direction={"column"} gap={8}>
          {/* Profile Card - START*/}
          <Stack
            width={"100%"}
            gap={0}
            position={"relative"}
            mb={{ base: 6, md: 8 }}
          >
            <Box
              height={32}
              borderRadius={12}
              style={{
                backgroundColor: "#14b8a5",
                opacity: 0.8,
                background:
                  "radial-gradient(circle, transparent 20%, rgb(229, 229, 247) 20%, rgb(229, 229, 247) 80%, transparent 80%, transparent) 0% 0% / 50px 50px, radial-gradient(circle, transparent 20%, rgb(229, 229, 247) 20%, rgb(229, 229, 247) 80%, transparent 80%, transparent) 25px 25px / 50px 50px, linear-gradient(rgb(20 184 165 / 0.6) 2px, transparent 2px) 0px -1px / 25px 25px, linear-gradient(90deg, rgb(20, 184, 165) 2px, rgb(229, 229, 247) 2px) -1px 0px / 25px 25px",
                backgroundSize: "50px 50px, 50px 50px, 25px 25px, 25px 25px",
              }}
            ></Box>
            <Avatar.Root
              // transform={"translate(10%, -55%)"}
              // mb={"-10%"}
              position={"absolute"}
              left={2}
              bottom={{ base: -8, md: -10 }}
              width={24}
              height={24}
              colorPalette={"teal"}
            >
              <Avatar.Fallback name={user?.name} fontSize={28} />
            </Avatar.Root>
          </Stack>

          {/* Profile Card - END */}

          <Stack gap={2} width={"100%"}>
            <Heading size={"2xl"} lineHeight={1}>
              {user?.name}
            </Heading>
            <Text lineHeight={1} color={"fg.muted"}>
              @{user?.username}
            </Text>
          </Stack>

          {/* About - Start */}
          <Stack gap={2}>
            {user?.description ? (
              <Text>{user?.description}</Text>
            ) : (
              <Text fontStyle={"italic"} color={"fg.muted"}>
                No Description.
              </Text>
            )}
          </Stack>
          {/* About - ENd */}

          {/* Statistics - Start*/}
          <Stack gap={4}>
            <Heading>Statistics</Heading>
            <Grid templateColumns={"repeat(2, 1fr)"} gap={2}>
              <StatCard
                emoji="🔥"
                heading={user?.streak?.currentStreak}
                text="Day streak"
                // background={"yellow.500"}
              />

              <StatCard
                emoji="🎯"
                heading={user?.streak?.longestStreak}
                text="Longest streak"
              />
            </Grid>
          </Stack>
          {/* Statistics - End*/}
        </Flex>
      </Container>
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
      {...props}
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
          <Heading fontWeight={700} size={"xl"} lineHeight={1}>
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
