import { UserContext } from "@/context/UserContext";
import { useState } from "react";

const userData = {
  name: "Jhon",
  email: "jhon@doe.com",
  currentStreak: 21,
  longestStreak: 0,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
