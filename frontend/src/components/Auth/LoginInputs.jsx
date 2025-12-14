import { useState } from "react";
import { Stack, Field, Input, Button, Text, Spinner } from "@chakra-ui/react";
import { Link } from "react-router";
import { PasswordInput } from "@/components/ui/password-input";

function LoginInputs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    setLoading(true);
    try {
      //
      let email = formData.get("email").trim().toLowerCase();
      let pass = formData.get("password").trim();

      const emailRegex = /^[^@\s+]+@[^@\s]+\.[^@\s]+$/;

      if (!email || email === "") {
        //
        return setError("Email is required.");
        //
      } else if (email.length < 5) {
        //
        return setError("Email must be longer than 5 characters.");
        //
      } else if (!emailRegex.test(email)) {
        //
        return setError("Please enter a valid email address.");
        //
      }

      if (!pass || pass === "") {
        //
        return setError("Password is required.");
        //
      } else if (pass.length < 5 || pass.length > 10) {
        //
        return setError("Invalid password.");
        //
      }

      //
    } catch (err) {
      //
      setLoading(false);
      setError("Error! Authentication failed.");
      // console.log(err);
      //
    } finally {
      // setLoading(false);
    }
  }

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
