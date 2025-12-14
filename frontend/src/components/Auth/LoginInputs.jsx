import { useState } from "react";
import { Stack, Field, Input, Button, Text, Spinner } from "@chakra-ui/react";
import { Link } from "react-router";
import { PasswordInput } from "@/components/ui/password-input";

function LoginInputs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  return (
    <Stack gap={4} asChild>
      <form action={handleSubmit}>
        <Text>{error}</Text>
        <Stack gap={3}>
          {/* Inputs */}
          <Field.Root>
            <Input
              borderColor={"border.emphasized"}
              placeholder="Email Address"
              variant="subtle"
              colorPalette={"teal"}
              autoComplete="true"
              disabled={loading}
              required
              type="email"
              name="email"
            />
          </Field.Root>
          <Field.Root>
            <Stack gap="1" width={"100%"}>
              <PasswordInput
                borderColor={"border.emphasized"}
                placeholder="Password"
                variant="subtle"
                colorPalette={"teal"}
                disabled={loading}
                required
                type="password"
                name="password"
              />
            </Stack>
          </Field.Root>
        </Stack>

        {/* <Button type="submit" disabled={loading}>
          Log In
        </Button> */}

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner size={"sm"} />
              Signing in...
            </>
          ) : (
            " Log In"
          )}
        </Button>

        {/* <Checkbox.Root defaultChecked variant={"solid"} colorPalette={"teal"}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label cursor={"pointer"}>Keep me signed in</Checkbox.Label>
      </Checkbox.Root> */}

        <Text
          fontSize={14}
          color={"fg.muted"}
          // _hover={{ color: "white" }}
          textAlign={{ base: "center" }}
          textDecoration={"underline"}
          as={Link}
          to={"/forgot-password"}
        >
          Forgot Password?
        </Text>
      </form>
    </Stack>
  );
}

export default LoginInputs;
