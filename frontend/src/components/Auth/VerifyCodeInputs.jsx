import { Stack, PinInput, Button } from "@chakra-ui/react";

function VerifyCodeInputs() {
  return (
    <Stack gap={4}>
      <Stack gap={3} alignItems={{ base: "center", lg: "start" }}>
        <PinInput.Root
          size={"xl"}
          colorPalette={"teal"}
          invalid={false}
          attached
          autoFocus
        >
          <PinInput.HiddenInput />
          <PinInput.Control>
            <PinInput.Input index={0} borderColor={"border.emphasized"} />
            <PinInput.Input index={1} borderColor={"border.emphasized"} />
            <PinInput.Input index={2} borderColor={"border.emphasized"} />
            <PinInput.Input index={3} borderColor={"border.emphasized"} />
            <PinInput.Input index={4} borderColor={"border.emphasized"} />
          </PinInput.Control>
        </PinInput.Root>
      </Stack>

      <Button disabled={true}>Verify</Button>
    </Stack>
  );
}

export default VerifyCodeInputs;
