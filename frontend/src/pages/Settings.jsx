import { Link, useNavigate } from "react-router";
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
  Input,
} from "@chakra-ui/react";
import { deleteCookie } from "@/utils/cookieHelper";
import { toaster } from "@/components/ui/toaster";

import NavigateControls from "@/components/layout/NavigateControls";
import SettingsInput from "@/components/SettingsInput";
import LoadingScreen from "@/components/ui/LoadingScreen";

import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { validateName, validateUsername } from "@/utils/validateInputs";

function Settings() {
  const { isUserLoading } = useUser();

  if (isUserLoading) {
    return <LoadingScreen />;
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
          <Sessions />
          <DeleteAccountSettings />
        </Flex>
      </Container>
    </Container>
  );
}

export default Settings;

function AccountSettings() {
  const { user, updateUser } = useUser();

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
          placeholder="eg: Your Name"
          defaultValue={user?.name}
          name="name"
          updateUser={updateUser}
          validator={validateName}
        />
        <SettingsInput
          label="Username"
          placeholder="eg: @yourname (Without '@')"
          defaultValue={user?.username}
          name="username"
          updateUser={updateUser}
          validator={validateUsername}
        />
        <UserEmailInput
          label="Email"
          defaultValue={user?.email}
          disabled={true}
          // name="email"
          // updateUser={updateUser}
        />

        <Field.Root required gap={4}>
          <Field.Label>Password</Field.Label>
          <Box display={"inline-flex"} gap={2}>
            <Link to={"/forgot-password"}>
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

function Sessions() {
  const { logoutAll } = useAuth();

  function handleLogoutAll() {
    logoutAll();
  }

  return (
    <Stack gap={8}>
      {/* Title */}
      <Heading size={"xl"} lineHeight={1}>
        Sessions
      </Heading>
      {/* Items */}
      <Stack gap={4} justifyContent={"space-between"}>
        <Button
          size={"sm"}
          width={"fit-content"}
          colorPalette={"teal"}
          onClick={handleLogoutAll}
        >
          Log out everywhere
        </Button>
      </Stack>
    </Stack>
  );
}

function DeleteAccountSettings() {
  const navigate = useNavigate();
  const { authFetch } = useAuth();

  async function handleDeleteAccount() {
    try {
      //
      const res = await authFetch({
        url: "user",
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toaster.create({
          title: `${data.message}`,
          type: "error",
          closable: true,
        });
        throw Error(data.message);
      }
      deleteCookie("IsLoggedIn");
      deleteCookie("quote");

      navigate("/status", {
        state: {
          status: {
            success: true,
            title: "Your Account is Deleted",
            message:
              "Your account has been permanently deleted. Thank you for the time you spent with us.",
            btn: "Back to Home",
            btnLink: "/",
          },
        },
      });

      //
    } catch (err) {
      throw Error(err);
    }
  }

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
                  <Button colorPalette="red" onClick={handleDeleteAccount}>
                    Delete
                  </Button>
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

function UserEmailInput({ ...props }) {
  return (
    <Field.Root required gap={4}>
      <Field.Label>Email Address</Field.Label>
      <Input
        {...props}
        placeholder={"jhondoe@email.com"}
        disabled={true}
        colorPalette={"teal"}
        size={"sm"}
        name={"email"}
        // borderColor={"border.emphasized"}
      />
    </Field.Root>
  );
}
