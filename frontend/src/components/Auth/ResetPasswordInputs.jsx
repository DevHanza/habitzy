import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Stack, Field, Button, Alert, Spinner } from "@chakra-ui/react";

import { useAuth } from "@/hooks/useAuth";
import { passwordStrength } from "check-password-strength";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import {
  validateEmail,
  validatePassword,
  validateVerifyCode,
} from "@/utils/validateInputs";

const strengthOptions = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

function ResetPasswordInputs({ email, code }) {
  const { resetPassword } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //
      let newPassword = e.target.password.value;
      let confirmPassword = e.target.confirmPassword.value;

      validatePassword(newPassword);
      validateEmail(email);
      validateVerifyCode(code);

      if (newPassword !== confirmPassword) {
        throw new Error("Emails must match each other.");
      }

      resetPassword(email, code, newPassword)
        .then((data) => {
          //
          // console.log(data);
          navigate("/login");
          setError("");
        })
        .catch((err) => {
          //
          setError(err.message);
          throw new Error("Error! Authentication failed.");
        })
        .finally(() => {
          //
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
  };

  return (
    <Stack gap={4} asChild>
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}

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
                placeholder="Confirm Password"
                variant="subtle"
                colorPalette={"teal"}
                type="password"
                name="confirmPassword"
                minLength="5"
                maxLength="150"
              />
              <PasswordStrengthMeter value={strength} colorPalette="red" />
            </Stack>
          </Field.Root>
        </Stack>

        <Button type="submit" disabled={loading}>
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
