import { useState } from "react";
import { Stack, PinInput, Button } from "@chakra-ui/react";

function VerifyCodeInputs() {
  const { verifyCode } = useAuth;
  const [code, setCode] = useState();
  const [isValidLength, setIsValidLength] = useState(false);

  const handleSubmit = () => {
    //
  };

  const handleInputs = (e) => {
    // console.log(e.target.value);

    const digit = e.target.value;
    setCode(digit);

    if (digit.length === 5) {
      setIsValidLength(true);
    } else {
      setIsValidLength(false);
    }
  };

  return (
    <Stack gap={4} asChild>
      <form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <PinInput.Root
            otp
            onChange={handleInputs}
            size={"xl"}
            width={"100%"}
            colorPalette={"teal"}
            invalid={false}
            attached
            autoFocus
            required
          >
            <PinInput.HiddenInput />
            <PinInput.Control display={"flex"} width={"100%"}>
              <PinInput.Input
                flex={1}
                index={0}
                borderColor={"border.emphasized"}
                maxLength={1}
                required
              />
              <PinInput.Input
                flex={1}
                index={1}
                borderColor={"border.emphasized"}
                maxLength={1}
                required
              />
              <PinInput.Input
                flex={1}
                index={2}
                borderColor={"border.emphasized"}
                required
                maxLength={1}
              />
              <PinInput.Input
                flex={1}
                index={3}
                borderColor={"border.emphasized"}
                required
                maxLength={1}
              />
              <PinInput.Input
                flex={1}
                index={4}
                borderColor={"border.emphasized"}
                required
                maxLength={1}
              />
            </PinInput.Control>
          </PinInput.Root>
        </Stack>

        <Button disabled={!isValidLength}>Verify</Button>
      </form>
    </Stack>
  );
}

export default VerifyCodeInputs;
