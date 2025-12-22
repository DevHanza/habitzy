import { Text } from "@chakra-ui/react";

import AuthPage from "@/components/layout/AuthLayout";
import ResetPasswordInputs from "@/components/Auth/ResetPasswordInputs";

import { Navigate, useLocation } from "react-router";

function ResetPassword() {
  const location = useLocation();
  const email = location.state?.email;
  const code = location.state?.code;

  if (!email || !code) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthPage
      heading="Reset Password"
      headingText={
        <Text color={"fg.muted"} textAlign={{ base: "center", lg: "left" }}>
          We recommend choosing a strong password that you haven't used before.
          {/* for <b>{email}</b>. */}
        </Text>
      }
    >
      <ResetPasswordInputs email={email} code={code} />
    </AuthPage>
  );
}

export default ResetPassword;
