import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      //   { path: "settings", element: <Settings /> },
    ],
  },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
]);

export default router;
