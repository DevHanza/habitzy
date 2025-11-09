import { Text } from "@chakra-ui/react";

import AuthPage from "@/components/layout/AuthPage";
import VerifyCodeInputs from "@/components/Auth/VerifyCodeInputs";

function VerifyCode() {
  return (
    <AuthPage
      heading="Verification Code"
      headingText={
        <Text color={"fg.muted"} textAlign={{ base: "center", lg: "left" }}>
          We sent you verification code on ....<b>devhanza@gmail.com</b>
        </Text>
      }
    >
      <VerifyCodeInputs />
    </AuthPage>
  );
}

export default VerifyCode;
