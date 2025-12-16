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
import { passwordStrength } from "check-password-strength";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const strengthOptions = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

function SignUpInputs() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  async function handleSubmit(formData) {
    setLoading(true);
    try {
      //
      let name = formData.get("name");
      let username = formData.get("username").trim().toLowerCase();
      let email = formData.get("email").trim().toLowerCase();
      let pass = formData.get("pass") || password;

      const emailRegex = /^[^@\s+]+@[^@\s]+\.[^@\s]+$/;
      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]+$/;

      if (!name || name === "") {
        //
        throw new Error("Name is required.");
        //
      } else if (name.length < 3 || name.length > 150) {
        //
        throw new Error("Please enter a valid name.");
        //
      }

      if (!username || username === "") {
        //
        throw new Error("Username is required.");
        //
      } else if (username.length < 2 || username.length > 25) {
        //
        throw new Error("Please enter a valid name.");
        //
      } else if (!usernameRegex.test(name)) {
        //
        throw new Error("Please enter a valid name.");
        //
      }

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
      } else if (pass.length < 5 || pass.length > 150) {
        //
        throw new Error("Invalid Password");

        //
      }

      register(name, email, username, pass)
        .then((data) => {
          // console.log(data);
          navigate("/login");
        })
        .catch((err) => {
          setLoading(false);
          // console.log(err);
          setError(err.message);
          throw new Error("Error! Authentication failed.");
        })
        .finally(() => {
          setLoading(false);
        });

      setLoading(false);

      //
    } catch (err) {
      //
      setLoading(false);

      if (err) {
      }
      setError(err.message);
      // setError("Error! Authentication failed.");
      // console.log(err.name);
      // console.log(err.message);
      //
    }
  }

  return (
    <Stack gap={3} asChild>
      <form action={handleSubmit}>
        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}

        <Stack gap={3} direction={{ base: "column", sm: "row" }}>
          <Field.Root required disabled={loading}>
            <Input
              borderColor={"border.emphasized"}
              placeholder="Name"
              variant="subtle"
              colorPalette={"teal"}
              name="name"
              minLength="3"
              maxLength="150"
            />
          </Field.Root>
          <Field.Root required disabled={loading}>
            <Input
              borderColor={"border.emphasized"}
              placeholder="Username"
              variant="subtle"
              colorPalette={"teal"}
              name="username"
              minLength="5"
              maxLength="25"
            />
          </Field.Root>
        </Stack>

        {/* Inputs */}
        <Field.Root required disabled={loading}>
          <Input
            borderColor={"border.emphasized"}
            placeholder="Email Address"
            variant="subtle"
            colorPalette={"teal"}
            name="email"
            minLength="5"
            type="email"
          />
        </Field.Root>
        <Field.Root required disabled={loading}>
          <Stack gap="1" width={"100%"}>
            <PasswordInput
              borderColor={"border.emphasized"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
              variant="subtle"
              colorPalette={"teal"}
              name="pass"
              type="password"
              minLength="5"
              maxLength="150"
            />
            <PasswordStrengthMeter value={strength} colorPalette="red" />
          </Stack>
        </Field.Root>

        <Button mt={2} type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner size={"sm"} />
              Signing up...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
        <Text
          mt={2}
          fontSize={14}
          color={"fg.muted"}
          textAlign={{ base: "center", md: "left" }}
        >
          By creating an account, you agree to our{" "}
          <Link
            to={"/terms-and-conditions"}
            style={{
              textDecoration: "underline",
              fontWeight: "500",
              color: "white",
            }}
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            to={"/privacy-policy"}
            style={{
              textDecoration: "underline",
              fontWeight: "500",
              color: "white",
            }}
          >
            Privacy Policy
          </Link>{" "}
          .
        </Text>
      </form>
    </Stack>
  );
}

export default SignUpInputs;
