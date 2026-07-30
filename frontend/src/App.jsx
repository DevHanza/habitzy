import { Suspense } from "react";
import { RouterProvider } from "react-router";

import { AuthProvider } from "@/context/AuthProvider";
import { UserProvider } from "@/context/UserProvider";
import { HabitProvider } from "@/context/HabitProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

import router from "@/routes";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <AuthProvider>
          <UserProvider>
            <HabitProvider>
              <RouterProvider router={router} />
            </HabitProvider>
          </UserProvider>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
