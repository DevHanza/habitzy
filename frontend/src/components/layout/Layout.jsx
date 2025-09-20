import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { Stack } from "@chakra-ui/react";

function Layout() {
  return (
    <Stack gap={8}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Stack>
  );
}

export default Layout;
