import useUser from "@/hooks/useUser";
import NavigateControls from "@/components/layout/NavigateControls";
import SettingsInput from "@/components/SettingsInput";
import {
  Box,
  Container,
  Flex,
  Stack,
  Heading,
  Text,
  Field,
  Input,
  Avatar,
  Separator,
  Button,
  IconButton,
  Switch,
  HStack,
} from "@chakra-ui/react";
import NavigateControls from "@/components/layout/NavigateControls";
import { Pencil } from "lucide-react";

function Settings() {
  return (
    <Container>
      <NavigateControls />
      <Container maxW={"xl"}>
        <Flex direction={"column"} gap={10}>
          <Heading size={{ base: "2xl", md: "2xl" }}>Settings</Heading>
          <AccountSettings />
          <Separator />
          <Preferences />
          <Separator />
          <DeleteAccountSettings />
          <HStack
            position={"sticky"}
            bottom={{ base: "var(--bottom-nav-height)", md: 0 }}
            left={{ base: "var(--bottom-nav-height)", md: 0 }}
            width={"100%"}
            zIndex={10}
            py={2}
            mt={2}
          >
            <Button
              mt={4}
              colorPalette={"teal"}
              width={"100%"}
              disabled={"true"}
            >
              Save Changes
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Container>
  );
}

function AccountSettings() {
  const { user, setUser } = useUser();

  return (
    <Stack gap={8}>
      <Heading size={"xl"} lineHeight={1}>
        Account
      </Heading>

      <Stack gap={4}>
        <Avatar.Root size={"2xl"} colorPalette={"teal"}>
          <Avatar.Fallback name="Dev Hanza" />
        </Avatar.Root>

        <SettingsInput
          label="Name"
          placeholder="eg: Dev Hanza"
          defaultValue={user.name}
          name="name"
          setUser={setUser}
        />
        <SettingsInput
          label="Username"
          placeholder="eg: @devhanza (Without '@')"
          defaultValue={user.username}
          name="username"
          setUser={setUser}
        />
        <SettingsInput
          label="Email"
          placeholder="eg: devhanza@mail.com"
          defaultValue={user.email}
          name="email"
          setUser={setUser}
        />

        <Field.Root required gap={4}>
          <Field.Label>Password</Field.Label>
          <Box display={"inline-flex"} gap={2}>
            <Button size={"sm"} colorPalette={"teal"}>
              Reset Password
            </Button>
          </Box>
        </Field.Root>
      </Stack>
    </Stack>
  );
}

function Preferences() {
  return (
    <Stack gap={8}>
      {/* Title */}
      <Heading size={"xl"} lineHeight={1}>
        Preferences
      </Heading>
      {/* Items */}
      <Stack gap={4} justifyContent={"space-between"}>
        <Switch.Root colorPalette={"teal"}>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Enable Dark Mode</Switch.Label>
        </Switch.Root>
      </Stack>
    </Stack>
  );
}

function DeleteAccountSettings() {
  return (
    <Stack gap={8}>
      {/* Title */}
      <Heading size={"xl"} lineHeight={1}>
        Delete Account
      </Heading>
      {/* Items */}
      <Stack gap={4} justifyContent={"space-between"}>
        <Text fontSize={"sm"} color={"fg.muted"}>
          Once you delete your account, all your data will be permanently
          erased. We don't store backups, so be sure to save anything important
          first.
        </Text>
        <Button width={"fit-content"} colorPalette={"red"} variant="subtle">
          Delete Account
        </Button>
      </Stack>
    </Stack>
  );
}

export default Settings;
