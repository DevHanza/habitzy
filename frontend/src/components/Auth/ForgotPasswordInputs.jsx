import { useState } from "react";
import { useNavigate } from "react-router";
import { Stack, Field, Input, Button, Spinner, Alert } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail } from "@/utils/validateInputs";

function ForgotPasswordInputs() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //
      const email = e.target.email.value;

      validateEmail(email);

      forgotPassword(email)
        .then(() => {
          navigate("/verify", { state: { email: email } });
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
          throw new Error("Error! Authentication failed.");
          // console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });

      //
    } catch (err) {
      //
      // console.log(err);
      setLoading(false);
      setError(err.message);
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
            <Input
              borderColor={"border.emphasized"}
              placeholder="Email Address"
              variant="subtle"
              colorPalette={"teal"}
              minLength="5"
              type="email"
              name="email"
            />
          </Field.Root>
        </Stack>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size={"sm"} />
              Loading...
            </>
          ) : (
            "Send Verification Code"
          )}
        </Button>
      </form>
    </Stack>
  );
}

export default ForgotPasswordInputs;
