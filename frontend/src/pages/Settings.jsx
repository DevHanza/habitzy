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
          <Button mt={4} colorPalette={"teal"}>
            Save Changes
          </Button>
        </Flex>
      </Container>
    </Container>
  );
}

function AccountSettings() {
  return (
    <Stack gap={8}>
      <Heading size={"xl"} lineHeight={1}>
        Account
      </Heading>

      <Stack gap={4}>
        <Avatar.Root size={"2xl"} colorPalette={"teal"}>
          <Avatar.Fallback name="Segun Adebayo" />
        </Avatar.Root>

        <Field.Root required>
          <Field.Label>Name</Field.Label>
          <Box display={"inline-flex"} gap={2}>
            <Input
              placeholder=""
              disabled=""
              colorPalette={"teal"}
              value={"DevHanza"}
              size={"sm"}
            />
            <IconButton aria-label="Edit Name" size={"sm"} variant="outline">
              <Pencil />
            </IconButton>
          </Box>
        </Field.Root>
        <Field.Root required>
          <Field.Label>Username</Field.Label>
          <Box display={"inline-flex"} gap={2}>
            <Input
              placeholder=""
              disabled=""
              colorPalette={"teal"}
              value={"devhanza"}
              size={"sm"}
            />
            <IconButton aria-label="Edit Name" size={"sm"} variant="outline">
              <Pencil />
            </IconButton>
          </Box>
        </Field.Root>

        {/* <Stack gap={0} display={"inline-flex"}>
          <Heading size={"md"} mb={2}>
            Delete Your Account
          </Heading>
          <Text fontSize={"sm"} mb={4} color={"fg.muted"}>
            Once you delete your account, all your data will be permanently
            erased. We don't store backups, so be sure to save anything
            important first.
          </Text>
          <Button
            width={"fit-content"}
            size={"sm"}
            colorPalette={"red"}
            variant="solid"
          >
            Delete Account
          </Button>
        </Stack> */}
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
