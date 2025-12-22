import { Stack, PinInput, Button } from "@chakra-ui/react";

function VerifyCodeInputs() {

  const handleSubmit = () => {
    //
  };

  return (
    <Stack gap={4} asChild>
      <form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <PinInput.Root
            size={"xl"}
            width={"100%"}
            colorPalette={"teal"}
            invalid={false}
            attached
            autoFocus
          >
            <PinInput.HiddenInput />
            <PinInput.Control display={"flex"} width={"100%"}>
              <PinInput.Input
                flex={1}
                index={0}
                borderColor={"border.emphasized"}
              />
              <PinInput.Input
                flex={1}
                index={1}
                borderColor={"border.emphasized"}
              />
              <PinInput.Input
                flex={1}
                index={2}
                borderColor={"border.emphasized"}
              />
              <PinInput.Input
                flex={1}
                index={3}
                borderColor={"border.emphasized"}
              />
              <PinInput.Input
                flex={1}
                index={4}
                borderColor={"border.emphasized"}
              />
            </PinInput.Control>
          </PinInput.Root>
        </Stack>

      <Button disabled={true}>Verify</Button>
    </Stack>
  );
}

export default VerifyCodeInputs;
