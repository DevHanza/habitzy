import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "@/components/layout/Layout";

const Account = lazy(async () => import("@/pages/Account"));
const Leaderboard = lazy(async () => import("@/pages/Leaderboard"));
const Settings = lazy(async () => import("@/pages/Settings"));

// Auth Pages
const SignUp = lazy(async () => import("@/pages/Auth/SignUp"));
const Login = lazy(async () => import("@/pages/Auth/Login"));
const Logout = lazy(async () => import("@/pages/Auth/Logout"));
const ForgotPassword = lazy(async () => import("@/pages/Auth/ForgotPassword"));
const VerifyCode = lazy(async () => import("@/pages/Auth/VerifyCode"));
const ResetPassword = lazy(async () => import("@/pages/Auth/ResetPassword"));
const ErrorPage = lazy(async () => import("@/pages/ErrorPage"));
const StatusPage = lazy(async () => import("@/pages/StatusPage"));

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
    path: "status",
    element: <StatusPage />,
    errorElement: <ErrorPage />,
  },
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
