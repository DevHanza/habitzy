import { RouterProvider } from "react-router";
import router from "@/routes";
import { HabitProvider } from "@/context/HabitProvider";
import { UserProvider } from "@/context/UserProvider";
import { Suspense } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <UserProvider>
        <HabitProvider>
          <RouterProvider router={router} />
        </HabitProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
