import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "@/components/layout/Layout";
import Account from "@/pages/Account";
import Leaderboard from "@/pages/Leaderboard";
import Settings from "@/pages/Settings";

// Auth Pages
import SignUp from "@/pages/Auth/SignUp";
import Login from "@/pages/Auth/Login";
import ForgotPassword from "@/pages/Auth/ForgotPassword";

const Home = lazy(async () => {
  // await new Promise((r) => setTimeout(r, 1500)); // Simulated 1.5s delay
  return import("@/pages/Home");
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "account", element: <Account /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);

export default router;
