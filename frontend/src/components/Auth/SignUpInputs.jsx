import { Stack, Field, Input, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { passwordStrength } from "check-password-strength";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { useMemo, useState } from "react";

const strengthOptions = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

function SignUpInputs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  return (
    <Stack gap={3}>
      <Stack gap={3} direction={{ base: "column", sm: "row" }}>
        <Field.Root required>
          <Input
            borderColor={"border.emphasized"}
            placeholder="Name"
            variant="subtle"
            colorPalette={"teal"}
          />
        </Field.Root>
        <Field.Root required>
          <Input
            borderColor={"border.emphasized"}
            placeholder="Username"
            variant="subtle"
            colorPalette={"teal"}
          />
        </Field.Root>
      </Stack>

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
          <PasswordStrengthMeter value={strength} colorPalette="red" />
        </Stack>
      </Field.Root>

        <Button mt={2} type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner size={"sm"} />
              Signing in...
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
    </Stack>
  );
}

export default SignUpInputs;
