import { useState } from "react";
import { useNavigate } from "react-router";
import { Stack, PinInput, Button, Alert, Spinner } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validateVerifyCode } from "@/utils/validateInputs";

function VerifyCodeInputs({ email }) {
  const navigate = useNavigate();

  const [code, setCode] = useState();
  const [isValidLength, setIsValidLength] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { verifyCode } = useAuth();

  const handleSubmit = (e) => {
    //
    e.preventDefault();
    setLoading(true);

    try {
      //
      const vCode = e.target.verifycode.value;

      validateVerifyCode(vCode);
      validateEmail(email);

      verifyCode(email, vCode)
        .then((data) => {
          // console.log(data);
          setError("");
          navigate("/reset-password", { state: { email: email, code: code } });
        })
        .catch((err) => {
          setLoading(false);
          // console.log(err.message);
          setError(err.message);
          throw new Error("Error! Verification failed.");
        })
        .finally(() => {
          setLoading(false);
          //
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
