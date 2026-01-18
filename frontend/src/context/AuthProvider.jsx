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
import { deleteCookie, getCookie, setCookie } from "@/utils/cookieHelper";

const initialState = {
  user: null,
  accessToken: null,
};

function reducer(state, action) {
  switch (action.type) {
    //
    case "SET_TOKEN":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    //
    case "LOGOUT":
      return { ...state, ...initialState };
    //
    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    //
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state.user);

  const isLoggedIn = state.accessToken ? true : false;

  const refreshAccessToken = useCallback(async () => {
    try {
      //
      const res = await refreshAccessTokenRequest();

      if (!res.ok) return;

      const data = await res.json();
      // console.log(data);

      dispatch({
        type: "SET_TOKEN",
        payload: { accessToken: data.accessToken, user: data.user },
      });

      return data;
      //
    } catch (err) {
      throw Error(err);
    }
  }, []);

  // Get Access Token on Initial Load
  useEffect(() => {
    const isLoggedInCookie = Boolean(getCookie("IsLoggedIn"));
    // console.log("isLoggedInCookie: ", isLoggedInCookie);

    if (!isLoggedInCookie) return;

    refreshAccessToken();
    //
  }, [
    // isLoggedIn
    refreshAccessToken,
  ]);

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
    [state.accessToken, refreshAccessToken],
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

      dispatch({
        type: "SET_TOKEN",
        payload: { accessToken: data.accessToken, user: data.user },
      });

      setCookie("IsLoggedIn", true, import.meta.env.VITE_LOGIN_EXPIRY_DAYS);

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
      deleteCookie("IsLoggedIn");

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

  async function setUser(updatedUserProp) {
    try {
      //
      dispatch({
        type: "SET_USER",
        payload: updatedUserProp,
      });

      //
    } catch (err) {
      throw Error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        user: state.user,
        setUser,
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
