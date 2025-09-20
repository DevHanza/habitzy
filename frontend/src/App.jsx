import { RouterProvider } from "react-router";
import router from "./routes";
import { HabitProvider } from "./context/HabitProvider";

function App() {
  return (
    <HabitProvider>
      <RouterProvider router={router} />
    </HabitProvider>
  );
}

export default App;
