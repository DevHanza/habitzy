import { useState } from "react";
import { useNavigate } from "react-router";
import { Stack, Field, Input, Button, Spinner } from "@chakra-ui/react";

function ForgotPasswordInputs() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //
      const email = e.target.elements.email.value.trim().toLowerCase();

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
      navigate("/verify", { state: { email: email } });
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
