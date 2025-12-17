import { Text } from "@chakra-ui/react";
import { Link, Navigate } from "react-router";

import AuthPage from "@/components/layout/AuthLayout";
import LoginInputs from "@/components/Auth/LoginInputs";
import { useAuth } from "@/hooks/useAuth";

function Login() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

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
