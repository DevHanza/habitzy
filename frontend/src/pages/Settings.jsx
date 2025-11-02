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
        <Flex direction={"column"} gap={8}>
          <Heading size={{ base: "2xl", md: "2xl" }}>Settings</Heading>
          <AccountSettings />
          <Separator />
          <Preferences />
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

      <Stack gap={6}>
        <Avatar.Root size={"2xl"} colorPalette={"teal"}>
          <Avatar.Fallback name="Segun Adebayo" />
        </Avatar.Root>

        <Field.Root required>
          <Field.Label>Name</Field.Label>
          <Box display={"inline-flex"} gap={2}>
            <Input
              placeholder=""
              disabled="true"
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
              disabled="true"
              value={"devhanza"}
              size={"sm"}
            />
            <IconButton aria-label="Edit Name" size={"sm"} variant="outline">
              <Pencil />
            </IconButton>
          </Box>
        </Field.Root>

        <Stack gap={3} display={"inline-flex"}>
          <Text>Delete Your Account</Text>
          <Button
            width={"fit-content"}
            size={"sm"}
            colorPalette={"red"}
            variant="subtle"
          >
            Delete Account
          </Button>
        </Stack>
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
      <Stack gap={6} direction={"row"} justifyContent={"space-between"}>
        <Switch.Root colorPalette={"teal"}>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Enable Dark Mode</Switch.Label>
        </Switch.Root>
      </Stack>
    </Stack>
  );
}

export default Settings;
