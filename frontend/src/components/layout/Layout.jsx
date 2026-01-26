import { Outlet } from "react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Stack } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";

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
          <Toaster />
        </main>
        <Footer />
      </Stack>
    </Stack>
  );
}

export default Layout;
