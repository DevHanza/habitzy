import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/ui/LoadingScreen";

function Logout() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    //
    if (!isLoggedIn) {
      console.log("You must log in first, order to logout.");
      navigate("/");
      return;
    }

    try {
      logout()
        .then((data) => {
          console.log(data.message);
          navigate("/");
        })
        .catch((err) => {
          throw Error(err.message);
          // console.log(err.message);
          // navigate("/");
        });
    } catch (err) {
      throw Error(err.message);
    }

    //
  });

  return <LoadingScreen />;
}

export default Logout;
