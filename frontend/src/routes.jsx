import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <Leaderboard /> },
    ],
  },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);

export default router;
