import { Text } from "@chakra-ui/react";
import { Link } from "react-router";

import AuthPage from "@/components/layout/AuthPage";
import LoginInputs from "@/components/Auth/LoginInputs";

function Login() {
  return (
    <AuthPage
      heading="Log In"
      headingText={
        <Text color={"fg.muted"} textAlign={{ base: "center", lg: "left" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "underline", color: "white" }}
          >
            Sign up
          </Link>
          .
        </Text>
      }
    >
      <LoginInputs />
    </AuthPage>
  );
}

export default Login;
