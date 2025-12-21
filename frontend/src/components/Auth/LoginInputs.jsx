import { useState } from "react";
import {
  Stack,
  Field,
  Input,
  Button,
  Text,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/hooks/useAuth";

function LoginInputs() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      //
      let email = e.target.elements.email.value.trim().toLowerCase();
      let pass = e.target.elements.password.value;

      const emailRegex = /^[^@\s+]+@[^@\s]+\.[^@\s]+$/;

      if (!email || email.trim() === "") {
        //
        throw new Error("Email is required.");
        //
      } else if (email.length < 5) {
        //
        throw new Error("Email must be longer than 5 characters.");
        //
      } else if (!emailRegex.test(email)) {
        //
        throw new Error("Please enter a valid email address.");
        //
      }

      if (!pass || pass === "") {
        //
        throw new Error("Password is required.");
        //
      } else if (pass.length < 5 || pass.length > 10) {
        //
        throw new Error("Invalid password.");
        //
      }

      login(email, pass)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
          throw new Error("Error! Authentication failed.");
        })
        .finally(() => {
          setLoading(false);
        });

      //
    } catch (err) {
      //
      setLoading(false);
      setError(err.message);
      // setError("Error! Authentication failed.");
      // console.log(err);
      //
    }
  }

  return (
    <Stack gap={4} asChild>
      <form onSubmit={handleSubmit}>
        {/* <Text>{error}</Text> */}

        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}

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
              minLength={5}
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
                minLength={5}
                maxLength={150}
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
