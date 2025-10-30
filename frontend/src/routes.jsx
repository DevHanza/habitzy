import { createBrowserRouter, Navigate } from "react-router";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Account from "@/pages/Account";
import Leaderboard from "@/pages/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "account", element: <Account /> },
    ],
  },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);

export default router;
