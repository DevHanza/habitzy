import { useState } from "react";
import { Stack, PinInput, Button, Alert } from "@chakra-ui/react";

function VerifyCodeInputs({ email }) {
  const [code, setCode] = useState();
  const [isValidLength, setIsValidLength] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    //
    e.preventDefault();

    try {
      //
      const vCode = e.target.verifycode.value;

      if (!vCode || vCode.trim() === "") {
        //
        throw new Error("Verify Code is required.");
        //
      } else if (vCode.length !== 5) {
        //
        throw new Error("Verify code must be exactly 5 digits.");
        //
      } else if (Number.isNaN(Number(vCode))) {
        throw new Error("Verify code must be a number.");
      }
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
        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}
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
            <PinInput.HiddenInput name="verifycode" />
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

        <Button type="submit" disabled={!isValidLength || loading}>
          {loading ? (
            <>
              <Spinner size={"sm"} />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </Stack>
  );
}

export default VerifyCodeInputs;
