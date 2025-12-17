import { Text } from "@chakra-ui/react";

import AuthPage from "@/components/layout/AuthLayout";
import ForgotPasswordInputs from "@/components/Auth/ForgotPasswordInputs";

function ForgotPassword() {
  return (
    <AuthPage
      heading="Forgot Password"
      headingText={
        <Text color={"fg.muted"} textAlign={{ base: "center", lg: "left" }}>
          We'll send a verification code to your email address.
        </Text>
      }
    >
      <ForgotPasswordInputs />
    </AuthPage>
  );
}

export default ForgotPassword;
