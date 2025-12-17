import SignUpInputs from "@/components/Auth/SignUpInputs";
import AuthPage from "@/components/layout/AuthLayout";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router";

function SignUp() {
  return (
    <AuthPage
      heading="Create an Account"
      headingText={
        <Text color={"fg.muted"} textAlign={{ base: "center", lg: "left" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "underline", color: "white" }}
          >
            Log in
          </Link>
        </Text>
      }
    >
      <SignUpInputs />
    </AuthPage>
  );
}

export default SignUp;
