import { useMemo, useState } from "react";
import { Stack, Field, Button, Spinner } from "@chakra-ui/react";

import { passwordStrength } from "check-password-strength";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";

const strengthOptions = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

function ResetPasswordInputs({ email, code }) {
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Stack gap={4} asChild>
      <form onSubmit={handleSubmit}>
        <Stack gap={3}>
          {/* Inputs */}

          <Field.Root required>
            <Stack gap="1" width={"100%"}>
              <PasswordInput
                borderColor={"border.emphasized"}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Password"
                variant="subtle"
                colorPalette={"teal"}
                type="password"
                name="password"
                minLength="5"
                maxLength="150"
              />
            </Stack>
          </Field.Root>
          <Field.Root required>
            <Stack gap="1" width={"100%"}>
              <PasswordInput
                borderColor={"border.emphasized"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                placeholder="Confirm Password"
                variant="subtle"
                colorPalette={"teal"}
                type="password"
                minLength="5"
                maxLength="150"
              />
              <PasswordStrengthMeter value={strength} colorPalette="red" />
            </Stack>
          </Field.Root>
        </Stack>

        <Button type="submit" disabled={true}>
          {loading ? (
            <>
              <Spinner size={"sm"} />
              Verifying...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Stack>
  );
}

export default ResetPasswordInputs;
