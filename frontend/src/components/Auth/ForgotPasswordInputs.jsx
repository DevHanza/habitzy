import { Stack, Field, Input, Button } from "@chakra-ui/react";

function ForgotPasswordInputs() {
  return (
    <Stack gap={4}>
      <Stack gap={3}>
        {/* Inputs */}
        <Field.Root required>
          <Input
            borderColor={"border.emphasized"}
            placeholder="Email Address"
            variant="subtle"
            colorPalette={"teal"}
          />
        </Field.Root>
      </Stack>

      <Button>Send Verification Code</Button>
    </Stack>
  );
}

export default ForgotPasswordInputs;
