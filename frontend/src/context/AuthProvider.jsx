import { useCallback, useEffect, useReducer } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  refreshAccessTokenRequest,
  registerRequest,
  resetPasswordRequest,
  verifyCodeRequest,
} from "@/api/authAPI";
import { fetchClient } from "@/api/fetchClient";

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
  useEffect(
    () => {
      // if (!isLoggedIn) return;
      refreshAccessToken();
      //
    },
    [
      // isLoggedIn
    ]
  );

  async function refreshAccessToken() {
    try {
      //
      const res = await refreshAccessTokenRequest();

      if (!res.ok) return;

      const data = await res.json();
      dispatch({ type: "SET_TOKEN", payload: data.accessToken });

      return data;
      //
    } catch (err) {
      throw Error(err);
    }
  }

  const authFetch = useCallback(
    //
    async (options) => {
      return fetchClient({
        ...options,
        accessToken: state.accessToken,
        onRefresh: refreshAccessToken,
      });
    },
    //
    [state.accessToken, refreshAccessToken]
  );

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

  async function forgotPassword(email) {
    try {
      //
      const res = await forgotPasswordRequest(email);
      const data = await res.json();

      if (!res.ok) throw Error(data.message);

      return data;
      //
    } catch (err) {
      throw Error(err);
    }
  }

  async function verifyCode(email, code) {
    try {
      //
      const res = await verifyCodeRequest(email, code);
      const data = await res.json();

      if (!res.ok) throw Error(data.message);

      return data;
      //
    } catch (err) {
      throw Error(err);
    }
  }

  async function resetPassword(email, code, newPassword) {
    try {
      //
      const res = await resetPasswordRequest(email, code, newPassword);
      const data = await res.json();

      if (!res.ok) throw Error(data.message);

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
        authFetch,
        register,
        login,
        logout,
        refreshAccessToken,
        forgotPassword,
        verifyCode,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
