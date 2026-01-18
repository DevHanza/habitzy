import { Navigate, Link } from "react-router";
import NavigateControls from "@/components/layout/NavigateControls";
import SettingsInput from "@/components/SettingsInput";
import { useColorMode } from "@/components/ui/color-mode";
import {
  Box,
  Container,
  Flex,
  Stack,
  Heading,
  Text,
  Field,
  Avatar,
  Separator,
  Button,
  Switch,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";

import { useAuth } from "@/hooks/useAuth";

function Settings() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }

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
        </Flex>
      </Container>
    </Container>
  );
}

function AccountSettings() {
  const { user, setUser } = useAuth();

  return (
    <Stack gap={8}>
      <Heading size={"xl"} lineHeight={1}>
        Account
      </Heading>

      <Stack gap={4}>
        <Avatar.Root size={"2xl"} colorPalette={"teal"}>
          <Avatar.Fallback name={user?.name} />
        </Avatar.Root>

        <SettingsInput
          label="Name"
          placeholder="eg: Dev Hanza"
          defaultValue={user?.name}
          name="name"
          setUser={setUser}
        />
        <SettingsInput
          label="Username"
          placeholder="eg: @devhanza (Without '@')"
          defaultValue={user?.username}
          name="username"
          setUser={setUser}
        />
        <SettingsInput
          label="Email"
          placeholder="eg: devhanza@mail.com"
          defaultValue={user?.email}
          name="email"
          setUser={setUser}
        />

        <Field.Root required gap={4}>
          <Field.Label>Password</Field.Label>
          <Box display={"inline-flex"} gap={2}>
            <Link to={"/reset-password"}>
              <Button size={"sm"} colorPalette={"teal"}>
                Reset Password
              </Button>
            </Link>
          </Box>
        </Field.Root>
      </Stack>
    </Stack>
  );
}

function Preferences() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack gap={8}>
      {/* Title */}
      <Heading size={"xl"} lineHeight={1}>
        Preferences
      </Heading>
      {/* Items */}
      <Stack gap={4} justifyContent={"space-between"}>
        <Switch.Root
          colorPalette={"teal"}
          checked={colorMode === "dark" ? true : false}
        >
          <Switch.HiddenInput onClick={toggleColorMode} />
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

        <Dialog.Root role="alertdialog" placement={"center"}>
          <Dialog.Trigger asChild>
            <Button
              size={"sm"}
              width={"fit-content"}
              colorPalette={"red"}
              variant="subtle"
            >
              Delete Account
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Are you sure?</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our systems.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button colorPalette="red">Delete</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Stack>
    </Stack>
  );
}

export default Settings;
