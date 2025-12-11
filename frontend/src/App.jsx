import { Suspense } from "react";
import { RouterProvider } from "react-router";

import { AuthProvider } from "@/context/AuthProvider";
import { UserProvider } from "@/context/UserProvider";
import { HabitProvider } from "@/context/HabitProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";

import router from "@/routes";

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthProvider>
        <UserProvider>
          <HabitProvider>
            <RouterProvider router={router} />
          </HabitProvider>
        </UserProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
