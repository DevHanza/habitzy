import { Text } from "@chakra-ui/react";

import AuthPage from "@/components/layout/AuthLayout";
import ResetPasswordInputs from "@/components/Auth/ResetPasswordInputs";

function ResetPassword() {
  return (
    <AuthPage
      heading="Reset Password"
      headingText={
        <Text color={"fg.muted"} textAlign={{ base: "center", lg: "left" }}>
          Your new password must be different from your previous passwords.
        </Text>
      }
    >
      <ResetPasswordInputs />
    </AuthPage>
  );
}

export default ResetPassword;
