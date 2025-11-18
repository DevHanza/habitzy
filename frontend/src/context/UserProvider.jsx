import { UserContext } from "@/context/UserContext";
import { useState } from "react";

const userData = {
  name: "Dev Hanza",
  email: "hello@hansana.is-a.dev",
  username: "DevHanza",
  currentStreak: 21,
  longestStreak: 0,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userData);

  const incrementStreak = () => {
    const longestStreak = Math.max(user.currentStreak, user.longestStreak);

    setUser((prevUser) => {
      return {
        ...prevUser,
        currentStreak: prevUser.currentStreak + 1,
        longestStreak,
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, incrementStreak }}>
      {children}
    </UserContext.Provider>
  );
};
