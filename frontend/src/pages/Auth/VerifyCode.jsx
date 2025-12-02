import { Text } from "@chakra-ui/react";

import AuthPage from "@/components/layout/AuthPage";
import VerifyCodeInputs from "@/components/Auth/VerifyCodeInputs";
import { useLocation } from "react-router";

function VerifyCode() {
  const location = useLocation();
  const email = location.state?.email;
  
  return (
    <AuthPage
      heading="Verification Code"
      headingText={
        <Text color={"fg.muted"} textAlign={{ base: "center", lg: "left" }}>
          We sent you verification code on ....<b>{email}</b>
        </Text>
      }
    >
      <VerifyCodeInputs />
    </AuthPage>
  );
}

export default VerifyCode;
