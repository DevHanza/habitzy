import { useEffect, useReducer } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  loginRequest,
  logoutRequest,
  refreshAccessTokenRequest,
} from "@/api/authAPI";

const initialState = {
  user: null,
  accessToken: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, accessToken: action.payload };
    case "LOGOUT":
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isLoggedIn = state.accessToken ? true : false;

  // Get Access Token on Initial Load
  useEffect(() => {
    // Note: This is a Immediately Invoked Function Expression (IIFE).
    (async function () {
      const res = await refreshAccessTokenRequest();

      if (!res.ok) return;

      const data = await res.json();
      dispatch({ type: "SET_TOKEN", payload: data.accessToken });
    })();
    //
  }, []);

  async function login(email, password) {
    const res = await loginRequest(email, password);
    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch({ type: "SET_TOKEN", payload: data.accessToken });

    return true;
  }

  async function logout() {
    const res = await logoutRequest();
    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch({ type: "LOGOUT" });
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        isLoggedIn,
        accessToken: state.accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
