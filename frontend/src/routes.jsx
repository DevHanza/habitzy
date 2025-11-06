import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "@/components/layout/Layout";
import Account from "@/pages/Account";
import Leaderboard from "@/pages/Leaderboard";
import Settings from "@/pages/Settings";
// import Home from "@/pages/Home";


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
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);

export default router;
