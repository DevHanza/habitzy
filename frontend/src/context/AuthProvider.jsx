import { useEffect, useReducer } from "react";
import { AuthContext } from "@/context/AuthContext";
import { loginRequest, refreshAccessTokenRequest } from "@/api/authAPI";

const initialState = {
  user: null,
  accessToken: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get Refresh Token on Initial Load
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

  return (
    <AuthContext.Provider
      value={{
        state,
        accessToken: state.accessToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
