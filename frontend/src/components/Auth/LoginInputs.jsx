import { useState } from "react";
import { Stack, Field, Input, Button, Checkbox, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { PasswordInput } from "@/components/ui/password-input";

function LoginInputs() {
  const [password, setPassword] = useState("");

  return (
    <Stack gap={4}>
      <Stack gap={3}>
        {/* Inputs */}
        <Field.Root required>
          <Input
            borderColor={"border.emphasized"}
            placeholder="Email Address"
            variant="subtle"
            colorPalette={"teal"}
          />
        </Field.Root>
        <Field.Root required>
          <Stack gap="1" width={"100%"}>
            <PasswordInput
              borderColor={"border.emphasized"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
              variant="subtle"
              colorPalette={"teal"}
            />
          </Stack>
        </Field.Root>

        <Text textAlign={{ base: "right" }} fontSize={14}>
          <Link
            to="/forgot-password"
            style={{ textDecoration: "underline", color: "white" }}
          >
            Forgot Password?
          </Link>
        </Text>
      </Stack>

      <Button>Log In</Button>

      {/* <Checkbox.Root defaultChecked variant={"solid"} colorPalette={"teal"}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label cursor={"pointer"}>Keep me signed in</Checkbox.Label>
      </Checkbox.Root> */}
    </Stack>
  );
}

export default LoginInputs;
