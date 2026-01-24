import { Outlet } from "react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Stack } from "@chakra-ui/react";

function Layout() {
  return (
    <Stack
      gap={8}
      minHeight={"100vh"}
      // flex={1}
      // height={"100vh"}
    >
      <Header />
      <Stack height={"100%"} justifyContent={"space-between"} flex={1} gap={8}>
        <main>
          <Outlet />
        </main>
        <Footer />
      </Stack>
    </Stack>
  );
}

export default Layout;
