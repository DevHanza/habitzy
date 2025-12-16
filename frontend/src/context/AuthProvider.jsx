import { useEffect, useReducer } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  loginRequest,
  logoutRequest,
  refreshAccessTokenRequest,
  registerRequest,
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
    if (!isLoggedIn) return;

    async function refreshAccessToken() {
      const res = await refreshAccessTokenRequest();

      if (!res.ok) return;

      const data = await res.json();
      dispatch({ type: "SET_TOKEN", payload: data.accessToken });
    }

    refreshAccessToken();
    //
  }, []);

  async function register(name, email, username, password) {
    try {
      //
      const res = await registerRequest(name, email, username, password);
      const data = await res.json();

      if (!res.ok) throw Error(data.message);

      return data;
      //
    } catch (err) {
      throw Error(err);
    }
  }

  async function login(email, password) {
    try {
      //
      const res = await loginRequest(email, password);
      const data = await res.json();

      if (!res.ok) throw Error(data.message);

      dispatch({ type: "SET_TOKEN", payload: data.accessToken });

      return data;
    } catch (err) {
      throw Error(err);
    }
  }

  async function logout() {
    try {
      //
      const res = await logoutRequest();
      const data = await res.json();

      if (!res.ok) throw Error(data.message);

      dispatch({ type: "LOGOUT" });
      return data;
      //
    } catch (err) {
      throw Error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        isLoggedIn,
        accessToken: state.accessToken,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
