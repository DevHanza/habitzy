import { RouterProvider } from "react-router";
import router from "./routes";
import { HabitProvider } from "./context/HabitProvider";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <UserProvider>
      <HabitProvider>
        <RouterProvider router={router} />
      </HabitProvider>
    </UserProvider>
  );
}

export default App;
