import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "@/components/layout/Layout";
import Account from "@/pages/Account";
import Leaderboard from "@/pages/Leaderboard";
import Settings from "@/pages/Settings";

// Auth Pages
import SignUp from "@/pages/Auth/SignUp";
import Login from "@/pages/Auth/Login";
import Logout from "@/pages/Auth/Logout";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import VerifyCode from "@/pages/Auth/VerifyCode";
import ResetPassword from "@/pages/Auth/ResetPassword";
import ErrorPage from "@/pages/ErrorPage";

const Home = lazy(async () => {
  // await new Promise((r) => setTimeout(r, 1500)); // Simulated 1.5s delay
  return import("@/pages/Home");
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "account", element: <Account /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  // Auth Routes
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify",
        element: <VerifyCode />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);

export default router;
