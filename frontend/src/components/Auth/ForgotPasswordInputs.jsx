import { useState } from "react";
import { useNavigate } from "react-router";
import { Stack, Field, Input, Button, Spinner } from "@chakra-ui/react";

function ForgotPasswordInputs() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      //
      navigate("/verify", { state: { email: event.target.email.value } });
      //
    } catch (err) {
      //
      console.log(err);
      //
    } finally {
      //
      setIsLoading(false);
      //
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Stack gap={3}>
          {/* Inputs */}
          <Field.Root required>
            <Input
              name="email"
              type="email"
              borderColor={"border.emphasized"}
              placeholder="Email Address"
              variant="subtle"
              colorPalette={"teal"}
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
      </Stack>
    </form>
  );
}

export default ForgotPasswordInputs;
